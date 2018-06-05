const router = require('express').Router();
const Friend = require('./friendsModel');

router
    .route('/')
    .get((req,res) => {
        Friend.find()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ error })
        })
    })
    .post((req,res) => {
        const { firstName, lastName, age} = req.body;
        const newFriend = new Friend({ firstName, lastName, age });
        if (!firstName || !lastName || !age) {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
            return;
        } else if (age < 1 || age > 120) {
            res.status(400).json({ errorMessage: "errorMessage: Age must be a number between 1 and 120" });
            return;
        }
        newFriend
            .save()
            .then(friend => {
                res.status(201).json({ friend })
            })
            .catch(err => {
                res.status(500).json({ error })
            })
    })

router  
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend.findById(id)
            .then( friend => {
                if( friend === null){
                    return res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." });
                }
                res.status(201).json({ friend });
            })
            .catch(err => {
                res.status(500).json(err, { errorMessage: "The friend information could not be retrieved."});
            })
    })
    .delete((req, res) => {
        const { id } = req.params;
        Friend.findById(id)
            .then( deletedFriend => {
                if(deletedFriend === null){
                    return res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." });
                }
                res.status(201).json({ deletedFriend })
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friend could not be removed" });
            })
    })
    .put((req, res) => {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;
        if(!firstName || !lastName || !age){
            return res.status(404).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
        } else if( age !== Number || age < 1 || age > 120){
            return res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
        }
            Friend(id, { firstName, lastName, age })
            .then(updatedFriend => {
                if(updatedFriend === null){
                    return releaseEvents.status(404).json({ errorMessage: "The friend with the specified ID does not exist." });
                }
                res.status(201).json({ updatedFriend })
            })
            .catch(err => {
                res.status(500).json({ err, errorMessage: "The friend information could not be modified."})
            })
        });
    





module.exports = router;