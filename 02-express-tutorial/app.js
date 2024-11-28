const express = require('express');
const { products } = require('./data');

const app = express();
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

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
