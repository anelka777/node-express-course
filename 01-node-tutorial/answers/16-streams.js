const { createReadStream } = require('fs')

const stream = createReadStream('../content/big.txt', {
    encoding: 'utf8',
    highWaterMark: 200
});

stream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});

stream.on('end', () => {
    console.log('Reading finished');
});

stream.on('error', (error) => {
    console.error('Error:', error);
});