var todo = require('../models/todo'); // call Schema todoSchema


module.exports = (app) =>
{
    
    app.get('/api/setuptodo', (req, res)  =>
    {
        // create data call seed
         var seed = [
             {
                 text: "Học xong nodejs.",
                 isDone: false
             },
             {
                 text: "Học Reactjs với các plugin liên quan ",
                 isDone: false
             },
             {
                 text: "Học Angularjs và Angular ",
                 isDone: false
             }
         ]

        todo.create(seed,(err, result) =>
        {
            res.send("Successful")
            if (err) return handleError(err);
        })
    })
}
