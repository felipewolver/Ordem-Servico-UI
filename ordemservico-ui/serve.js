const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/ordemservico-ui')); // colocar o nome do projeto no angular 10

app.get('/*', function(req, res) {

    res.sendFile(__dirname + '/dist/ordemservico-ui/index.html'); // colocar o nome do projeto no angular 10
});

app.listen(process.env.PORT || 4200);