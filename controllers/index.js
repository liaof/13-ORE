const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes);//located in /api subfolder
router.use('/', homeRoutes);//located in same folder as this file

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
