'use strict';

const BaseBoilerplate = require('common-boilerplate');

class Boilerplate extends BaseBoilerplate {
  constructor(...args) {
    super(...args);
    this.templateRules = [ '!boilerplate/**' ];
  }

  get [Symbol.for('boilerplate#root')]() {
    return __dirname;
  }

  async askQuestions() {
    await this.askNpm({ prefix: 'create-' });

    const { name, scope, npm } = this.locals;
    const usage = `${npm} init ${scope}/${name.substring(7)}`;
    this.setLocals({ usage });

    await this.askGit();
  }

  async updatePkg(pkg) {
    pkg = await super.updatePkg(pkg);
    pkg.dependencies['common-boilerplate'] = this.pkgInfo.dependencies['common-boilerplate'];
    return pkg;
  }
}

module.exports = Boilerplate;
