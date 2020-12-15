const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (_, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`server is listening at http://localhost:8080`);
});