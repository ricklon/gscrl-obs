const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
let scripts = 0, links = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    if (e.name.startsWith('.') || ['node_modules', 'dist'].includes(e.name)) continue;
    const p = path.join(dir,e.name);
    if (e.isDirectory()) walk(p);
    else if ((p.endsWith('.js') || p.endsWith('.cjs'))) { new vm.Script(fs.readFileSync(p,'utf8'), {filename:p}); scripts++; }
    else if (p.endsWith('.html')) {
      const text = fs.readFileSync(p,'utf8');
      for (const m of text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (!/\bsrc=/.test(m[1])) { new vm.Script(m[2], {filename:p}); scripts++; }
      }
      for (const m of text.matchAll(/(?:src|href)=["']([^"']+)["']/gi)) {
        const u = m[1].split(/[?#]/)[0];
        if (!u || /^(https?:|data:|mailto:|\/\/)/.test(u)) continue;
        const base = u.startsWith('/') ? (p.startsWith(path.join(root, 'services/truefinals/public')) ? path.join(root, 'services/truefinals/public') : root) : path.dirname(p);
        assert.ok(fs.existsSync(path.resolve(base, u.replace(/^\//, ''))), p+' missing '+u); links++;
      }
    }
  }
}
walk(root);
const {GSCRLConfig} = require(path.join(root,'shared/config.js'));
assert.deepEqual(GSCRLConfig.overlays.matchInfo.statusOptions, ['UPCOMING','IN PROGRESS','COMPLETED']);
const dir = path.join(root,'events/mechanical-mayhem-season-5');
const context = vm.createContext({URLSearchParams, window:{location:{search:'?day=2'}}});
vm.runInContext(fs.readFileSync(path.join(dir,'event-config.js'),'utf8'),context);
assert.equal(vm.runInContext('getEventDay()',context),2);
assert.equal(vm.runInContext('MechanicalMayhem.days[getEventDay()].classes.join()',context),'3lb Beetleweight');
context.window.location.search = '?day=invalid'; assert.equal(vm.runInContext('getEventDay()',context),1);
assert.equal(vm.runInContext('MechanicalMayhem.days[1].classes.length',context),3);
for (const suffix of ['', '_Local']) {
  const c = JSON.parse(fs.readFileSync(path.join(dir,'GSCRL_Mechanical_Mayhem_Season_5'+suffix+'.json'),'utf8'));
  assert.equal(c.scene_order.length,12); assert.equal(c.resolution,'1920x1080');
  const ids = new Set(c.sources.map(s=>s.uuid)); assert.equal(ids.size,c.sources.length);
  for (const scene of c.sources.filter(s=>s.id==='scene')) {
    for (const item of scene.settings.items) assert.ok(c.sources.some(s=>s.id==='browser_source' && s.uuid===item.source_uuid));
    assert.ok(c.scene_order.some(s=>s.name===scene.name));
  }
  for (const source of c.sources.filter(s=>s.id==='browser_source')) {
    const url = new URL(source.settings.url);
    assert.equal(url.origin,suffix ? 'http://localhost:8010' : 'https://ricklon.github.io');
    assert.ok(fs.existsSync(path.join(root,url.pathname.replace(/^\/gscrl-obs\//,'').replace(/^\//,''))));
    assert.notEqual(url.searchParams.get('view'),'standings');
    if (source.name.startsWith('Saturday')) assert.equal(url.searchParams.get('day'),'1');
    if (source.name.startsWith('Sunday')) assert.equal(url.searchParams.get('day'),'2');
    if (source.name.includes('Match Info')) assert.equal(source.settings.height,300);
    assert.ok(!source.settings.url.includes('nj-state-champs'));
  }
}
require('./check-overlays.cjs').run();
console.log('Passed: '+scripts+' scripts, '+links+' local links, event days, shared defaults, and both 12-scene OBS collections.');
