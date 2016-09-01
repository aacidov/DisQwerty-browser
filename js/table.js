
function Table(domElement, timer, defaultOnClickEvent) {
  this.domElement=domElement;
  this.timer=timer;
  this.defaultOnClickEvent=defaultOnClickEvent;
}

Table.prototype.init = function (array) {
  var self = this;
  this.lastRow=null;
  this.domElement.innerHTML = '';
  this.width = this.domElement.offsetWidth;
  array.forEach(function (el) {
    if('object'===typeof el){
      return self.createButton(el.content, el.event);
    }
    self.createButton(el, self.defaultOnClickEvent);
  });

};

Table.prototype.createRow = function () {
  var self = this;
  this.lastRow = document.createElement('tr');
  this.lastRow.classList.add('row');
  this.domElement.appendChild(this.lastRow);
  this.createButton('^', function () {
    self.timer.exitFromRow();
  });
  return this.lastRow;
};
Table.prototype.createButton = function (content, event) {
  if(this.lastRow==null){
    this.createRow();
  }
  var button = document.createElement('td');
  button.onchoose=event;
  button.classList.add('button');
  button.value=button.innerHTML = content;
  this.lastRow.appendChild(button);
  if(this.width < this.lastRow.offsetWidth){
      this.lastRow.removeChild(button);
      this.createRow();
      this.lastRow.appendChild(button);
  }
};

module.exports = Table;
