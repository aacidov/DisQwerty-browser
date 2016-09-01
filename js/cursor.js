function Cursor(dom) {
  var show = true;
  setInterval(function () {
    dom.innerHTML=show?'|':'';
    show=!show;
  }, 500);
}

module.exports = Cursor;
