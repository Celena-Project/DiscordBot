const chalk = require('chalk');
const moment = require('moment');
const { log } = console;

const globalPrefix = (() => {
  let t = new Date();
  let y= `${relevantNumber(t.getHours())}:${relevantNumber(t.getMinutes())}:${relevantNumber(t.getSeconds())}`
  
  return chalk.cyan(`[${y}]`)
});

console.log = function (x) {
  const prefix = chalk.hex('#0984e3')(`[LOG]`)
  log.apply(console, [globalPrefix(), prefix, ...arguments])
} 

console.success = function (x) {
  const prefix = chalk.hex('#00b894')('[SUCCESS]')
  log.apply(console, [globalPrefix(), prefix, ...arguments])
}

console.debug = function (x) {
  const prefix = chalk.hex('#82907B')('[DEBUG]')
  log.apply(console, [globalPrefix(), prefix, ...arguments])
}

console.error = function (x) {
  const prefix = chalk.hex('#ff4757')('[ERROR]')
  log.apply(console, [globalPrefix(), prefix, ...arguments])
}

console.warn = function (x) {
  const prefix = chalk.hex('#ffa502')( '[WARN]')
  log.apply(console, [globalPrefix(), prefix, ...arguments])
}

function relevantNumber(num){
  return `${num}`.length == 1 ? `0${num}` : `${num}`;
}