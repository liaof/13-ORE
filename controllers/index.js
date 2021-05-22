const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);// adds /api/ as a prefix to dashboard views
router.use('/dashboard', dashboardRoutes);// adds /dashboard/ as a prefix to dashboard views

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;
