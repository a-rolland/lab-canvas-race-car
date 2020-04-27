const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d')
ctx.font = "30px Arial";

let points = 0;
let cY = 0;

const coche = {
  img: null,
  x: canvas.width/2-40,
  y: canvas.height-170  ,
  width: 0,
  height: 0,
  inicializar: function() {
    this.img = new Image()
    this.img.src = "images/car.png"
    this.width = 80;
    this.height = (319/158) * this.width;
  },
  mostrar: function() {
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
  }
}

const road = {
  img: null,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  inicializar: function() {
    this.img = new Image()
    this.img.src = "images/road.png"
    this.width = canvas.width;
    this.height = canvas.height;
  },
  mostrar: function() {
    // ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.img, 0, cY, this.width, this.height);
    ctx.drawImage(this.img, 0, cY-(this.height), this. width, this.height+33);
    cY += 5;
    if (cY >= canvas.height) {
      cY = 0;
    }
  }
}

const obstacles = {
  x: 80,
  y: 0,
  length: 200,
  height: 20,
  mostrar: function() {
    ctx.fillRect(obstacles.x,obstacles.y,obstacles.length,obstacles.height)
  },
  update() {
    if (!gameOver()) {
      obstacles.y += 10;
    }
  }
}

const obstaclesArr = [
  [80,0,200,20],[160,0,260,20],[100,0,160,20],[300,0,120,20],[140,0,280,20],[240,0,180,20],[160,0,260,20],[230,0,190,20]
]

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
}

function startGame() {
  road.inicializar()
  road.mostrar()
  coche.inicializar()
  coche.mostrar()
  setInterval(obstacles.update,60)
  setInterval(updateGame,100)
}

function updateGame() {
  ctx.fillRect(0,0,canvas.width,canvas.height)
  if (!gameOver()) {
    road.mostrar();
    coche.mostrar();
    obstacles.mostrar();
    if (obstacles.y === canvas.height) {
      let newObstacle = obstaclesArr[Math.floor(Math.random() * 8)]
      obstacles.x = newObstacle[0];
      obstacles.y = newObstacle[1];
      obstacles.length = newObstacle[2];
      obstacles.height = newObstacle[3];
      points++
    }
    ctx.save()
    ctx.fillStyle = "white"
    ctx.fillText(`Score : ${points}`, 80, 40);
    ctx.restore()
  } else {
    ctx.font = "60 Arial";
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.strokeText(`Game Over ! Your score : ${points}`,canvas.width/2, canvas.height/2);
  }
}

document.addEventListener('keydown', event => {
  arrow = event.code 
  if (arrow === "ArrowRight" && coche.x <= canvas.width -160) {
    coche.x += 10
  }
  if (arrow === "ArrowLeft" && coche.x >= 80) {
    coche.x -= 10
  }
  updateGame()
});

function gameOver() {
  if ((coche.y === obstacles.y+20) && (coche.x > obstacles.x && coche.x < (obstacles.x + obstacles.length))) {
    return true
  }
}