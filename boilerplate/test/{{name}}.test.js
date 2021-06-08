'use strict';

const path = require('path');
const mock = require('mm');
const coffee = require('coffee');
const assertFile = require('assert-file');
const { rimraf, mkdirp } = require('mz-modules');

describe('test/index.test.js', () => {
  const cli = path.join(__dirname, '../bin/cli.js');
  const tmpDir = path.join(__dirname, '.tmp');

  beforeEach(async () => {
    await rimraf(tmpDir);
    await mkdirp(tmpDir);
    mock(process.env, 'BOILERPLATE_TEST', true);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should work', async () => {
    await coffee.fork(cli, [], { cwd: tmpDir })
      .debug()
      .waitForPrompt()
      .writeKey('example\n')
      .writeKey('ENTER')
      .writeKey('npm-showcase\n')
      .writeKey('@npm-showcase/example\n')
      .expect('code', 0)
      .end();


    assertFile(`${tmpDir}/README.md`, '@npm-showcase/example');
    assertFile(`${tmpDir}/README.md`, /this is description of example/);
    assertFile(`${tmpDir}/test/example.test.js`);
    assertFile(`${tmpDir}/.gitignore`);
    assertFile(`${tmpDir}/.eslintrc`);
    assertFile(`${tmpDir}/package.json`, {
      name: '@npm-showcase/example',
      description: 'this is description of example',
      homepage: 'https://github.com/npm-showcase/example',
      repository: 'git@github.com:npm-showcase/example.git',
    });
  });
});
