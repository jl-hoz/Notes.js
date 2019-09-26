"use strict";

var _yargs = _interopRequireDefault(require("yargs"));

var _fs = _interopRequireDefault(require("fs"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var obj; // ADD FUNCTION

var add = function add(argv) {
  var nota = {
    uuid: _uuid["default"].v4(),
    title: argv.title,
    body: argv.body,
    author: argv.author
  };
  obj.notes.push(nota);
  console.log("Added: ".concat(nota.title));
}; // LIST FUNCTION


var list = function list() {
  obj.notes.forEach(function (note, i) {
    console.log("".concat(i, ": ").concat(note.title));
  });
}; // READ FUNCTION


var read = function read(argv) {
  var read = obj.notes.find(function (note) {
    return note.uuid === argv.uuid;
  });
  console.log(read);
}; // REMOVE FUNCTION


var remove = function remove(argv) {
  var toRM = obj.notes.find(function (note) {
    return note.uuid === argv.uuid;
  });

  if (toRM) {
    obj.notes.splice(obj.notes.indexOf(toRM), 1);
  }
}; // ADD COMMAND


_yargs["default"].command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string'
    },
    author: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: add
}); // LIST COMMAND


_yargs["default"].command({
  command: 'list',
  describe: 'list notes',
  handler: list
}); // RM COMMAND


_yargs["default"].command({
  command: 'rm',
  describe: 'add a new note',
  builder: {
    uuid: {
      describe: 'note id',
      demandOption: true,
      type: 'string'
    }
  },
  handler: remove
}); // READ COMMAND


_yargs["default"].command({
  command: 'read',
  describe: 'show note from id',
  builder: {
    uuid: {
      describe: 'note id',
      demandOption: true,
      type: 'string'
    }
  },
  handler: read
}); // MAIN


var path = './notas.txt';

_fs["default"].access(path, _fs["default"].F_OK, function (err) {
  if (err) {
    _fs["default"].writeFileSync("notas.txt", "");
  }

  var data = _fs["default"].readFileSync("notas.txt").toString();

  if (data !== "") {
    obj = JSON.parse(data);
  } else {
    obj = {
      notes: []
    };
  }

  _yargs["default"].parse();

  _fs["default"].writeFileSync("notas.txt", JSON.stringify(obj));
});