const express = require('express');

const expenseController = require('../controllers/Expense');

const router = express.Router();

router.get('/expense',expenseController.getExpense);
router.post('/expense',expenseController.addExpense);
router.delete('/expense/:ID',expenseController.expensedelete);

module.exports = router;