const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios');
const {nanoid} = require('nanoid');

const config = require('../config');
const Users = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName
        };
        if (req.file) {
            userData.avatar = req.file.filename;
        }
        const user = new Users(userData);
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await Users.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    user.generateToken();

    await user.save();

    return res.send(user);
});

router.post('/facebook', async (req, res) => {

    try {
        const inputToken = req.body.accessToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

        const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        const response = await axios.get(url);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Users ID incorrect'});
        }

        let user = await Users.findOne({facebookId: req.body.id});

        if (!user) {
            const [firstName, lastName] = req.body.name.split(' ');

            user = new Users({
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id,
                avatar: req.body.picture.data.url,
                displayName: firstName + ' ' + lastName
            });
        }

        user.generateToken();
        await user.save();

        return res.send(user);
    } catch (e) {
        return res.sendStatus(401);
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};

    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await Users.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();
        await user.save();

        return res.send(success);
    } catch (e) {
        return res.send(success);
    }
});

module.exports = router;