const express = require('express');
const router = express.Router();
const megaController = require('../controllers/megaController');

router.get('/folders', megaController.getFolders);
router.get('/elements', megaController.getElements);
router.get('/download/:id', megaController.downloadElement);

//USERS
router.get('/users/retrieve/:id/:page', megaController.getUserById);
router.put('/users/create/:id', megaController.createUser);

//CREATE
router.put('/bet/create/:id', megaController.createBet);
router.put('/bet/insert/:id', megaController.createBet);

//UPDATE
// router.put('/users/update/:id', megaController.updateUser);
// router.put('/bet/update/:id', megaController.updateBet);

//DELETE
// router.delete('/users/delete/:id', megaController.deleteUser);
router.delete('/bet/delete/:id', megaController.deleteBet);

module.exports = router;
