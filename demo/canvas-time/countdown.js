var window_width = 1024;  //画布的宽度
var window_heigt = 400;   //画布的高度
var radius = 6;           //圆点的半径
var margin_top = 60;      //每个数字距离画布的上边距
var margin_left = 30;    //第一个数字距离画布的左边距
var curShowTimeSeconds = 0;

var balls = [];
var colors = ['#3fc','#09c','#a6c','#93c','#9c0','#690','#fb3','#f80','#f44','#c00'];

window.onload = function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  canvas.width = window_width;
  canvas.height = window_heigt;

  curShowTimeSeconds = getCurShowTimeSeconds();

  setInterval(function() {
    render(context);
    update();
  },50);
}

function getCurShowTimeSeconds() {
  var curTime = new Date();
  ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();

  return ret;
}

function update() {
  var nextShowTimeSeconds = getCurShowTimeSeconds();

  var nextHours = parseInt(nextShowTimeSeconds / 3600);
  var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
  var nextSecondes = nextShowTimeSeconds % 60;

  var curHours = parseInt(curShowTimeSeconds / 3600);
  var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
  var curSecondes = curShowTimeSeconds % 60;

  if (nextSecondes !== curSecondes) {

    if (parseInt(curHours / 10) !== parseInt(nextHours / 10)) {
      addBalls(margin_left + 0, margin_top, parseInt(curHours / 10));
    }
    if (parseInt(curHours % 10) !== parseInt(nextHours % 10)) {
      addBalls(margin_left + 15 * (radius + 1), margin_top, parseInt(curHours % 10));
    }

    if (parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) {
      addBalls(margin_left + 39, margin_top, parseInt(curMinutes / 10));
    }
    if (parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) {
      addBalls(margin_left + 54 * (radius + 1), margin_top, parseInt(curMinutes % 10));
    }

    if (parseInt(curSecondes / 10) !== parseInt(nextSecondes / 10)) {
      addBalls(margin_left + 78, margin_top, parseInt(curSecondes / 10));
    }
    if (parseInt(curSecondes % 10) !== parseInt(nextSecondes % 10)) {
      addBalls(margin_left + 93 * (radius + 1), margin_top, parseInt(curSecondes % 10));
    }

    curShowTimeSeconds = nextShowTimeSeconds;
  }
  updateBalls();
}

function updateBalls() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= window_heigt -radius) {
      balls[i].y = window_heigt - radius;
      balls[i].vy = - balls[i].vy * 0.75;
    }
  };

  var cnt = 0;
  for (var i = 0; i < balls.length; i++) {  //
    if(balls[i].x + radius > 0 && balls[i].x - radius < window_width) {
      balls[cnt++] = balls[i];
    }
  };

  while (balls.length > Math.min(300,cnt)) {
    balls.pop();
  }
}

function addBalls(x, y, num) {
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        var aBall = {
          x : x + j * 2 * (radius + 1) + (radius + 1),
          y : y + i * 2 * (radius + 1) + (radius + 1),
          g : 1.5 + Math.random(),
          vx : Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy : -5,
          color : colors[Math.floor(Math.random() * colors.length)]
        };
        balls.push(aBall);
      }
    };
  };
}

function render(cxt) {
  cxt.clearRect(0,0,window_width,window_heigt);

  var hours = parseInt(curShowTimeSeconds / 3600);
  var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
  var secondes = curShowTimeSeconds % 60;

  renderDigit(margin_left, margin_top, parseInt(hours / 10), cxt);
  renderDigit(margin_left + 15 * (radius + 1), margin_top, parseInt(hours % 10), cxt);
  renderDigit(margin_left + 30 * (radius + 1), margin_top, 10, cxt);
  renderDigit(margin_left + 39 * (radius + 1), margin_top, parseInt(minutes / 10), cxt);
  renderDigit(margin_left + 54 * (radius + 1), margin_top, parseInt(minutes % 10), cxt);
  renderDigit(margin_left + 69 * (radius + 1), margin_top, 10, cxt);
  renderDigit(margin_left + 78 * (radius + 1), margin_top, parseInt(secondes / 10), cxt);
  renderDigit(margin_left + 93 * (radius + 1), margin_top, parseInt(secondes % 10), cxt);

  for (var i = 0; i < balls.length; i++) {
    cxt.fillStyle = balls[i].color;
    
    cxt.beginPath();
    cxt.arc(balls[i].x, balls[i].y, radius, 0, 2 * Math.PI, true);
    cxt.closePath();

    cxt.fill();
  };
}

function renderDigit(x, y, num, cxt) {
  cxt.fillStyle = 'rgb(0,102,153)';
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        cxt.beginPath();
        cxt.arc(x + j * 2 * (radius + 1) + (radius + 1),y + i * 2 * (radius + 1) + (radius + 1),radius,0,2 * Math.PI);
        cxt.closePath();
        cxt.fill();
      }
    };
  };
}