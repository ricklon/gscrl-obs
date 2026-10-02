const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const dir = path.resolve(__dirname,'../events/mechanical-mayhem-season-5');
function load(file,search) {
  const html=fs.readFileSync(path.join(dir,file),'utf8');
  const nodes=[]; const byId=new Map(); const intervals=[];
  function element(attrs='') {
    const node={textContent:'',value:'',innerHTML:'',style:{setProperty(k,v){this[k]=v;}},dataset:{},listeners:{},children:[],className:'',
      addEventListener(k,v){this.listeners[k]=v;},replaceChildren(...v){this.children=v;},click(){this.listeners.click?.();}};
    node.classList={add(c){node.className+=' '+c;},remove(c){node.className=node.className.split(' ').filter(x=>x!==c).join(' ');},toggle(c,on){if(on??!this.contains(c))this.add(c);else this.remove(c);},contains(c){return node.className.split(/\s+/).includes(c);}};
    for(const m of attrs.matchAll(/([\w-]+)="([^"]*)"/g)){
      if(m[1]==='class')node.className=m[2];
      else if(m[1].startsWith('data-'))node.dataset[m[1].slice(5)]=m[2];
      else if(m[1] !== 'style') node[m[1]]=m[2];
    }
    if(/style="[^"]*display:none/.test(attrs))node.style.display='none';
    return node;
  }
  for(const m of html.matchAll(/<\w+\b([^>]*)>/g)){const node=element(m[1]);nodes.push(node);if(node.id)byId.set(node.id,node);}
  const document={getElementById(id){return byId.get(id)||null;},createElement(){return element();},documentElement:element(),
    querySelectorAll(selector){return nodes.filter(n=>selector.startsWith('.')&&n.classList.contains(selector.slice(1)));},
    querySelector(selector){return this.querySelectorAll(selector)[0]||null;}};
  const href='http://localhost:8010/events/mechanical-mayhem-season-5/'+file+search;
  const context=vm.createContext({console,URL,URLSearchParams,document,window:{location:{search,href}},navigator:{clipboard:{writeText:async()=>{}}},
    setTimeout(){},setInterval(fn){intervals.push(fn);return intervals.length;},clearInterval(){}});
  for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
    const src=/src="([^"]+)"/.exec(m[1]);
    const code=src?fs.readFileSync(path.resolve(dir,src[1]),'utf8'):m[2];
    vm.runInContext(code,context,{filename:file});
  }
  return {byId,context,document,intervals};
}
function run(){
  for(const day of [1,2]){
    const query='?day='+day;
    const welcome=load('welcome-screen.html',query);assert.equal(welcome.byId.get('classesList').children.length,day===1?3:1);
    assert.ok(welcome.byId.get('dayBadge').textContent.includes(day===1?'October 3':'October 4'));
    const waiting=load('waiting-screen.html',query+'&status=Ready%20to%20fight');assert.equal(waiting.byId.get('statusText').textContent,'Ready to fight');
    assert.ok(waiting.byId.get('classesEl').textContent.includes(day===1?'Standard Antweight':'Beetleweight'));
    const hub=load('index.html',query);assert.ok(hub.byId.get('url-welcome').textContent.endsWith('day='+day));
    const match=load('match-info.html',query+'&redbot=100%25%20Bot&hidecontrols=true');
    assert.equal(match.byId.get('weightClass').textContent,day===1?'1LB CLASS':'3LB CLASS');
    assert.equal(match.byId.get('weightClassSelect').value,day===1?'1lb':'3lb');
    assert.equal(match.byId.get('redBot').textContent,'100% Bot');assert.equal(match.byId.get('settingsToggle').style.display,'none');
    match.byId.get('redBotInput').value='New Bot';match.byId.get('applySettings').click();assert.equal(match.byId.get('redBot').textContent,'New Bot');
    for(const view of ['overview','schedule','sponsors','invalid']){
      const info=load('event-info.html',query+'&view='+view+'&hidecontrols=true');
      assert.equal(info.byId.get('panel'+(view==='invalid'?'Overview':view[0].toUpperCase()+view.slice(1))).style.display,'');
      assert.ok(info.byId.get('scheduleList').innerHTML.includes('11:00 AM EDT'));
      assert.equal(info.document.querySelector('.view-selector').style.display,'none');
    }
  }
  const timer=load('break-timer.html','?duration=5&autostart=true&hidecontrols=true');assert.equal(timer.byId.get('timerDisplay').textContent,'05:00');
  assert.equal(timer.byId.get('startBtn').textContent,'Pause');assert.equal(timer.intervals.length,1);timer.intervals[0]();assert.equal(timer.byId.get('timerDisplay').textContent,'04:59');
  console.log('Passed: both days execute, day-specific classes and URLs, match editing, view selection, controls, and timer countdown (simulated DOM).');
}
module.exports={run};
