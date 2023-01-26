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
        this.interval;
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
        this.interval = setInterval(this.animate.bind(this), 40);
    }

    isCrush(x, y){
        let overSnake = false;

        this.snake.forEach(item => {
            overSnake = (item.x == x && item.y == y)
        })

        return overSnake;
    }

    update(){

        if(this.head.x < 0){
            this.head.x = this.canvas.width;
        }
        else if(this.head.x > this.canvas.width){
            this.head.x = 0;
        }
        if(this.head.y < 0){
            this.head.y = this.canvas.height;
        }
        else if (this.head.y > this.canvas.height){
            this.head.y = 0;
        }


        if(this.controlKey == "LEFT") this.head.x += -this.grid;
        if(this.controlKey == "RIGHT") this.head.x += this.grid;
        if(this.controlKey == "UP") this.head.y += -this.grid;
        if(this.controlKey == "DOWN") this.head.y += this.grid;


        if(this.apple.x == this.head.x && this.apple.y == this.head.y){
            this.score += 1;


            this.apple.x = Math.floor(Math.random() * 19 + 0) * this.grid;
            this.apple.y = Math.floor(Math.random() * 19 + 0) * this.grid;

            while(this.isCrush(this.apple.x, this.apple.y)){
                this.apple.x = Math.floor(Math.random() * 19 + 0) * this.grid;
                this.apple.y = Math.floor(Math.random() * 19 + 0) * this.grid;
            }

        }
        else{
            this.snake.pop();
        }


        let newHead = {
            x: this.head.x,
            y: this.head.y
        };

        this.snake.unshift(newHead)


    }


    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(){


    //  draw apple 
     this.ctx.save();
     this.ctx.fillStyle = "green";
     this.ctx.fillText(`Score: ${this.score}`, 10, 20, this.canvas.width);
     this.ctx.textBaseline ="hanging";
     this.ctx.textAlign = "center";
     this.ctx.restore();

     this.ctx.fillStyle = "yellow";
     this.ctx.fillRect(this.apple.x, this.apple.y, this.grid, this.grid)



      this.snake.forEach((item, index) => {
        this.ctx.fillStyle =  index == 0 ? "red" : "white";
        this.ctx.fillRect(item.x, item.y, this.grid, this.grid);
        this.ctx.strokeStyle = "cyan";
        this.ctx.strokeRect(item.x, item.y, this.grid, this.grid);

        if(index > 0 && item.x == this.head.x && item.y == this.head.y){
            clearInterval(this.interval);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
            this.ctx.textBaseline = "middle";
            this.ctx.font = "20px Arial"
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = "red";
            this.ctx.fillText(`Game over`, this.canvas.width / 2, this.canvas.height / 2);
        }

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