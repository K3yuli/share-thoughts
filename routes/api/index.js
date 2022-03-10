// import all of the API routes to prefix their endpoint names & package them up

const router = require('express').Router();

const thoughtRoutes = require('./thought-routes')
const userRoutes = require('./user-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;