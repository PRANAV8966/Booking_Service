const express = require("express");
const router = express.Router();

const v1Routes = require('./V1/index')

router.get('/v1', v1Routes);


module.exports = router;
