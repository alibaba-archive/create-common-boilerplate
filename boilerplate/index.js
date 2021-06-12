'use strict';

const BaseBoilerplate = require('common-boilerplate');

class Boilerplate extends BaseBoilerplate {

  get [ Symbol.for('boilerplate#root') ]() {
    return __dirname;
  }

  async askQuestions() {
    await this.askNpm();

    this.setLocals(await this.prompt({
      name: 'needPublish',
      type: 'confirm',
      message: 'Will it publish to npm registry?',
      default: true,
    }));

    await this.askGit();
  }

  async updatePkg(pkg) {
    pkg = await super.updatePkg(pkg);
    if (!this.locals.needPublish) {
      pkg.private = true;
    }
    return pkg;
  }
}

module.exports = Boilerplate;
