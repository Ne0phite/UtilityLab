const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.get('/math/:operation', (req, res) => {
  let obj = { input: {}, sumString: '', sum: 5 };

  for (const prop in req.query) {
    obj.input[prop] = req.query[prop];
  }
  let numsArr = Object.values(obj.input);
  let mySum = 0;
  let str = '';
  // res.send(req.params.operation)
  if(req.params.operation === "add"){
    numsArr.forEach(el => {
      if(!isNaN(el)){
        str += el + " + ";
        mySum += Number(el);
      }else{
        res.send("Please enter valid numbers for values");
      }
    });

    let myStr = str.slice(0, str.length-2)
    obj.sum = mySum;
    obj.sumString = myStr;
    res.json(obj);

  } else if(req.params.operation === "subtract"){
    numsArr.forEach((el, i) => {
      if(!isNaN(el)){
        str += el + " - ";
        if(i > 0){
          mySum -= Number(el);
        } else {
          mySum += Number(el);
        }
      }else{
        res.send("Please enter valid numbers for values");
      }
    });
    let myStr = str.slice(0, str.length-2)
    obj.sum = mySum;
    obj.sumString = myStr;

    res.json(obj);
  } else if(req.params.operation === "multiply"){
    numsArr.forEach((el, i) => {
      if(!isNaN(el)){

        str += el + " * ";

        if(i === 0){
          mySum += Number(el);
        } else {
          mySum *= Number(el);
        }

      }else{
        res.send("Please enter valid numbers for values");
      }
    });

    let myStr = str.slice(0, str.length-2)
    obj.sum = mySum;
    obj.sumString = myStr;
    res.json(obj);

  } else if(req.params.operation === "divide"){
      numsArr.forEach((el, i) => {
        if(!isNaN(el)){

          str += el + " / ";
          if(i === 0){
            mySum += Number(el);
          } else {
            mySum = mySum/Number(el);
          }

        }else{
          res.send("Please enter valid numbers for values");
        }
      });

      let myStr = str.slice(0, str.length-2)
      obj.sum = mySum;
      obj.sumString = myStr;
      res.json(obj);
    }
})

app.listen(8000, () => {
  console.log("You are listening to port 3000");
})
