
const { writeFile, readFile } = require("fs").promises;

writeFile('./temporary/temp.txt', 'line 1\n')
.then(() => {
    return writeFile('./temporary/temp.txt', 'line 2\n', { flag: 'a'})
})
.then(() => {
    return writeFile('./temporary/temp.txt', 'line 3\n', { flag: 'a'})
})
.then(() => {
    return readFile('./temporary/temp.txt', 'utf-8');
})
.then((textFile) => {
    console.log('File content:\n', textFile);
})
.catch((error) => {
    console.log('An error occurred: ', error)
})