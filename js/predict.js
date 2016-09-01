var request = require('request');

function Predict(key) {
  this.key=key;
}

Predict.prototype.complete = function (q, cb) {
  var self = this;
  request("https://predictor.yandex.net/api/v1/predict.json/complete?key="+this.key+"&q="+q.replace('&nbsp;', '')+"&lang=ru&limit=3", function (err, response, body) {
    if(err) return cb(err);
    var data = JSON.parse(body);
    self.pos = data.pos;
    cb(err, data);
  });
};

module.exports=Predict;
