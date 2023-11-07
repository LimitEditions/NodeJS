const express = require('express');
const path = require('path');
const fs = require('fs');

const fullPath = path.join(__dirname, 'index.json');
const data = fs.readFileSync(fullPath, 'utf-8');
const write = JSON.parse(data);
const app = express();
const port = 3000;

function saveJson() {
    fs.writeFile(fullPath, JSON.stringify(write, null, 2), (err) => {
        if (err) {
            console.error(err);
        }
    })
}

app.get('/', (req, res) => {
    write.start++;
    saveJson();
    res.send(`<h1>Hello World!</h1><h4>Просмотров: ${write.start}</h4><a href="/about">Перейти на страницу "About"</a>`)
});
app.get('/about', (req, res) => {
    write.about++;
    saveJson();
    res.send(`<h1>About</h1><h4>Просмотров: ${write.about} </h4><a href="/">Перейти на Стартовую страницу</a>`)
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});


