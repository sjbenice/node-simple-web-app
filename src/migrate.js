const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const config = require('./config/database');

const sequelize = new Sequelize(config.development);

const umzug = new Umzug({
    migrations: {
        glob: 'src/migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize }),
    context: sequelize.getQueryInterface(),
    logger: console,
});

(async () => {
    await umzug.up();
    console.log('Migrations executed successfully');
    process.exit(0);
})();
