const { writeFile } = require('fs');
console.log('start')

writeFile('./temporary/fileB.txt', 'This is line 1\n', { encoding: 'utf8' }, (err) => {
    console.log('point 1');
    if (err) {
        console.log('Error: ', err);
    } else {
        writeFile('./temporary/fileB.txt', 'This is line 2\n', { flag: 'a', encoding: 'utf8' }, (err) =>{
            console.log('point 2');
            if (err) {
                console.log('Error: ', err);
            } else {
                writeFile('./temporary/fileB.txt', 'This is line 3\n', { flag: 'a', encoding: 'utf8' }, (err) => {
                    console.log('point 3');
                    if (err) {
                        console.log('Error: ', err);
                    } else {
                        console.log('All lines written successfully!')
                    }
                })
            }
        })
    }
});
console.log('end')