# guld-git-config

[![source](https://img.shields.io/badge/source-bitbucket-blue.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-git-config) [![issues](https://img.shields.io/badge/issues-bitbucket-yellow.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-git-config/issues) [![documentation](https://img.shields.io/badge/docs-guld.tech-green.svg)](https://guld.tech/lib/guld-git-config.html)

[![node package manager](https://img.shields.io/npm/v/guld-git-config.svg)](https://www.npmjs.com/package/guld-git-config) [![travis-ci](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-git-config.svg)](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-git-config?branch=guld) [![lgtm](https://img.shields.io/lgtm/grade/javascript/b/guld/tech-js-node_modules-guld-git-config.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/b/guld/tech-js-node_modules-guld-git-config/context:javascript) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-git-config/status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-git-config) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-git-config/dev-status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-git-config?type=dev)

Guld configuration helper manages git config files.

### Install

##### Node

```sh
npm i guld-git-config
```

##### Browser

```sh
curl https///bitbucket.org/guld/tech-js-node_modules-guld-git-config/raw/guld/guld-git-config.min.js -o guld-git-config.min.js
```

### Usage

```
// async
// assume it's empty
var cfg = await getConfig('local') // {}
cfg.core.test = true
setConfig('cfg.core.test', true)
var cfg = await getConfig('local') // {core: {test: true}}
```

### License

MIT Copyright isysd
