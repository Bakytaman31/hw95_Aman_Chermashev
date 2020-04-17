const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require("nanoid");

const User = require('./models/User');
const Cocktail = require('./models/Cocktail');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, user] = await User.create({
        username: 'admin',
        password: 'admin',
        displayName: 'Admin',
        token: nanoid(),
        role: 'admin',
    }, {
        username: 'user',
        password: 'user',
        displayName: 'User',
        token: nanoid()
    });

    await Cocktail.create({
        name: 'Пиранья',
        user: user,
        recipe: 'Влейте спиртное в низкий стакан, заполненный большим количеством колотого льда. Хорошо размешайте. Затем добавьте колу.',
        published: true,
        ingredients: [{name: "Водка", amount: "37 мл", id: nanoid()}, {name: "Шоколадный ликер, коричневый", amount: "25 мл", id: nanoid()}, {name: "Кола, сильно охлажденная", amount: "25 мл", id: nanoid()}],
        image: 'uploads/fixtures/Piranha.jpg'
    }, {
        name: 'Светящийся коктейль',
        user: user,
        recipe: 'Для светящего коктейля подготовьте водку или другой крепкий алкогольный напиток, заранее замороженные кубики льда и тоник.\n' +
            'Также понадобится ультрафиолетовая лампа. Как приготовить светящийся коктейль:\n' +
            '\n' +
            'Первым в бокалы опустите лед. Влейте водку и тоник.\n' +
            'Пропорции легко изменить по своему вкусу. Кроме того, вместо классического бесцветного тоника подходят ароматизированные, цветные - светящийся коктейль может быть розовым, желтым, зеленым.\n' +
            'Именно тоник (не считая ультрафиолетовой лампы) создает эффект неона. Тоник - тот самый секретный и обязательный компонент светящегося коктейля. \n' +
            'Бокалы с прозрачным коктейлем в темном помещении преображаются под ультрафиолетовыми лучами.\n' +
            'Если тоник заморозить, ледяные кубики будут светиться в ультрафиолете так же, как и жидкость.',
        published: true,
        ingredients: [{name: "Водка", amount: "50 мл", id: nanoid()}, {name: "Тоник", amount: "100 мл", id: nanoid()}, {name: "Лед", amount: "50 г", id: nanoid()}],
        image: 'uploads/fixtures/lightCocktail.jpg'
    }, {
        name: 'Дайкири',
        user: user,
        recipe: 'Хорошо смешайте все ингредиенты коктейля Дайкири в шейкере со льдом. Процедите в охлажденный бокал для коктейля. Не украшайте.',
        published: false,
        ingredients: [{name: "Ром белый", amount: "50 мл", id: nanoid()}, {name: "Сахарный сироп (50/50 из тростникового сахара)", amount: "2 ч. л.", id: nanoid()}, {name: "Лайм", amount: "1/2", id: nanoid()}],
        image: 'uploads/fixtures/Daiquiri.jpg'
    }, {
        name: 'Красный грех',
        user: admin,
        recipe: 'Как сделать фруктовый коктейль алкогольный “Красный грех":\n' +
            '\n' +
            '1. Смочить кромку стакана для лонгдринка апельсиновым соком или водой.\n' +
            '\n' +
            '2. Вращать смоченную кромку стакана в сахаре.\n' +
            '\n' +
            '3. Ликер и сок смешать в стакане для лонгдринка вместе с кубиками льда.\n' +
            '\n' +
            '4. Долить шампанским. Фруктовый коктейль можно подавать.',
        published: true,
        ingredients: [{name: "Черносмородиновый ликер Creme de Cassis", amount: "40 мл", id: nanoid()}, {name: "Апельсиновый сок", amount: "10 мл", id: nanoid()}, {name: "Красное шампанское", amount: "300-400 мл", id: nanoid()}, {name: "Лед", amount: "5-6 куб.", id: nanoid()}, {name: "Сахар", amount: "100 г", id: nanoid()}],
        image: 'uploads/fixtures/Redsin.jpg'
    });


    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});