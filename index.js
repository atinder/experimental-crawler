#!/usr/bin/env node

var program = require('commander');
var engine = require('./engine')
var print = require('./print')
var pjson = require('./package.json');

const invalidArgs = () => {
  print.invalidArgs();
  process.exit(1)
}

// Set version number from package.json
program.version(pjson.version)

// Sets message to display on help
program.on('--help', function(){
  console.log('  Examples:')
  console.log('')
  console.log('    $ ' + pjson.name + ' grass')
  console.log('    $ ' + pjson.name + ' grass 3')
  console.log('')
});

// Parse arguments and save them into program.args
program.parse(process.argv)

!program.args.length && invalidArgs()

if (program.args.length == 1) {
  engine.getCount(program.args[0]).then(print.count)
} else if (program.args.length > 1) {
  engine.getResults(program.args[0], program.args[1]).then(print.results)
} else {
  invalidArgs()
}

