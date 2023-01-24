class Game {
    constructor(){
        this.canvas = document.createElement("canvas");
        this.canvas.width = 400;
        this.canvas.height =400;
        this.canvas.style.border = "4px solid thistle";
        this.canvas.style.backgroundColor="white";
        this.canvas.style.borderRadius = "6px";
        this.ctx = this.canvas.getContext("2d");

        // config 
        this.controlKey;
        this.grid = 20;
        this.snake = [];
        this.score = 0;
        this.head = {
            x: 9 * this.grid,
            y: 9 * this.grid
        }
        this.apple = {
            x: Math.floor(Math.random() * 19 + 0) * this.grid,
            y: Math.floor(Math.random() * 19 + 0) * this.grid,
        }
        this.snake.push(this.head);
     
    }

    control(event){
        let key = event.key;
        if(key == "w" && this.controlKey != "DOWN"){
            this.controlKey = "UP"
        }
        if(key == "s" && this.controlKey != "UP"){
            this.controlKey = "DOWN"
        }
        if(key == "a" && this.controlKey != "RIGHT"){
            this.controlKey = "LEFT";
        }
        if(key == "d" && this.controlKey != "LEFT"){
            this.controlKey = "RIGHT";
        }
    }

    init(){
        document.querySelector("#app").appendChild(this.canvas);
        window.addEventListener("keydown", this.control.bind(this));
        setInterval(this.animate.bind(this), 40);
    }

    update(){
        if(this.controlKey == "LEFT") this.head.x += -this.grid;
        if(this.controlKey == "RIGHT") this.head.x += this.grid;
        if(this.controlKey == "UP") this.head.y += -this.grid;
        if(this.controlKey == "DOWN") this.head.y += this.grid;

    }


    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(){

      this.snake.forEach((item, index) => {
        this.ctx.fillStyle =  index == 0 ? "red" : "white";
        this.ctx.fillRect(item.x, item.y, this.grid, this.grid);
        this.ctx.strokeStyle = "cyan";
        this.ctx.strokeRect(item.x, item.y, this.grid, this.grid);
      });


    //   Aktual olaraq hemise ilanin head bolmesini saxlamaliyiq 

      this.head.x = this.snake[0].x;
      this.head.y = this.snake[0].y;


    }


    animate(){
        this.clear();
        this.update();
        this.draw();
    }

   
}

const newGame = new Game().init();