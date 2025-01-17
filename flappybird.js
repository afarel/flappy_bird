//board

let board;
let boardHeight = 640;
let boardWidth = 360;
let context;

//bird
let birdWidth = 34; 
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64; 
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; // it make the pipe going left
let velocityY = 0; //bird jump speed
let gravity = 0.4; 

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight
    board.width = boardWidth;
    context = board.getContext("2d"); // to draw on the board

    //draw flappy bird
    // context.fillStyle = "green";
    // context.fillRect(bird.x,bird.y,bird.width,bird.height)

    //load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png"
    
    bottomPipeImg = new Image()
    bottomPipeImg.src = "./bottompipe.png"
    
    
    requestAnimationFrame(update)
    setInterval(placePipes, 1500); // every 1.5 seconds
    document.addEventListener("keydown", jump)
    
}

function update(){
    requestAnimationFrame(update)
    context.clearRect(0,0, board.width, board.height);

    //bird
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); // to make sure the bird doesn't go off the screen

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    
    //pipes
    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

function placePipes(){

    let randomPipeY = pipeY - pipeHeight/4 - Math.random() * (pipeHeight/2);
    let openingSpace = board.height/4;

    let toppipe = {
        img : topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(toppipe)

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe)
}

function jump(e){
    if(e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX"){
        velocityY = -6; // Negative value makes the bird move upward
    }
}

function detectCollison(a, b){
    
}