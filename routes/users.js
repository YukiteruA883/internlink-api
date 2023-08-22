var express = require('express');
var router = express.Router();

const { get_all_users,check_user, create_user } = require('../view/users')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ msg: 'respond with a resource' });
});

router.get('/all', async (req, res) => {
  try {
    const _out = await get_all_users(req.body)
    return res.json(_out)
  } catch (err) {
    return res.json({ message: err })
  }
})

router.post('/login', async (req, res) => {
  try {
    const _out = await check_user(req.body)
    return res.json(_out)
  } catch (err) {
    return res.json({ message: err })
  }
})

router.post('/signup', async (req, res) => {
  try {
    const _out = await create_user(req.body);
    return res.json(_out);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});


module.exports = router;
