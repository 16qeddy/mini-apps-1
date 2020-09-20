const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express()
const port = 3000


// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static('client'))

app.post('/formSubmit', async (req, res) => {

  try{
    let csv = createCVS(JSON.parse(req.body.data));
    fs.writeFile('./samples/csv_report.csv', csv, (err)=>{
      if(err){
        throw err;
      }
      console.log('file created!');
    });
    console.log('we made it');
    res.sendFile('/home/goat/code/hrr48-mini-apps-1/challenge_2/samples/csv_report.csv');
  }
  catch(err){
    console.log(err);
    res.redirect('/');
    res.end();
  };
})

// app.post('/formData', (req, res)=>{
//   console.log(req.body);
//   res.end();
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//converts a object into CSV
function createCVS(data){
  let firstLine = '';
  let keys = [];
  let queue = [];
  let cvs = '';

  function getKeys(obj){
    for(var key in obj){
      if(Array.isArray(obj[key]) && obj[key].length>0){
        obj[key].forEach((item)=>{getKeys(item)});
      } else if(!Array.isArray(obj[key])){
        keys.push(key);
      }
    }
  }
  getKeys(data);
  keys = [...new Set(keys)];
  firstLine = keys.join(',');

  function convert(obj){
    for(var i = 0; i < keys.length; i++){
        key = keys[i];
        queue.push(obj[key]);
      }
    for(var key in obj){
      if(Array.isArray(obj[key])){
        obj[key].forEach((item)=>{
          convert(item);
        })
      }
    }
  }
  convert(data);
  cvs+= `${firstLine}\n`;
  for(var i = 0; i < queue.length; i++){
    cvs+= `${queue[i]}`;
    if((i+1)%keys.length === 0 && i>0){
      cvs += '\n';
    } else {
      cvs+= ','
    }
  }
  return cvs;
}
