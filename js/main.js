var Table = require('./table');
var Timer = require('./timer');
var Output = require('./output');
var Cursor = require('./cursor');
var Predict = require('./predict');
var Settings = require('./settings');

var output = new Output();
var cursor = new Cursor(document.getElementById('cursor'));
var predict = new Predict("pdct.1.1.20160717T095459Z.24459ab1ddfe3b1c.0924f3557e8356f8d8e17eb5997f514b7ae105c3");

var timer = new Timer();

var keyboard = new Table(document.getElementById('keyboard'), timer, function () {
  output.print(this.value);
});
keyboard.init('йцукенгшщзхъёфывапролджэячсмитьбю,.?! '.split(''));

var controls = new Table(document.getElementById('controls'), timer, function () {});
controls.init([
  {content:"<-", event:function () {output.removeLastSymbol();}},
  {content:"<=", event:function (){ output.removeLastWord();}},
  {content:"#", event:function () {output.clear();}}
]);

var predictWords = new Table(document.getElementById('predictWords'), timer, function () {
  console.log(predict.pos);
  if (predict.pos<0) {
    output.removeLastWord();
  }  else  {
    output.print(" ");
  }

  output.print(this.value + " ");
});
timer.onchoose = function () {
  predict.complete(output.getText(), function (err, res) {
    if(err!=null) return console.error(err);
    predictWords.init(res.text);
    timer.reset();
  });
};

var settings = new Settings(document.getElementById('settings'), timer);

var chooseButton = document.getElementById('keyboard');

chooseButton.onclick = function () {timer.choose(); };
