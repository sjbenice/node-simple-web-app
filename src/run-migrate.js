const { Umzug, SequelizeStorage } = require('umzug');

const runMigrations = async (sequelize) => {
    const tableExists = await sequelize.getQueryInterface().showAllTables()
        .then(tables => tables.includes('Users'));
  
    if (!tableExists) {
        const umzug = new Umzug({
            migrations: {
                glob: 'src/migrations/*.js',
                resolve: ({ name, path, context }) => {
                    const migration = require(path);
                    return {
                      name,
                      up: async () => migration.up(context),
                      down: async () => migration.down(context),
                    };
                  },
                  params: [sequelize.getQueryInterface()], // Pass queryInterface and Sequelize
            },
            storage: new SequelizeStorage({ sequelize }),
            context: sequelize.getQueryInterface(),
            logger: console,
        });
        await umzug.up();
        console.log('Migrations executed successfully');
    }
};
  
module.exports = runMigrations;
