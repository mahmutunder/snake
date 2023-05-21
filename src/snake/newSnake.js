const gameBoard=document.querySelector("#gameBoard");
const ctx= gameBoard.getContext("2d");
const scoreText =document.querySelector("#scoreText");
const rBtn=document.querySelector("#restarBtn");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const unitSize=25;
const boardBackground="white";
const food="red";
const snakeColor="lightgreen";
const snakeBorder="black";
let xVelocity=unitSize;
let yvelocity=0;

let foodX;
let foodY;
let snake=[

    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];
running=false;
score=0;

window.addEventListener("keydown", cd);
rBtn.addEventListener("click", rGame)


gameStart();


function gameStart(){
    running=true;
    scoreText.textContent=score;
    creatFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },75)
    }
    else{
        displayGameOver();
    }

};
function clearBoard(){
    // get color for background 
    ctx.fillStyle=boardBackground;
    // draw the reactangle wiith fillRect
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function creatFood(){
    function randomDood(min, max){
        const randomNum= Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randomNum;
    }
    foodX=randomDood(0,gameWidth-unitSize);
    foodY=randomDood(0,gameWidth-unitSize);
};
function drawFood(){
    ctx.fillStyle=food;
    ctx.fillRect(foodX,foodY,unitSize,unitSize)
};
function moveSnake(){
    const head={x:snake[0].x +xVelocity,
                y:snake[0].y +yvelocity};

                snake.unshift(head);
                if(snake[0].x==foodX && snake[0].y==foodY){
                    score+=1;
                    scoreText.textContent=score;
                    creatFood();
                }
                else{
                    snake.pop();
                }

};
function drawSnake(){
    ctx.fillStyle=snakeColor;
    ctx.strokeStyle=snakeBorder;
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);

    })

};
function cd(event){
    const keyPress=event.keyCode;
    const LEFT =37;
    const UP =38;
    const RIGHT =39;
    const DOWN =40;

    const goingup=(yvelocity==-unitSize);
    const goingdown=(yvelocity==unitSize);
    const goingleft=(xVelocity==-unitSize);
    const goingright=(xVelocity==unitSize);

    switch(true){
        case(keyPress==LEFT && !goingright):
        xVelocity=-unitSize;
        yvelocity=0;
        break;
        case(keyPress==RIGHT && !goingleft):
        xVelocity=unitSize;
        yvelocity=0;
        break;
        case(keyPress==UP && !goingdown):
        xVelocity=0;
       
        yvelocity=-unitSize;
        break;
        case(keyPress==DOWN && !goingup):
        xVelocity=0;
        yvelocity=unitSize;
        break;
    }
};
function checkGameOver(){
    switch(true){

        case(snake[0].x<0):
        running=false;
        break;
        case(snake[0].x>=gameWidth):
        running=false;
        break;
        case(snake[0].y<0):
        running=false;
        break;
        case(snake[0].y>=gameHeight):
        running=false;
        break;
    }
    for(let i=1; i<snake.length; i+=1){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){
            running=false;
        }
    }
};
function displayGameOver(){
    ctx.font="50px Ariel";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2)
   
};
function rGame(){
    score=0;
    xVelocity=unitSize;
    yvelocity=0;
    snake=[

        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();

};
