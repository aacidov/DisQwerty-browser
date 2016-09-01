function Output() {
  this.outEl = document.getElementById('output');
}

Output.prototype.print = function (string) {
  this.outEl.innerText+=string;
};

Output.prototype.clear = function () {
  this.outEl.innerText='';
};

Output.prototype.removeLastWord = function () {
  var words = this.outEl.innerText.split(' ');
  words=words.slice(0,-1);
  this.outEl.innerText=words.join(' ')+' ';
};

Output.prototype.removeLastSymbol = function () {
  this.outEl.innerText = this.outEl.innerText.slice(0,-1);
};

Output.prototype.getText = function () {
  return this.outEl.innerText;
};

module.exports = Output;
