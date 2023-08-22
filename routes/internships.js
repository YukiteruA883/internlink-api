var express = require('express');
var router = express.Router();

const { add_internship, get_all_internships} = require('../view/internships')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ msg: 'respond with a resource' });
});

router.get('/all', async (req, res) => {
    try {
      const _out = await get_all_internships(req.body)
      return res.json(_out)
    } catch (err) {
      return res.json({ message: err })
    }
  })

router.post('/add', async (req, res) => {
    try {
      const _out = await add_internship(req.body);
      return res.json(_out);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  });

module.exports = router;
