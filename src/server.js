const app = require('./app');
const sequelize = require('./models');
const runMigrations = require('./run-migrate');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await runMigrations(sequelize);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
