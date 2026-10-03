const fs = require('node:fs');
const path = require('node:path');
const { sync } = require('./sync-events.cjs');
const root = path.resolve(__dirname, '..');
// Explicit public files only: never publish the service, credentials, or dependencies.
const publicPaths = ['index.html', 'overlays', 'events', 'shared', 'assets', 'docs'];
function build(destination = path.join(root, 'dist/site')) {
  sync(true);
  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(destination, { recursive: true });
  for (const name of publicPaths) fs.cpSync(path.join(root, name), path.join(destination, name), {
    recursive: true,
    filter: source => !path.basename(source).startsWith('.') && !['node_modules', 'truefinals-config.json'].includes(path.basename(source)),
  });
  return destination;
}
module.exports = { build };
if (require.main === module) console.log('Static site built at ' + build());
