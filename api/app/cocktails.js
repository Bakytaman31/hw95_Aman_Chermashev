const express = require('express');

const Cocktail = require('../models/Cocktail');
const auth = require('../middleware/auth');
const upload = require('../multer').uploads;
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/myCocktails', auth, async (req, res) => {
    try {
        const user = req.user;
        const cocktails = await Cocktail.find({user: user._id}, {
            "name": 1,
            "user": 1,
            "image": 1,
            "ingredients": 1,
            "recipe": 1,
            "date": 1,
            "_id": 1
        })
            .sort({"date": -1})
            .populate('user');
        res.send(cocktails);
    } catch (e) {
        res.status(404).send({message: 'Not found'})
    }
});

router.get('/', async (req, res) => {
    try {
        const cocktails = await Cocktail.find({}, {
            "name": 1,
            "user": 1,
            "image": 1,
            "ingredients": 1,
            "published": 1,
            "recipe": 1,
            "date": 1,
            "_id": 1
        })
            .sort({"date": -1})
            .populate('user');
        res.send(cocktails);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const cocktail = await Cocktail.findOne({_id: req.params.id});
        cocktail.publish();
        await cocktail.save();
        res.send('Saved');
    } catch (e) {
        res.status(404).send({message: "Not found"});
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const user = req.user;
        const cocktailData = req.body;
        const whiteList = {
            user: user._id,
            name: cocktailData.name,
            recipe: cocktailData.recipe,
            ingredients: JSON.parse(cocktailData.ingredients),
            image: req.file.filename
        };
        const cocktail = new Cocktail(whiteList);
        await cocktail.save();
        res.send(cocktail);
    } catch (e) {
        res.status(400).send({message: "You didn't feel all inputs. Please, fill them"});
    }
});



router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Cocktail.deleteOne({_id: req.params.id});
        res.send("Deleted");
    } catch (e) {
        res.status(404).send({message: "Not found"});
    }
});

module.exports = router;