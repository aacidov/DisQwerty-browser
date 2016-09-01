function Timer() {
}

Timer.prototype.updateRows = function () {
  this.rows = [].slice.apply(document.getElementsByClassName('row'));
};

Timer.prototype.reset = function () {
  this.updateRows();
  this.cy=this.cx=0;
  this.inRow=false;
};

Timer.prototype.start = function () {
  var self = this;
  this.reset();
  this.timer = setInterval(function () { self.cicle(); }, this.timeout*1000);

};

Timer.prototype.stop = function () {
  if (this.timer!=null){
    clearInterval(this.timer);
    this.timer=null;
  }
  var selected = document.getElementsByClassName('selected')[0]
  if (selected!=null){
    selected.classList.remove('selected');
  }
};

Timer.prototype.cicle = function () {
  if(!this.inRow){
    this.curRow = this.rows[this.cy];
    this.prevRow = this.rows[(this.cy==0?this.rows.length:this.cy)-1];
    console.log(this.rows);
    this.curRow.classList.add("selected");
    this.prevRow.classList.remove("selected");
    this.cy=this.cy==this.rows.length-1?0:this.cy+1;
    return;
  }
  this.curButton = this.buttons[this.cx];
  this.prevButton = this.buttons[(this.cx==0?this.buttons.length:this.cx)-1];
  this.curButton.classList.add("selected");
  this.prevButton.classList.remove("selected");
  this.cx=this.cx==this.buttons.length-1?0:this.cx+1;

};

Timer.prototype.choose = function () {
  if(!this.inRow){
    this.inRow=true;
    this.curRow.classList.remove("selected");
    this.buttons = [].slice.apply( this.curRow.childNodes);
    return;
  }
  var choosen = document.getElementsByClassName('selected')[0];
  choosen.classList.remove("selected");
  choosen.onchoose();
  this.onchoose();
  this.reset();
};

Timer.prototype.exitFromRow = function () {
  this.inRow=false;
  this.curButton.classList.remove("selected");
};

module.exports = Timer;
