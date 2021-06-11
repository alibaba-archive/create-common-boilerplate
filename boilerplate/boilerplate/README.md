# {{ pkgName }}

{{ description }}

{% if npm_module %}[![NPM version](https://img.shields.io/npm/v/{{ pkgName }}.svg?style=flat-square)](https://npmjs.org/package/{{ pkgName }})
[![NPM quality](http://npm.packagequality.com/shield/{{ pkgName }}.svg?style=flat-square)](http://packagequality.com/#?package={{ pkgName }})
[![NPM download](https://img.shields.io/npm/dm/{{ pkgName }}.svg?style=flat-square)](https://npmjs.org/package/{{ pkgName }}){% endif %}
[![Continuous Integration]({{ homepage }}/actions/workflows/nodejs.yml/badge.svg)]({{ homepage }}/actions/workflows/nodejs.yml)
[![Test coverage](https://img.shields.io/codecov/c/github/{{ repository }}.svg?style=flat-square)](https://codecov.io/gh/{{ repository }})

## Usage

```bash
$ npm i

$ npm start

$ npm test
```
