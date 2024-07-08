const { DataTypes, fn } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        console.log(queryInterface);
        await queryInterface.createTable('Users', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: DataTypes.INTEGER,
          },
          balance: {
              type: DataTypes.INTEGER,
              allowNull: false,
              defaultValue: 10000,
              validate: {
                min: 0, // Ensure balance is not negative
              },
          },
          createdAt: {
              allowNull: false,
              type: DataTypes.DATE,
              defaultValue: fn('now'),
          },
          updatedAt: {
              allowNull: false,
              type: DataTypes.DATE,
              defaultValue: fn('now'),
          },
        });

        // Add a user with a balance of 10000
        await queryInterface.bulkInsert('Users', [{ balance: 10000, createdAt: new Date(), updatedAt: new Date() }]);
    },
  
    down: async (queryInterface) => {
        await queryInterface.dropTable('Users');
    },
};
  