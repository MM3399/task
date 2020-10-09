const toDoList = require('../models/toDoModel');



const getList = ((req, res) => {
    toDoList.find((err, data) => {
        if (err) {
            console.log("There's an error on GET Request", err);
            res.json("There's error on server side. Sorry For inconvenience");
        }
        else {
            res.json(data);
            //console.log("Data was successfully sent on", req.method)
        }
    })
})

const saveList = ((req, res) => {
    let authorization = req.get('cookie').split('=')[1]
    if (authorization==="valid") {
        let newtoDoList = new toDoList({
            title: req.body.title,
            subtask: req.body.subtask,
            status: req.body.status,
            created_at: req.body.created_at
        })
        newtoDoList.save()
            .then(() => {
                res.json("Data saved successfully")
            })
            .catch((err) => {
                console.log("Due to the error data was not saved successfully", err);
                res.json("There's error on server side. Sorry For inconvenience");
            })
    }
    else {
        res.json("You are not authorized to post new task")
    }
})

const updateList = ((req, res) => {
    //let authorization = app.get('authorization');
    let authorization = req.get('cookie').split('=')[1]
    if (authorization === "valid") {
        toDoList.findById(req.body._id, (err, data) => {
            if (err) {
                res.json("There's error on server side. Sorry For inconvenience");
                console.log("Due to the error data was not found", err);
            }
            else {
                data.title = req.body.title;
                data.subtask = req.body.subtask;
                data.status = req.body.status;
                data.updated_at = req.body.updated_at;
                data.save();
                console.log(data)
                res.json("Data was successfully updated")
            }
        })
    }
    else {
        res.json("You are not authorized to update this task")
    }
});

const deleteList = ((req, res) => {
    let authorization = req.get('cookie').split('=')[1]
    if (authorization === "valid") {
        toDoList.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                res.json("There's error on server side. Sorry For inconvenience");
                console.log("Due to the error data was not found", err);
            }
            else {
                res.json("Data was successfully deleted");
                console.log(data);
            }
        })
    }
    else {
        res.json("You are not authorized to delete this task")
    }
})

module.exports = {
    getList,
    saveList,
    updateList,
    deleteList

}
