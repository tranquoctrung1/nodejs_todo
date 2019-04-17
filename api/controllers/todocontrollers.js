var todos = require('../models/todo')

function getTodo(res)
{
    // find all collection in database 
    todos.find((err, result) =>
    {
        if (err)
            throw err;
        else
        {
            res.json(result);
        }
    })
}

module.exports = (app) =>
{
    // get all list todo 
    app.get('/api/todos', (req,res) =>
    {
        getTodo(res);
    })

    // get one of all list todo

    app.get('/api/todo/:id', (req, res) =>
    {
        todos.findById( {_id: req.params.id}, (err,result) =>
        {
            if (err) throw err;
            else
            {
                res.json(result);
            }
        })
    })


    //Create a todo

    app.post('/api/createtodo',(req,res) =>
    {
        var  todo = {
            text: req.body.text,
            isDone: req.body.isDone
        }

        todos.create(todo,(err, result )=>
        {
            if(err) throw err;
            else
            {
                getTodo(res);
            }
        })
    })

    //Update database

    app.put('/api/puttodo',(req,res) =>
    {
        if(!req.body._id)
        {
            return res.status(500).send("Id is required");
        }
        else
        {
            todos.update({
                _id: req.body._id
            },{
                text:req.body.text,
                isDone: req.body.isDone

            },(err,result) =>
            {
                if(err) throw err;
                else
                {
                    getTodo(res) 
                }
            })
        }
    })

    //Delete database

    app.delete('/api/deletetodo/:id',(req,res) =>
    {
        todos.remove({
            _id: req.params.id
        },(err,result) =>
        {
            if(err) throw err;
            else
            {
                getTodo(res);
            }
        }
        )
    })
}