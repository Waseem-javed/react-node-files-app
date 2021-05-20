var express = require('express');
var router = express.Router();
var multer = require('multer');

const fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var upload = multer();

router.post('/upload', upload.single('file'), (req, res,next) => {
  const { file, body: { description } } = req;
  console.log(file.originalname, description);
  const data = []
  const obj = {
    id:Math.floor(Math.random() * 100)+1,
    imageName: file.originalname,
    description:description
  }

  fs.readFile('data/data.json', (err, data) => {
    if (err) {
      return console.log('Empty json file')
    } else {
      const dataArr = JSON.parse(data);
      dataArr.push(obj)

      fs.writeFile('data/data.json',JSON.stringify(dataArr), (err, data) => {
        if (err) {
          console.log(err.message)
        } else {
          console.log('complete wrote')
        }
      });
    }
  })

})


router.get('/api', (req, res, next) => {
  fs.readFile('data/data.json', function (err, content) {

    if(err) return console.error(err)

      res.json(JSON.parse(content));
  });

})

module.exports = router;
