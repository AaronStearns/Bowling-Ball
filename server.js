const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const {kNN} = require('nodeml');
let knn = new kNN();

// let myBowl = require("./bowling.js")

// https://github.com/proin/nodeml

var bowling = [{"bodyweight":117,"experience":3,"ballWeight":10},{"bodyweight":145,"experience":2,"ballWeight":12},{"bodyweight":179,"experience":3,"ballWeight":15},{"bodyweight":137,"experience":1,"ballWeight":10},{"bodyweight":156,"experience":1,"ballWeight":12},{"bodyweight":130,"experience":3,"ballWeight":11},{"bodyweight":137,"experience":2,"ballWeight":11},{"bodyweight":185,"experience":1,"ballWeight":14},{"bodyweight":153,"experience":1,"ballWeight":11},{"bodyweight":169,"experience":3,"ballWeight":15},{"bodyweight":170,"experience":1,"ballWeight":13},{"bodyweight":111,"experience":1,"ballWeight":8},{"bodyweight":133,"experience":3,"ballWeight":12},{"bodyweight":110,"experience":2,"ballWeight":9},{"bodyweight":116,"experience":3,"ballWeight":10},{"bodyweight":75,"experience":3,"ballWeight":7},{"bodyweight":146,"experience":2,"ballWeight":12},{"bodyweight":121,"experience":3,"ballWeight":11},{"bodyweight":140,"experience":1,"ballWeight":10},{"bodyweight":204,"experience":3,"ballWeight":16},{"bodyweight":153,"experience":1,"ballWeight":11},{"bodyweight":114,"experience":1,"ballWeight":9},{"bodyweight":173,"experience":2,"ballWeight":14},{"bodyweight":132,"experience":3,"ballWeight":11},{"bodyweight":151,"experience":3,"ballWeight":13},{"bodyweight":134,"experience":3,"ballWeight":12},{"bodyweight":153,"experience":2,"ballWeight":12},{"bodyweight":131,"experience":2,"ballWeight":11},{"bodyweight":110,"experience":1,"ballWeight":8},{"bodyweight":213,"experience":3,"ballWeight":16},{"bodyweight":150,"experience":3,"ballWeight":13},{"bodyweight":153,"experience":1,"ballWeight":11},{"bodyweight":114,"experience":1,"ballWeight":9},{"bodyweight":131,"experience":1,"ballWeight":10},{"bodyweight":133,"experience":2,"ballWeight":11},{"bodyweight":157,"experience":1,"ballWeight":12},{"bodyweight":175,"experience":1,"ballWeight":13},{"bodyweight":156,"experience":1,"ballWeight":12},{"bodyweight":119,"experience":3,"ballWeight":10},{"bodyweight":154,"experience":3,"ballWeight":13},{"bodyweight":81,"experience":2,"ballWeight":7},{"bodyweight":175,"experience":3,"ballWeight":15},{"bodyweight":174,"experience":1,"ballWeight":13},{"bodyweight":110,"experience":3,"ballWeight":10},{"bodyweight":144,"experience":1,"ballWeight":11},{"bodyweight":138,"experience":3,"ballWeight":12},{"bodyweight":214,"experience":1,"ballWeight":16},{"bodyweight":124,"experience":3,"ballWeight":11},{"bodyweight":129,"experience":3,"ballWeight":11},{"bodyweight":146,"experience":2,"ballWeight":12},{"bodyweight":185,"experience":3,"ballWeight":16},{"bodyweight":167,"experience":1,"ballWeight":12},{"bodyweight":200,"experience":3,"ballWeight":16},{"bodyweight":199,"experience":1,"ballWeight":15},{"bodyweight":153,"experience":1,"ballWeight":11},{"bodyweight":214,"experience":2,"ballWeight":16},{"bodyweight":110,"experience":1,"ballWeight":8},{"bodyweight":133,"experience":1,"ballWeight":10},{"bodyweight":129,"experience":3,"ballWeight":11},{"bodyweight":99,"experience":1,"ballWeight":8},{"bodyweight":122,"experience":1,"ballWeight":9},{"bodyweight":172,"experience":2,"ballWeight":14},{"bodyweight":163,"experience":1,"ballWeight":12},{"bodyweight":130,"experience":1,"ballWeight":10},{"bodyweight":155,"experience":2,"ballWeight":12},{"bodyweight":150,"experience":3,"ballWeight":13},{"bodyweight":182,"experience":2,"ballWeight":14},{"bodyweight":163,"experience":1,"ballWeight":12},{"bodyweight":134,"experience":2,"ballWeight":11},{"bodyweight":206,"experience":3,"ballWeight":16},{"bodyweight":157,"experience":2,"ballWeight":13},{"bodyweight":151,"experience":2,"ballWeight":12},{"bodyweight":155,"experience":2,"ballWeight":12},{"bodyweight":112,"experience":3,"ballWeight":10},{"bodyweight":145,"experience":2,"ballWeight":12},{"bodyweight":151,"experience":1,"ballWeight":11},{"bodyweight":166,"experience":3,"ballWeight":14},{"bodyweight":142,"experience":2,"ballWeight":11},{"bodyweight":127,"experience":2,"ballWeight":10},{"bodyweight":178,"experience":1,"ballWeight":13},{"bodyweight":182,"experience":3,"ballWeight":16},{"bodyweight":166,"experience":3,"ballWeight":14},{"bodyweight":127,"experience":1,"ballWeight":10},{"bodyweight":176,"experience":1,"ballWeight":13},{"bodyweight":144,"experience":2,"ballWeight":12},{"bodyweight":134,"experience":2,"ballWeight":11},{"bodyweight":122,"experience":2,"ballWeight":10},{"bodyweight":197,"experience":3,"ballWeight":16},{"bodyweight":140,"experience":3,"ballWeight":12},{"bodyweight":183,"experience":2,"ballWeight":15},{"bodyweight":171,"experience":3,"ballWeight":15},{"bodyweight":156,"experience":2,"ballWeight":12},{"bodyweight":141,"experience":1,"ballWeight":11},{"bodyweight":164,"experience":1,"ballWeight":12},{"bodyweight":150,"experience":3,"ballWeight":13},{"bodyweight":126,"experience":2,"ballWeight":10},{"bodyweight":145,"experience":3,"ballWeight":13},{"bodyweight":156,"experience":3,"ballWeight":13},{"bodyweight":139,"experience":1,"ballWeight":10},{"bodyweight":145,"experience":2,"ballWeight":12},{"bodyweight":162,"experience":3,"ballWeight":14},{"bodyweight":155,"experience":1,"ballWeight":12},{"bodyweight":166,"experience":2,"ballWeight":13},{"bodyweight":92,"experience":2,"ballWeight":8},{"bodyweight":165,"experience":2,"ballWeight":13},{"bodyweight":189,"experience":3,"ballWeight":16},{"bodyweight":168,"experience":2,"ballWeight":13},{"bodyweight":150,"experience":3,"ballWeight":13},{"bodyweight":157,"experience":1,"ballWeight":12},{"bodyweight":169,"experience":3,"ballWeight":15},{"bodyweight":209,"experience":3,"ballWeight":16},{"bodyweight":149,"experience":2,"ballWeight":12},{"bodyweight":94,"experience":1,"ballWeight":7},{"bodyweight":203,"experience":2,"ballWeight":16},{"bodyweight":156,"experience":1,"ballWeight":12},{"bodyweight":162,"experience":3,"ballWeight":14},{"bodyweight":164,"experience":1,"ballWeight":12},{"bodyweight":145,"experience":2,"ballWeight":12},{"bodyweight":147,"experience":3,"ballWeight":13},{"bodyweight":193,"experience":1,"ballWeight":14},{"bodyweight":178,"experience":2,"ballWeight":14},{"bodyweight":163,"experience":3,"ballWeight":14},{"bodyweight":181,"experience":2,"ballWeight":14},{"bodyweight":147,"experience":3,"ballWeight":13},{"bodyweight":118,"experience":2,"ballWeight":10},{"bodyweight":109,"experience":1,"ballWeight":8},{"bodyweight":109,"experience":2,"ballWeight":9},{"bodyweight":90,"experience":2,"ballWeight":7},{"bodyweight":171,"experience":2,"ballWeight":14},{"bodyweight":183,"experience":2,"ballWeight":15},{"bodyweight":141,"experience":1,"ballWeight":11},{"bodyweight":99,"experience":1,"ballWeight":8},{"bodyweight":86,"experience":2,"ballWeight":7},{"bodyweight":150,"experience":1,"ballWeight":11},{"bodyweight":148,"experience":3,"ballWeight":13},{"bodyweight":121,"experience":3,"ballWeight":11},{"bodyweight":186,"experience":3,"ballWeight":16},{"bodyweight":109,"experience":1,"ballWeight":8},{"bodyweight":147,"experience":2,"ballWeight":12},{"bodyweight":141,"experience":3,"ballWeight":12},{"bodyweight":130,"experience":3,"ballWeight":11},{"bodyweight":178,"experience":2,"ballWeight":14},{"bodyweight":141,"experience":2,"ballWeight":11},{"bodyweight":140,"experience":2,"ballWeight":11},{"bodyweight":158,"experience":1,"ballWeight":12},{"bodyweight":149,"experience":1,"ballWeight":11},{"bodyweight":186,"experience":1,"ballWeight":14},{"bodyweight":216,"experience":2,"ballWeight":16},{"bodyweight":169,"experience":3,"ballWeight":15},{"bodyweight":167,"experience":1,"ballWeight":12},{"bodyweight":117,"experience":3,"ballWeight":10},{"bodyweight":121,"experience":1,"ballWeight":9},{"bodyweight":115,"experience":3,"ballWeight":10},{"bodyweight":156,"experience":3,"ballWeight":13},{"bodyweight":164,"experience":2,"ballWeight":13},{"bodyweight":153,"experience":1,"ballWeight":11},{"bodyweight":115,"experience":1,"ballWeight":9},{"bodyweight":165,"experience":3,"ballWeight":14},{"bodyweight":153,"experience":2,"ballWeight":12},{"bodyweight":164,"experience":3,"ballWeight":14},{"bodyweight":121,"experience":3,"ballWeight":11},{"bodyweight":206,"experience":1,"ballWeight":15},{"bodyweight":86,"experience":3,"ballWeight":8},{"bodyweight":116,"experience":2,"ballWeight":9},{"bodyweight":175,"experience":2,"ballWeight":14},{"bodyweight":175,"experience":2,"ballWeight":14},{"bodyweight":193,"experience":2,"ballWeight":15},{"bodyweight":121,"experience":2,"ballWeight":10},{"bodyweight":148,"experience":2,"ballWeight":12},{"bodyweight":182,"experience":2,"ballWeight":14},{"bodyweight":164,"experience":3,"ballWeight":14},{"bodyweight":139,"experience":1,"ballWeight":10},{"bodyweight":148,"experience":1,"ballWeight":11},{"bodyweight":81,"experience":3,"ballWeight":7},{"bodyweight":154,"experience":1,"ballWeight":11},{"bodyweight":143,"experience":3,"ballWeight":12},{"bodyweight":131,"experience":3,"ballWeight":11},{"bodyweight":113,"experience":2,"ballWeight":9},{"bodyweight":159,"experience":3,"ballWeight":14},{"bodyweight":146,"experience":2,"ballWeight":12},{"bodyweight":182,"experience":3,"ballWeight":16},{"bodyweight":160,"experience":3,"ballWeight":14},{"bodyweight":163,"experience":3,"ballWeight":14},{"bodyweight":121,"experience":2,"ballWeight":10},{"bodyweight":160,"experience":3,"ballWeight":14},{"bodyweight":127,"experience":2,"ballWeight":10},{"bodyweight":163,"experience":2,"ballWeight":13},{"bodyweight":102,"experience":3,"ballWeight":9},{"bodyweight":211,"experience":2,"ballWeight":16},{"bodyweight":129,"experience":2,"ballWeight":10},{"bodyweight":127,"experience":3,"ballWeight":11},{"bodyweight":99,"experience":1,"ballWeight":8},{"bodyweight":134,"experience":2,"ballWeight":11},{"bodyweight":125,"experience":2,"ballWeight":10},{"bodyweight":154,"experience":2,"ballWeight":12},{"bodyweight":119,"experience":2,"ballWeight":10},{"bodyweight":168,"experience":3,"ballWeight":14},{"bodyweight":174,"experience":3,"ballWeight":15},{"bodyweight":148,"experience":3,"ballWeight":13},{"bodyweight":161,"experience":3,"ballWeight":14},{"bodyweight":176,"experience":1,"ballWeight":13},{"bodyweight":184,"experience":2,"ballWeight":15},{"bodyweight":119,"experience":1,"ballWeight":9},{"bodyweight":168,"experience":2,"ballWeight":13},{"bodyweight":171,"experience":3,"ballWeight":15},{"bodyweight":203,"experience":2,"ballWeight":16},{"bodyweight":135,"experience":2,"ballWeight":11},{"bodyweight":178,"experience":3,"ballWeight":15},{"bodyweight":170,"experience":2,"ballWeight":14},{"bodyweight":130,"experience":1,"ballWeight":10},{"bodyweight":108,"experience":1,"ballWeight":8},{"bodyweight":166,"experience":3,"ballWeight":14},{"bodyweight":141,"experience":3,"ballWeight":12},{"bodyweight":141,"experience":3,"ballWeight":12},{"bodyweight":155,"experience":2,"ballWeight":12},{"bodyweight":113,"experience":3,"ballWeight":10},{"bodyweight":183,"experience":1,"ballWeight":14},{"bodyweight":176,"experience":3,"ballWeight":15},{"bodyweight":124,"experience":3,"ballWeight":11},{"bodyweight":118,"experience":3,"ballWeight":10},{"bodyweight":99,"experience":2,"ballWeight":8},{"bodyweight":113,"experience":3,"ballWeight":10},{"bodyweight":176,"experience":1,"ballWeight":13},{"bodyweight":104,"experience":3,"ballWeight":9},{"bodyweight":157,"experience":1,"ballWeight":12},{"bodyweight":116,"experience":1,"ballWeight":9},{"bodyweight":144,"experience":1,"ballWeight":11},{"bodyweight":136,"experience":1,"ballWeight":10},{"bodyweight":201,"experience":1,"ballWeight":15},{"bodyweight":133,"experience":2,"ballWeight":11},{"bodyweight":125,"experience":1,"ballWeight":9},{"bodyweight":133,"experience":3,"ballWeight":12},{"bodyweight":144,"experience":3,"ballWeight":12},{"bodyweight":162,"experience":1,"ballWeight":12},{"bodyweight":99,"experience":3,"ballWeight":9},{"bodyweight":132,"experience":1,"ballWeight":10},{"bodyweight":160,"experience":2,"ballWeight":13},{"bodyweight":167,"experience":2,"ballWeight":13},{"bodyweight":193,"experience":2,"ballWeight":15},{"bodyweight":107,"experience":2,"ballWeight":9},{"bodyweight":151,"experience":2,"ballWeight":12},{"bodyweight":134,"experience":3,"ballWeight":12},{"bodyweight":115,"experience":2,"ballWeight":9},{"bodyweight":202,"experience":2,"ballWeight":16},{"bodyweight":141,"experience":3,"ballWeight":12},{"bodyweight":173,"experience":2,"ballWeight":14},{"bodyweight":164,"experience":1,"ballWeight":12},{"bodyweight":93,"experience":3,"ballWeight":8},{"bodyweight":130,"experience":3,"ballWeight":11},{"bodyweight":179,"experience":2,"ballWeight":14},{"bodyweight":154,"experience":2,"ballWeight":12},{"bodyweight":173,"experience":2,"ballWeight":14},{"bodyweight":105,"experience":3,"ballWeight":9},{"bodyweight":167,"experience":3,"ballWeight":14},{"bodyweight":179,"experience":3,"ballWeight":15},{"bodyweight":111,"experience":1,"ballWeight":8},{"bodyweight":92,"experience":1,"ballWeight":7},{"bodyweight":165,"experience":1,"ballWeight":12},{"bodyweight":97,"experience":2,"ballWeight":8},{"bodyweight":114,"experience":2,"ballWeight":9},{"bodyweight":148,"experience":3,"ballWeight":13},{"bodyweight":150,"experience":3,"ballWeight":13},{"bodyweight":205,"experience":3,"ballWeight":16},{"bodyweight":186,"experience":3,"ballWeight":16},{"bodyweight":106,"experience":3,"ballWeight":9},{"bodyweight":179,"experience":2,"ballWeight":14},{"bodyweight":167,"experience":1,"ballWeight":12},{"bodyweight":175,"experience":2,"ballWeight":14},{"bodyweight":131,"experience":1,"ballWeight":10},{"bodyweight":171,"experience":2,"ballWeight":14},{"bodyweight":187,"experience":3,"ballWeight":16},{"bodyweight":78,"experience":2,"ballWeight":6},{"bodyweight":132,"experience":2,"ballWeight":11},{"bodyweight":137,"experience":3,"ballWeight":12},{"bodyweight":181,"experience":3,"ballWeight":16},{"bodyweight":173,"experience":3,"ballWeight":15},{"bodyweight":126,"experience":1,"ballWeight":9},{"bodyweight":188,"experience":1,"ballWeight":14},{"bodyweight":132,"experience":2,"ballWeight":11},{"bodyweight":97,"experience":1,"ballWeight":7},{"bodyweight":135,"experience":3,"ballWeight":12},{"bodyweight":141,"experience":3,"ballWeight":12},{"bodyweight":133,"experience":3,"ballWeight":12},{"bodyweight":206,"experience":1,"ballWeight":15},{"bodyweight":114,"experience":3,"ballWeight":10},{"bodyweight":147,"experience":3,"ballWeight":13},{"bodyweight":135,"experience":1,"ballWeight":10},{"bodyweight":155,"experience":2,"ballWeight":12},{"bodyweight":143,"experience":1,"ballWeight":11},{"bodyweight":123,"experience":3,"ballWeight":11},{"bodyweight":146,"experience":1,"ballWeight":11},{"bodyweight":179,"experience":1,"ballWeight":13},{"bodyweight":207,"experience":3,"ballWeight":16},{"bodyweight":115,"experience":2,"ballWeight":9},{"bodyweight":117,"experience":2,"ballWeight":9},{"bodyweight":125,"experience":1,"ballWeight":9},{"bodyweight":160,"experience":1,"ballWeight":12},{"bodyweight":138,"experience":1,"ballWeight":10},{"bodyweight":163,"experience":3,"ballWeight":14},{"bodyweight":144,"experience":2,"ballWeight":12},{"bodyweight":161,"experience":2,"ballWeight":13},{"bodyweight":135,"experience":2,"ballWeight":11},{"bodyweight":174,"experience":3,"ballWeight":15},{"bodyweight":160,"experience":2,"ballWeight":13},{"bodyweight":169,"experience":1,"ballWeight":13},{"bodyweight":130,"experience":1,"ballWeight":10},{"bodyweight":164,"experience":2,"ballWeight":13},{"bodyweight":64,"experience":2,"ballWeight":6},{"bodyweight":102,"experience":3,"ballWeight":9},{"bodyweight":157,"experience":1,"ballWeight":12},{"bodyweight":167,"experience":2,"ballWeight":13},{"bodyweight":105,"experience":1,"ballWeight":8},{"bodyweight":163,"experience":2,"ballWeight":13},{"bodyweight":162,"experience":1,"ballWeight":12},{"bodyweight":124,"experience":1,"ballWeight":9},{"bodyweight":86,"experience":2,"ballWeight":7},{"bodyweight":187,"experience":2,"ballWeight":15},{"bodyweight":137,"experience":1,"ballWeight":10},{"bodyweight":136,"experience":1,"ballWeight":10},{"bodyweight":153,"experience":3,"ballWeight":13},{"bodyweight":151,"experience":3,"ballWeight":13},{"bodyweight":171,"experience":3,"ballWeight":15},{"bodyweight":123,"experience":3,"ballWeight":11},{"bodyweight":192,"experience":2,"ballWeight":15},{"bodyweight":135,"experience":3,"ballWeight":12},{"bodyweight":141,"experience":3,"ballWeight":12},{"bodyweight":145,"experience":3,"ballWeight":13},{"bodyweight":129,"experience":3,"ballWeight":11},{"bodyweight":200,"experience":2,"ballWeight":16},{"bodyweight":172,"experience":3,"ballWeight":15},{"bodyweight":110,"experience":2,"ballWeight":9},{"bodyweight":75,"experience":1,"ballWeight":6},{"bodyweight":187,"experience":2,"ballWeight":15},{"bodyweight":170,"experience":3,"ballWeight":15},{"bodyweight":134,"experience":2,"ballWeight":11},{"bodyweight":154,"experience":1,"ballWeight":11},{"bodyweight":135,"experience":2,"ballWeight":11},{"bodyweight":212,"experience":1,"ballWeight":16},{"bodyweight":149,"experience":2,"ballWeight":12},{"bodyweight":136,"experience":1,"ballWeight":10},{"bodyweight":94,"experience":2,"ballWeight":8},{"bodyweight":133,"experience":2,"ballWeight":11},{"bodyweight":178,"experience":2,"ballWeight":14},{"bodyweight":157,"experience":1,"ballWeight":12},{"bodyweight":199,"experience":2,"ballWeight":16},{"bodyweight":179,"experience":3,"ballWeight":15},{"bodyweight":163,"experience":1,"ballWeight":12},{"bodyweight":149,"experience":1,"ballWeight":11},{"bodyweight":118,"experience":3,"ballWeight":10},{"bodyweight":133,"experience":3,"ballWeight":12},{"bodyweight":180,"experience":1,"ballWeight":13},{"bodyweight":119,"experience":3,"ballWeight":10},{"bodyweight":99,"experience":1,"ballWeight":8},{"bodyweight":160,"experience":2,"ballWeight":13},{"bodyweight":123,"experience":3,"ballWeight":11},{"bodyweight":215,"experience":2,"ballWeight":16},{"bodyweight":160,"experience":2,"ballWeight":13},{"bodyweight":109,"experience":2,"ballWeight":9},{"bodyweight":183,"experience":1,"ballWeight":14},{"bodyweight":134,"experience":3,"ballWeight":12},{"bodyweight":158,"experience":2,"ballWeight":13},{"bodyweight":169,"experience":1,"ballWeight":13},{"bodyweight":190,"experience":2,"ballWeight":15},{"bodyweight":123,"experience":2,"ballWeight":10},{"bodyweight":117,"experience":2,"ballWeight":9},{"bodyweight":153,"experience":1,"ballWeight":11},{"bodyweight":153,"experience":3,"ballWeight":13},{"bodyweight":171,"experience":2,"ballWeight":14},{"bodyweight":147,"experience":3,"ballWeight":13},{"bodyweight":145,"experience":1,"ballWeight":11},{"bodyweight":176,"experience":2,"ballWeight":14},{"bodyweight":197,"experience":3,"ballWeight":16},{"bodyweight":152,"experience":3,"ballWeight":13},{"bodyweight":153,"experience":1,"ballWeight":11},{"bodyweight":115,"experience":3,"ballWeight":10},{"bodyweight":205,"experience":3,"ballWeight":16},{"bodyweight":216,"experience":1,"ballWeight":16},{"bodyweight":107,"experience":3,"ballWeight":9},{"bodyweight":130,"experience":1,"ballWeight":10},{"bodyweight":125,"experience":2,"ballWeight":10},{"bodyweight":125,"experience":2,"ballWeight":10},{"bodyweight":105,"experience":1,"ballWeight":8},{"bodyweight":144,"experience":2,"ballWeight":12},{"bodyweight":169,"experience":2,"ballWeight":13},{"bodyweight":155,"experience":2,"ballWeight":12},{"bodyweight":175,"experience":1,"ballWeight":13},{"bodyweight":132,"experience":3,"ballWeight":11},{"bodyweight":162,"experience":1,"ballWeight":12},{"bodyweight":151,"experience":2,"ballWeight":12},{"bodyweight":155,"experience":3,"ballWeight":13},{"bodyweight":144,"experience":2,"ballWeight":12},{"bodyweight":177,"experience":3,"ballWeight":15},{"bodyweight":207,"experience":2,"ballWeight":16},{"bodyweight":146,"experience":2,"ballWeight":12},{"bodyweight":140,"experience":3,"ballWeight":12},{"bodyweight":163,"experience":2,"ballWeight":13},{"bodyweight":128,"experience":3,"ballWeight":11},{"bodyweight":130,"experience":2,"ballWeight":10},{"bodyweight":162,"experience":3,"ballWeight":14},{"bodyweight":175,"experience":2,"ballWeight":14},{"bodyweight":167,"experience":1,"ballWeight":12},{"bodyweight":188,"experience":3,"ballWeight":16},{"bodyweight":140,"experience":1,"ballWeight":10},{"bodyweight":197,"experience":3,"ballWeight":16},{"bodyweight":106,"experience":3,"ballWeight":9},{"bodyweight":183,"experience":3,"ballWeight":16},{"bodyweight":166,"experience":3,"ballWeight":14},{"bodyweight":147,"experience":1,"ballWeight":11},{"bodyweight":165,"experience":1,"ballWeight":12},{"bodyweight":97,"experience":2,"ballWeight":8},{"bodyweight":114,"experience":2,"ballWeight":9},{"bodyweight":139,"experience":3,"ballWeight":12},{"bodyweight":163,"experience":2,"ballWeight":13},{"bodyweight":193,"experience":1,"ballWeight":14},{"bodyweight":147,"experience":1,"ballWeight":11},{"bodyweight":144,"experience":2,"ballWeight":12},{"bodyweight":137,"experience":2,"ballWeight":11},{"bodyweight":127,"experience":3,"ballWeight":11},{"bodyweight":131,"experience":1,"ballWeight":10},{"bodyweight":192,"experience":3,"ballWeight":16},{"bodyweight":64,"experience":2,"ballWeight":6},{"bodyweight":138,"experience":1,"ballWeight":10},{"bodyweight":174,"experience":2,"ballWeight":14},{"bodyweight":147,"experience":2,"ballWeight":12},{"bodyweight":106,"experience":3,"ballWeight":9},{"bodyweight":133,"experience":3,"ballWeight":12},{"bodyweight":125,"experience":1,"ballWeight":9},{"bodyweight":134,"experience":3,"ballWeight":12},{"bodyweight":137,"experience":3,"ballWeight":12},{"bodyweight":127,"experience":1,"ballWeight":10},{"bodyweight":133,"experience":3,"ballWeight":12},{"bodyweight":153,"experience":3,"ballWeight":13},{"bodyweight":192,"experience":3,"ballWeight":16},{"bodyweight":120,"experience":2,"ballWeight":10},{"bodyweight":165,"experience":1,"ballWeight":12},{"bodyweight":164,"experience":1,"ballWeight":12},{"bodyweight":183,"experience":3,"ballWeight":16},{"bodyweight":192,"experience":1,"ballWeight":14},{"bodyweight":151,"experience":1,"ballWeight":11},{"bodyweight":142,"experience":3,"ballWeight":12},{"bodyweight":169,"experience":3,"ballWeight":15},{"bodyweight":171,"experience":2,"ballWeight":14},{"bodyweight":188,"experience":1,"ballWeight":14},{"bodyweight":140,"experience":3,"ballWeight":12},{"bodyweight":173,"experience":1,"ballWeight":13},{"bodyweight":221,"experience":3,"ballWeight":16},{"bodyweight":150,"experience":1,"ballWeight":11},{"bodyweight":106,"experience":2,"ballWeight":9},{"bodyweight":166,"experience":2,"ballWeight":13},{"bodyweight":178,"experience":2,"ballWeight":14},{"bodyweight":106,"experience":3,"ballWeight":9},{"bodyweight":153,"experience":2,"ballWeight":12},{"bodyweight":102,"experience":1,"ballWeight":8},{"bodyweight":196,"experience":1,"ballWeight":14},{"bodyweight":105,"experience":1,"ballWeight":8},{"bodyweight":125,"experience":3,"ballWeight":11},{"bodyweight":89,"experience":1,"ballWeight":7},{"bodyweight":143,"experience":3,"ballWeight":12},{"bodyweight":137,"experience":3,"ballWeight":12},{"bodyweight":156,"experience":3,"ballWeight":13},{"bodyweight":125,"experience":1,"ballWeight":9},{"bodyweight":155,"experience":1,"ballWeight":12},{"bodyweight":110,"experience":2,"ballWeight":9},{"bodyweight":174,"experience":1,"ballWeight":13},{"bodyweight":128,"experience":2,"ballWeight":10},{"bodyweight":155,"experience":1,"ballWeight":12},{"bodyweight":154,"experience":3,"ballWeight":13},{"bodyweight":156,"experience":2,"ballWeight":12},{"bodyweight":139,"experience":3,"ballWeight":12},{"bodyweight":147,"experience":1,"ballWeight":11},{"bodyweight":168,"experience":1,"ballWeight":12},{"bodyweight":129,"experience":1,"ballWeight":10},{"bodyweight":150,"experience":3,"ballWeight":13},{"bodyweight":167,"experience":2,"ballWeight":13},{"bodyweight":138,"experience":3,"ballWeight":12},{"bodyweight":147,"experience":1,"ballWeight":11},{"bodyweight":141,"experience":1,"ballWeight":11},{"bodyweight":126,"experience":2,"ballWeight":10},{"bodyweight":131,"experience":3,"ballWeight":11},{"bodyweight":186,"experience":2,"ballWeight":15},{"bodyweight":126,"experience":1,"ballWeight":9},{"bodyweight":133,"experience":2,"ballWeight":11},{"bodyweight":111,"experience":2,"ballWeight":9},{"bodyweight":196,"experience":1,"ballWeight":14},{"bodyweight":174,"experience":3,"ballWeight":15},{"bodyweight":216,"experience":3,"ballWeight":16},{"bodyweight":188,"experience":2,"ballWeight":15},{"bodyweight":118,"experience":1,"ballWeight":9},{"bodyweight":126,"experience":2,"ballWeight":10},{"bodyweight":177,"experience":2,"ballWeight":14},{"bodyweight":111,"experience":2,"ballWeight":9},{"bodyweight":145,"experience":2,"ballWeight":12},{"bodyweight":157,"experience":1,"ballWeight":12},{"bodyweight":151,"experience":3,"ballWeight":13},{"bodyweight":144,"experience":2,"ballWeight":12},{"bodyweight":174,"experience":1,"ballWeight":13},{"bodyweight":193,"experience":3,"ballWeight":16},{"bodyweight":147,"experience":1,"ballWeight":11},{"bodyweight":186,"experience":3,"ballWeight":16},{"bodyweight":174,"experience":2,"ballWeight":14}]


let bodyweights = [];
let experience = [];
let ballWeights = [];

for(var i=0;i<bowling.length;i++){
    if(bowling[i].bodyweight != null){
        bodyweights.push(bowling[i].bodyweight);
        experience.push(bowling[i].experience);
        ballWeights.push(bowling[i].ballWeight);
    }
}

zip = rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))

var newArr = zip([bodyweights, experience])

// train
knn.train(newArr, ballWeights);    



app.post('/api/world', (req, res) => {
  console.log(req.body);
  let result = knn.test([req.body.bodyweight, req.body.experience], 5);
  res.send(
    //req.body
    result[0] + "lbs"
  );
});





if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));