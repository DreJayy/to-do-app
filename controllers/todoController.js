const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
let data = [
    {item: 'get milk'},
    {item: 'walk dog'},
    {item: 'kick some coding'}
];

module.exports = (app) => {
    // request handlers
    app.get('/todo', (req, res) => {
        res.render('todo', {todos: data});
    })

    app.post('/todo', urlencodedParser, (req, res) => {
        data.push(req.body);
        res.render('todo', {todos: data});
        // res.json(data);
        console.log(req.body);
    })

   app.delete('/todo/:item', (req, res) => {
        console.log('DELETE /todo/:item called with param:', req.params.item);
        const param = decodeURIComponent(req.params.item).trim().toLowerCase();

        data = data.filter(function(todo) {
            const normalized = todo.item.trim().replace(/ /g, '-').toLowerCase();
            return normalized !== param;
        });
        res.json({todos: data});
    })
};