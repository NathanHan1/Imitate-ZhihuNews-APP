const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.static('./dist'));

app.get('/api/:param', (req, res) => {
    const url = 'https://news-at.zhihu.com/api/4/news';
    const param = req.params.param;
    console.log(req.params.param);
    if (param === 'latest' || typeof parseInt(param) !== NaN) {
        axios.get(`${url}/${param}`).then(result => {
            res.json(result.data);
        });
    }
});

app.get('/api/:param/:id', (req, res) => {
    const url = 'https://news-at.zhihu.com/api/4/news';
    const param = req.params.param;
    const id = req.params.id;
    if (param === 'before') {
        axios.get(`${url}/${param}/${id}`).then(result => {
            res.json(result.data);
        });
    }
});


app.listen(8100, function() {
    console.log('chengong');
});
