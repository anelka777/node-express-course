const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    try {
        await writeFile('./temporary/temp.txt', 'First line\n');
        await writeFile('./temporary/temp.txt', 'Second line\n', { flag: 'a'});
        await writeFile('./temporary/temp.txt', 'Third line\n', { flag: 'a'});
        console.log('File written successfully')
    } catch (error) {
        console.error('Error writing to file:', error);
    }
};

const reader = async () => {
    try {
        const textFile = await readFile('./temporary/temp.txt', 'utf-8');
        console.log('File content: \n', textFile)
    } catch (error) {
        console.error('Error reading file', error);
    }
};

const  readWrite = async () => {
    await writer();
    await reader();
}

readWrite();