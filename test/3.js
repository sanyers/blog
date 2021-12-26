'use strict';
var jane = {
  name: 'Jane',

  describe: function () {
    return 'Person named ' + this.name;
  }
};

var func = jane.describe.bind(jane);

func()