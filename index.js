const { getFS } = require('guld-fs')
const { getGitDir } = require('guld-git-path')
const path = require('path')
const ini = require('guld-git-config-ini')
const home = require('user-home')
const _unset = require('lodash.unset')
const _set = require('lodash.set')
const _get = require('lodash.get')
const mergeOptions = require('merge-options')
const PATHS = ['global', 'local', 'system', 'public', 'merged']
const CACHE = {}
var fs

async function getConfigPath (scope = 'merged', owner = undefined) {
  if (scope === 'global') {
    return path.join(home, '.gitconfig')
  } else if (scope === 'public') {
    if (typeof owner === 'string') return path.join(home, 'dotfiles', owner, '.gitconfig')
    else return path.join(home, 'dotfiles', global.GULDUSER || process.env.GULDUSER || process.env.USER, '.gitconfig')
  } else if (scope === 'system') {
    return path.join('/etc', 'gitconfig')
  } else if (scope === 'local') {
    var gp = await getGitDir()
    return path.join(gp, 'config')
  }
}

async function getConfig (scope = 'merged', owner = undefined) {
  if (scope === 'merged') return getMergedConfig(getConfig, [], owner || [])
  fs = fs || await getFS()
  var p
  if (PATHS.indexOf(scope) !== -1) p = await getConfigPath(scope, owner)
  else p = scope
  try {
    var f = await fs.readFile(p, 'utf-8')
    CACHE[scope] = ini.parse(f)
  } catch (e) {
    CACHE[scope] = {}
  }
  return CACHE[scope]
}

async function writeConfig (cfg, scope = 'merged', owner = undefined) {
  if (scope === 'merged') return getMergedConfig(writeConfig, [], owner || [])
  fs = fs || await getFS()
  var p
  if (PATHS.indexOf(scope) !== -1) p = await getConfigPath(scope, owner)
  else p = scope
  CACHE[scope] = cfg
  await fs.writeFile(p, ini.stringify(cfg))
}

async function mergeConfig (cfg, scope = 'merged', owner = undefined) {
  if (scope === 'merged') return mergeConfig(writeConfig, [cfg], owner || [])
  var c
  try {
    var ocfg = await getConfig(scope, owner)
    c = mergeOptions(ocfg, cfg)
  } catch (e) {
    c = cfg
  }
  await writeConfig(c, scope, owner)
  return c
}

async function setConfig (key, value, scope = 'global', owner = undefined) {
  if (scope === 'merged') scope = 'global'
  var c
  try {
    c = await getConfig(scope, owner)
    _set(c, key, value)
  } catch (e) {
    c = {}
  }
  await writeConfig(c, scope, owner)
  return _get(c, key)
}

async function unsetConfig (key, scope = 'merged', owner = undefined) {
  if (scope === 'merged') return setConfig(writeConfig, [key], owner || [])
  var c
  try {
    c = await getConfig(scope, owner)
    _unset(c, key)
  } catch (e) {
    c = {}
  }
  await writeConfig(c, scope, owner)
}

async function setupConfig (cfg, owner) {
  var c = await mergeConfig(cfg, 'public', owner)
  c = await mergeConfig(c, 'global')
  return c
}

async function getMergedConfig (fn, pre, post) {
  var args = {
    local: [...pre, 'local', ...post],
    pub: [...pre, 'public', ...post],
    global: [...pre, 'global', ...post],
    system: [...pre, 'system', ...post]
  }
  var ps = await Promise.all([
    fn(...args.local),
    fn(...args.pub),
    fn(...args.global),
    fn(...args.system)
  ])
  return mergeOptions(ps[3], ps[2], ps[1], ps[0])
}

module.exports = {
  getConfigPath: getConfigPath,
  getConfig: getConfig,
  setConfig: setConfig,
  unsetConfig: unsetConfig,
  writeConfig: writeConfig,
  mergeConfig: mergeConfig,
  setupConfig: setupConfig
}
