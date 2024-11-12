const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('message', (text) => {
    console.log(`Message received: ${text}`);
    myEmitter.emit('response', 'This is next event');
});

myEmitter.on('response', (responseText) => {
    console.log(`Response received: ${responseText}`);    
});

myEmitter.emit('message', 'Hello from myEmitter!');


setInterval(() => {
    myEmitter.emit('timer', 'hi there');
}, 2000);

myEmitter.on('timer', (msg) => {
    console.log(msg);
});

const waitForEvent = () => {
    return new Promise((resolve) => {
        myEmitter.on('asyncEvent', (msg) => {
            resolve(msg)
        });
    })
};
const doWait = async () => {
    const msg = await waitForEvent();
    console.log('Here is the event we got: ', msg);
};

doWait();
myEmitter.emit('asyncEvent', 'Hello from async event!');