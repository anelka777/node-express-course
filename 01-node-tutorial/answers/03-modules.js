const names = require("./04-names")
// console.log(names)
const greeting = require("./05-utils")
const data = require("./06-alternative-flavor")
require("./07-mind-grenade")

greeting('susan')
greeting(names.alena)
greeting(names.aleksey)

console.log(data.items)  
console.log(data.singlePerson)