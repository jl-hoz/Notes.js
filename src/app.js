
import yargs from 'yargs';
import fs from 'fs';
import uuid from 'uuid';

let obj;

// ADD FUNCTION
const add = function(argv){
  const nota = {
    uuid: uuid.v4(),
    title: argv.title,
    body: argv.body,
    author: argv.author,
  };
  obj.notes.push(nota);
  console.log(`Added: ${nota.title}`);
}

// LIST FUNCTION
const list = function(){
    obj.notes.forEach( (note, i) => {
        console.log(`${i}: ${note.title}`);
    })
}

// READ FUNCTION
const read = function(argv){
    const read = obj.notes.find(note => note.uuid === argv.uuid);
    console.log(read);
}

// REMOVE FUNCTION
const remove = function(argv){
    const toRM = obj.notes.find(note => note.uuid === argv.uuid)
    if(toRM){
        obj.notes.splice(obj.notes.indexOf(toRM), 1);
    }
}

// ADD COMMAND
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string',
    },
    author: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: add,
});

// LIST COMMAND
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler: list,
});

// RM COMMAND
yargs.command({
    command: 'rm',
    describe: 'add a new note',
    builder: {
      uuid: {
        describe: 'note id',
        demandOption: true,
        type: 'string',
      },
    },
    handler: remove,
});

// READ COMMAND
yargs.command({
    command: 'read',
    describe: 'show note from id',
    builder: {
      uuid: {
        describe: 'note id',
        demandOption: true,
        type: 'string',
      },
    },
    handler: read,
});


// MAIN

const path = './notas.txt';

fs.access(path, fs.F_OK, (err) => {
  if (err) {
    fs.writeFileSync("notas.txt","");
  }
  const data = fs.readFileSync("notas.txt").toString();
  if(data !== ""){
    obj = JSON.parse(data);
  }else{
    obj = {
      notes: [

      ]
    };
  }
  yargs.parse();
  fs.writeFileSync("notas.txt", JSON.stringify(obj));
});
