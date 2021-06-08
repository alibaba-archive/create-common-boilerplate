'use strict';

const BaseBoilerplate = require('common-boilerplate');

class Boilerplate extends BaseBoilerplate {

  get [ Symbol.for('boilerplate#root') ]() {
    return __dirname;
  }

  async initQuestions() {
    return [
      ...await super.initQuestions(),
      {
        name: 'name',
        type: 'input',
        message: 'Project Name: ',
        default: () => this.locals.name,
        validate: v => !!v,
      },
      {
        name: 'description',
        type: 'input',
        message: 'Description:',
        default: res => `this is description of ${res.name}`,
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
