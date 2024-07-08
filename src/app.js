const express = require('express');
const sequelize = require('./models');
const User = require('./models/user');

const app = express();
app.use(express.json());

const updateBalance = async (userId, amount) => {
    const transaction = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId, { transaction, lock: transaction.LOCK.UPDATE });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.balance + amount < 0) {
            throw new Error('Insufficient funds');
        }

        user.balance += amount;
        await user.save({ transaction });
        await transaction.commit();

        return user.balance;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const updateBalanceSimple = async (userId, amount) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.balance + amount < 0) {
            throw new Error('Insufficient funds');
        }

        user.balance += amount;
        await user.save();

        return user.balance;
    } catch (error) {
        throw error;
    }
};

app.post('/balance-up', async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const balance = await updateBalance(userId, amount);
        res.send({ success: true, balance });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/balance-down', async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const balance = await updateBalance(userId, -amount);
        res.send({ success: true, balance });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = app;
