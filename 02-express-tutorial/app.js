const express = require('express');
const { products, people } = require('./data');
const app = express();
const peopleRouter = require('./routes/people');
const cookieParser = require('cookie-parser');

const logger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] ${req.method} ${req.url}`);
    next();
};


app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/people', peopleRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./methods-public'));
app.use(logger);

const auth = (req, res, next) => {
    if (req.cookies.name) {
        req.user = req.cookies.name;
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized '})
    }
};

/*
app.get('/api/v1/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
});

app.post('/api/v1/people', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: 'Please provide a name' });
    }

    const newPerson = { id: people.length + 1, name };
    people.push(newPerson);
    res.status(201).json({ success: true, data: newPerson });
});
*/

app.post('/logon', (req, res) => {
    const { name } = req.body;
    if (name) {
        res.cookie('name', name);
        res.status(201).json({ message: `Hello, ${name}`});
    } else {
        res.status(400).json({ message: 'Name is required' })
    }
});

app.delete('/logoff', (req, res) => {
    res.clearCookie('name');
    res.status(200).json({ message: 'You are logged off' });
});

app.get('/test', auth, (req, res) => {
    res.status(200).json({ message: `Welcome, ${req.user}` });
});

app.get('/1', (req, res) => {
    res.send('Home page with Logger Middleware!')
});

app.get('/home', (req, res) => {
    res.send('Hello, world!');
});

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" });
})

app.get('/api/v1/products', (req, res) => {
    res.json(products);
});

app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "That product was not found" });
    }
});


app.get('/api/v1/query', (req, res) => {
    const { search, limit, price } = req.query;
    let results = [...products];

    if (search) {
        results = results.filter(p => {
            return p.name.toLowerCase().includes(search.toLowerCase());
        })
    }
    const limit_int = parseInt(limit);
    if (!isNaN(limit_int)) {
        results = results.slice(0, limit_int);
    }
    if (price) {
        results = results.filter(p => {
            return p.price < parseFloat(price);
        });
    }

    res.json(results);
})


app.post('/submit', (req, res) => {
    const { name } = req.body;
    res.send(`Form submitted! Name: ${name}`);
});

app.all('*', (req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3001, () => {
    console.log('Express Tutorial');
    console.log('Server is running on port 3001');
})

