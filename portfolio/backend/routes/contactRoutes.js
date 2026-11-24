const router = require('express').Router();
const c = require('../controllers/contactController');
router.post('/', c.createContact);
router.get('/', c.listContacts);
module.exports = router;
