function Settings(dom, timer) {
  var self = this;

  this.isRun=false;
  this.timer = timer;
  this.dom = dom;
  dom.timeoutInput.value=this.setTimeout(this.getTimeout());
  dom.startButton.onclick = function () {
    self.onButtonClick();
  }
  dom.timeoutChangeButton.onclick = function () {
    console.log('change');
    self.setTimeout(self.dom.timeoutInput.value);
  };
  dom.onsubmit = function () {
    return false;
  }
}

Settings.prototype.getTimeout = function () {
  if (window.localStorage.timeout == null) {
    this.setTimeout(1);
  }
  return window.localStorage.timeout;
};

Settings.prototype.setTimeout = function (timeout) {
  this.timer.timeout=window.localStorage.timeout = timeout;
  if (this.isRun){
    this.timer.stop();
    this.timer.start();
  }
  return timeout;
};

Settings.prototype.onButtonClick = function () {
  if (this.isRun) {
    this.timer.stop();
    this.isRun = false;
  } else {
    this.isRun=true;
    this.timer.start();
  }
  this.changeButtonLabel();

};

Settings.prototype.changeButtonLabel = function () {
  if (this.isRun){
    this.dom.startButton.value="Стоп";
    return;
  }
  this.dom.startButton.value="Старт";
};

module.exports = Settings;
