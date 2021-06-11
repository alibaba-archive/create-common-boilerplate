'use strict';

const path = require('path');
const mock = require('mm');
const coffee = require('coffee');
const assertFile = require('assert-file');
const { rimraf, mkdirp } = require('mz-modules');
const runscript = require('runscript');
const hasBin = require('hasbin');

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
    await runscript('git init', { cwd: tmpDir });
    await coffee.fork(cli, [], { cwd: tmpDir })
      .debug()
      .waitForPrompt()
      .writeKey('@tz\n')
      .writeKey('boilerplate\n')
      .writeKey('just for test\n')
      .writeKey('ENTER')
      .expect('code', 0)
      .end();


    assertFile(`${tmpDir}/README.md`, 'just for test');
    assertFile(`${tmpDir}/README.md`, 'npm init @tz/boilerplate');
    assertFile(`${tmpDir}/test/index.test.js`);
    assertFile(`${tmpDir}/.gitignore`);
    assertFile(`${tmpDir}/.eslintrc`);
    assertFile(`${tmpDir}/package.json`, {
      name: '@tz/create-boilerplate',
      description: 'just for test',
      homepage: 'https://github.com/tz/create-boilerplate',
      repository: 'git@github.com:tz/create-boilerplate.git',
      dependencies: {
        'common-boilerplate': require('../package.json').dependencies['common-boilerplate'],
      },
    });

    assertFile(`${tmpDir}/bin/cli.js`);
    assertFile(`${tmpDir}/boilerplate/test/{{name}}.test.js`);
    assertFile(`${tmpDir}/boilerplate/_package.json`, {
      name: '{{ pkgName }}',
    });

    const npmCli = hasBin.first.sync([ 'tnpm', 'npminstall', 'npm' ]);
    console.log(`> run test for boilerplate's boilerplate with ${npmCli}`);
    await runscript(`${npmCli} i --loglevel=info`, { cwd: tmpDir });
    await runscript(`${npmCli} test`, { cwd: tmpDir });
  });
});
