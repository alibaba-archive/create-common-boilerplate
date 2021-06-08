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

  async initQuestions() {
    return [
      ...await super.initQuestions(),
      {
        name: 'name',
        type: 'input',
        message: 'Boilerplate Name: ',
        default: () => this.locals.name,
        validate: v => !!v,
      },
      {
        name: 'description',
        type: 'input',
        message: 'Description:',
        default: res => `Boilerplate for ${res.name}`,
      },
      {
        name: 'org',
        type: 'input',
        message: 'Organization: ',
        default: () => this.locals.org,
        validate: v => !!v,
      },
      {
        name: 'pkgName',
        type: 'input',
        message: 'Package Name: ',
        default: res => res.name,
      },
    ];
  }
}

module.exports = Boilerplate;
