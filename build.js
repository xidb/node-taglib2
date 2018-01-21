var spawn = require('cross-spawn')
var npmRunPath = require('npm-run-path')

var runtime = process.env.npm_config_runtime || 'electron'
var target = process.env.npm_config_target || '1.8.2-beta.3'
var abi = process.env.npm_config_abi || process.versions.modules

console.log('BUILD for %s@%s (abi=%s)', runtime, target, abi)

var ps = spawn('cmake-js', [
  'rebuild',
  '-r', runtime,
  '-v', target,
  '--abi', abi
], {
  env: npmRunPath.env()
})
ps.stdout.pipe(process.stdout)
ps.stderr.pipe(process.stderr)
ps.on('exit', function (code) {
  process.exit(code)
})
