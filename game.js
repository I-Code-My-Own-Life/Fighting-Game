let canvas1 = document.getElementById("canvas1");
let time = document.getElementById('time');
let playerhealthdiv = document.getElementById('red');
let enemyhealthdiv = document.getElementById("red2");
let finalText = document.getElementById("final-text");
// enemyhealthdiv.style.width = `${20}px`;
let t = 0;
let maxWidth = 450;
let width = 450;
let maxWidth2 = 0;
let width2 = 0;
let increment3 = 450;
let increment4 = 450;
let increment = 20;
let increment2 = 20;
let hurtenemy = false;
canvas1.width = innerWidth - 5;
canvas1.height = innerHeight - 5;
let c = canvas1.getContext("2d");
let groundLevel = innerHeight / 2 +  240;
let frameX = 0;
let frameY = 0;
let frameX2 = 0;
let frameY2 = 0; 
let framesforplayer = 3;
let framesforenemy = 3;
let gameFrame = 0;
let staggerFrames = 5;
let gravity = 3;
let maxTime = 60;
let keys = {
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    f:{
        pressed:false
    },
    e:{
        pressed:false
    },
    r:{
        pressed:false
    },
    q:{
        pressed:false
    },
    // Keys for our enemy : 
    arrowLeft:{
        pressed:false
    },
    arrowRight:{
        pressed:false
    },
    arrowDown:{
        pressed:false
    },
    p:{
        pressed:false
    }
}
// Our Background Image : 
let background = new Image();
background.src = "Battleground3.png";
// Images we need to show besides our health bar for player and the enemy :
let img1 = new Image();
img1.src = "img1.png";
let img2 = new Image();
img2.src = "img2.png";
let playeridle = new Image();
playeridle.src = "idle1.png";
let playerpush = new Image();
playerpush.src = "push.png";
let playerheaviestpunch = new Image();
playerheaviestpunch.src = "heaviestpunch.png";
let playerwalking = new Image();
playerwalking.src = "walking.png";
let readyidle = new Image();
readyidle.src = "readyidle.png";
let playerheavypunch = new Image();
playerheavypunch.src = "punch.png";
let playerkick = new Image();
playerkick.src = "kick.png";
let playerhurt = new Image();
playerhurt.src = "hurt.png";
let playerjump = new Image();
playerjump.src = "jump.png"
const playeridlewidth = 265;
const playeridleheight = 162;
const enemyidlewidth = 268;
const enemyidleheight = 180;
// Our Enemy Images Start here : 
let enemyhurt = new Image();
enemyhurt.src = "hurt2.png";
let enemyidle = new Image();
enemyidle.src = "idle2.png";
let enemywalking = new Image();
enemywalking.src = "walking2.png";
let enemyready = new Image();
enemyready.src = "readyidle2.png";
let enemykick = new Image();
enemykick.src = "kick2.png";
let enemypunch = new Image();
enemypunch.src = "punch2.png";
let enemyjump = new Image();
enemyjump.src = "jump2.png";
class Player{
    constructor(img,x,y,dx,dy,posx,posy,width,height){
        this.img = img;
        this.x = x;
        this.y = y; 
        this.dx = dx;
        this.dy = dy;
        this.posx = posx;
        this.posy = posy;
        this.width = width;
        this.height = height;
    }
    move(){
        c.drawImage(this.img,frameX * playeridlewidth,frameY * playeridleheight,playeridlewidth,playeridleheight,this.posx,this.posy,this.width,this.height);
        // console.log(this.posx)
        this.posx += this.dx;
        this.posy += this.dy;
        if(this.posy + this.height + this.dy >= groundLevel){
            this.dy = 0;
        }
        else{
            this.dy += gravity;
        }
        // Stopping ryu before reaching the end of the screen : 
        if(this.posx + this.width >= canvas1.width + 180){
            this.dx = 0;
            this.img = playeridle;
            keys.d.pressed = false;
        }
        else if(this.posx  <= -80){
            this.dx = 0;
            this.img = playeridle
            keys.a.pressed = false;
        }
    }
}
class Enemy{
    constructor(img,x,y,dx,dy,posx,posy,width,height){
        this.img = img;
        this.x = x;
        this.y = y; 
        this.dx = dx;
        this.dy = dy;
        this.posx = posx;
        this.posy = posy;
        this.width = width;
        this.height = height;
    }
    move(){
        c.drawImage(this.img,frameX2 * enemyidlewidth,frameY2 * enemyidleheight,enemyidlewidth,enemyidleheight,this.posx,this.posy,this.width,this.height);
        this.posx += this.dx;
        this.posy += this.dy;
        if(this.posy + this.height + this.dy >= groundLevel + 10){
            this.dy = 0;
        }
        else{
            this.dy += gravity;
        }
        // Stopping lee before reaching the end of the screen : 
        if(this.posx + this.width >= canvas1.width + 90){
            this.dx = 0;
            this.img = enemyidle;
            keys.arrowRight.pressed = false;
        }
        if(this.posx  <= -80){
            this.pox += 7
            this.dx = 0;
            this.img = enemyidle;
            keys.arrowLeft.pressed = false;
        }
    }
}
let ryu = new Player(playeridle,0,0,0,10,0,0,400,300);
let lee = new Enemy(enemyidle,0,0,0,10,canvas1.width - 400,0,400,300);
let boxp = {
    x:undefined,
    y:undefined,
    width:undefined,
    height:undefined
}
let box2p = {
    x:undefined,
    y:undefined,
    width:undefined,
    height:undefined
}
let boxk = {
    x:undefined,
    y:undefined,
    width:undefined,
    height:undefined
}
let box2k = {
    x:undefined,
    y:undefined,
    width:undefined,
    height:undefined
}
function animate(){
    enemyhealthdiv.style.width = `${width}px`;
    playerhealthdiv.style.width = `${width2}px`;
    // This here means that the enemy's health is decreasing and the player has won the game.
    if(width == 10){
        console.log("The player has won!")
    }
    else if(width2 == 450){
        console.log("The enemy has won!")
    }
    boxp = {
        x:ryu.posx + 150,
        y:ryu.posy + 100,
        width:100,
        height:100
    }
    box2p = {
        x:lee.posx + 150,
        y:lee.posy + 100,
        width:100,
        height:100
    }
    boxk = {
        x:ryu.posx + 150,
        y:ryu.posy + 100,
        width:180,
        height:100
    }
    box2k = {
        x:lee.posx + 60,
        y:lee.posy + 100,
        width:180,
        height:100
    }
    c.drawImage(background,0,0,canvas1.width,canvas1.height);
    c.drawImage(img1,-40,0,200,120)
    c.drawImage(img2,canvas1.width - 120,0,200,120);
    if(gameFrame % staggerFrames == 0){
        if(frameX < framesforplayer){
            frameX++;
        }   
        else{
            frameX = 0;
        }
    }
    if(gameFrame % staggerFrames == 0){
        if(frameX2 < framesforenemy){
            frameX2++;
        }   
        else{
            frameX2 = 0;
        }
    }
    ryu.move();
    lee.move();
    if(keys.d.pressed){
        ryu.img = playerwalking;
        ryu.posx += 7;
    }
    if(keys.a.pressed){
        ryu.img = readyidle;
        ryu.dx = -7;
    }
    else{
        ryu.dx = 0;
    }
    if(keys.f.pressed){
        ryu.img = playerheavypunch;
        c.fillStyle = "rgba(0,0,0,0.01)"
        c.fillRect(boxp.x,boxp.y,boxp.width,100)
    }
    if(keys.e.pressed){
       ryu.img = playerkick;
       staggerFrames = 6;
       c.fillStyle = "rgba(0,0,0,0.01)"
       c.fillRect(boxk.x,boxk.y,boxk.width,100)
    }
    if(keys.r.pressed){
        ryu.img = playerpush;
        framesforplayer = 6;
     }
    if(keys.q.pressed){
        ryu.img = playerheaviestpunch;
        framesforplayer = 4;
    }    
    //  Our Enemy keys are starting from here : 
    if(keys.arrowLeft.pressed){
        lee.posx -= 7;
        lee.img = enemywalking;
    }
    if(keys.arrowRight.pressed){
       lee.posx += 7;
       lee.img = enemyready;
    }
    if(keys.arrowDown.pressed){
       staggerFrames = 4;  
       lee.img = enemykick;
       c.fillStyle = "rgba(0,0,0,0.01)";
       c.fillRect(box2k.x,box2k.y,box2k.width,100);
    }
    if(keys.p.pressed){ 
        lee.img = enemypunch;
        c.fillStyle = "rgba(0,0,0,0.01)"
        c.fillRect(box2p.x,box2p.y,box2p.width,100)
    }
    gameFrame ++;
    // All of our Collision Detection Code : 
    
    // Our Collision Detection Code for player's punch attack boxp to enemy:
    if(boxp.x - boxp.width - 30 >= lee.posx && boxp.x + 120 <= lee.posx + lee.width && boxp.y >= lee.posy && boxp.y <= lee.posy + lee.height && keys.f.pressed){
        lee.img = enemyhurt
        framesforenemy = 0;
        width -= 20;
        setTimeout(()=>{
            lee.img = enemyidle
            framesforenemy = 3;
        },400)
        lee.posx += 80
    }
    // Our Collsion Detection code for enemy's punch attack box2p to player :
    if(box2p.x - box2p.width - 50 <= ryu.posx && ryu.posx < box2p.x - 50 &&  box2p.y >= ryu.posy && box2p.y <= ryu.posy + ryu.height && keys.p.pressed){
        ryu.img = playerhurt
        framesforplayer = 0;
        width2 += 20;
        setTimeout(()=>{
            ryu.img = playeridle
            framesforplayer = 3;
        },400)
        ryu.posx -= 80
    }
    // Our Collision Detection Code for player's kick attack boxk to enemy:
    if(boxk.x - boxk.width + 80 >= lee.posx && boxk.x + 200 <= lee.posx + lee.width && keys.e.pressed &&  boxk.y >= lee.posy && boxk.y <= lee.posy + lee.height){
        width -= 20;
        lee.img = enemyhurt
        framesforenemy = 0;
        setTimeout(()=>{
            lee.img = enemyidle
            framesforenemy = 3;
        },400)
        lee.posx += 180;
    }
    // Our Collision Detection Code for enemy's kick attack box2k to player:
    if(box2k.x - box2k.width + 80 <= ryu.posx && box2k.x >= ryu.posx - 50 && keys.arrowDown.pressed && box2k.y >= ryu.posy && box2k.y <= ryu.posy + ryu.height){
        ryu.img = playerhurt
        width2 += 20;
        framesforplayer = 0;
        setTimeout(()=>{
            ryu.img = playeridle
            framesforplayer = 3;
        },400)
        ryu.posx -= 180;
    }
    requestAnimationFrame(animate);
}
animate();
addEventListener("keydown",(e)=>{
    if(ryu.posy > 200){
        switch(e.key) {
            case "w":
                ryu.dy = -40;
                framesforplayer = 1;
                staggerFrames = 12
                ryu.img = playerjump;
                setTimeout(()=>{
                    framesforplayer = 3;
                    staggerFrames = 5
                    ryu.img = playeridle
                },800)   
                break;
            }
    }
    if(lee.posy > 200){
        switch(e.key) {
            case "ArrowUp":
                lee.dy = -40;
                framesforenemy = 1;
                staggerFrames = 12
                lee.img = enemyjump;
                setTimeout(()=>{
                    framesforenemy = 3;
                    staggerFrames = 5
                    lee.img = enemyidle
                },800)   
                break;
            }
        }
        switch (e.key) {
            case "d":
                keys.d.pressed = true;
            break;
        case "a":
                keys.a.pressed = true;
            break;
         case "f":
                keys.f.pressed = true;
                setTimeout(() => {
                    keys.f.pressed = false;
                }, 1000);
            break;
        case "e":
                keys.e.pressed = true;
                setTimeout(() => {
                    keys.f.pressed = false;
                }, 1000);
            break;
        case "r":
                keys.r.pressed = true;
            break;
        case "q":
                staggerFrames = 10;
                keys.q.pressed = true;
            break;
        // Our Enemy Cases start from here : 
        case "ArrowLeft":
            keys.arrowLeft.pressed = true;
            break;
            case "ArrowRight":
                keys.arrowRight.pressed = true;
                break;
        case "ArrowDown":
                keys.arrowDown.pressed = true;
                framesforenemy = 6;
                staggerFrames = 5;  
            break;
        case "p":
            keys.p.pressed = true;
            setTimeout(() => {
                keys.p.pressed = false;
            }, 1000);
            break;
        }
})
addEventListener("keyup",(e)=>{
    switch (e.key) {
        case "d":
                keys.d.pressed = false;
                ryu.img = playeridle;
            break;
        case "a":
                keys.a.pressed = false;
                ryu.img = playeridle;
            break;
        case "f":
            setTimeout(() => {
                keys.f.pressed = false;
                ryu.img = playeridle;
            }, 1000 / 10);
            break;
        case "e":
            setTimeout(() => {
                keys.e.pressed = false;
                ryu.img = playeridle;
                staggerFrames = 3;
            }, 1000 / 10);
            break;
        case "r":
            setTimeout(() => {
                keys.r.pressed = false;
                ryu.img = playeridle;
                framesforplayer = 3; 
            }, 900);
            break;
        case "q":
                keys.q.pressed = false;
                ryu.img = playeridle
                staggerFrames = 5;
                framesforplayer = 3;
            break;
        case "ArrowLeft":
                keys.arrowLeft.pressed = false;
                lee.img = enemyidle;
            break;
        case "ArrowRight":
                keys.arrowRight.pressed = false;
                lee.img = enemyidle;
            break;
        case "ArrowDown":
                keys.arrowDown.pressed = false;
                lee.img = enemyidle;
                framesforenemy = 3
            break;
        case "p":
            setTimeout(()=>{
                keys.p.pressed = false;
                lee.img = enemyidle;
            },1000 / 1000)
            break;
    }
})
// Making our canvas a little bit responsive : 
window.addEventListener("resize",()=>{
    canvas1.width = innerWidth;
    canvas1.height = innerHeight;
    lee.posx = canvas1.width - 400;
})
let enemysubhealth;
let playersubhealth;
let timeToReload =  2000
// Here is our timer : 
setInterval(()=>{
    // Health substracted from the enemy : 
    enemysubhealth = maxWidth - width;
    // The amount of health substracted from the player : 
    playersubhealth = width2 - maxWidth2;
    t++;
    time.innerText = t;
if(t >= 10){
    time.style.paddingLeft = "1%"
}
if(t >= maxTime && enemysubhealth == playersubhealth){
    finalText.innerText = "Tie"
    setTimeout(()=>{
        location.reload();
    },timeToReload)
}
if(t >= maxTime && enemysubhealth == playersubhealth){
    finalText.innerText = "Tie";
    setTimeout(()=>{
        location.reload();
    },timeToReload)
}
if(t >= maxTime && enemysubhealth > playersubhealth){
    finalText.innerText = "Ryu Won";
    setTimeout(()=>{
        location.reload();
    },timeToReload);
}
if(t >= maxTime && enemysubhealth < playersubhealth){
    finalText.innerText = "Lee Won";
    setTimeout(()=>{
        location.reload();
    },timeToReload);
}
// if(t >= 100){
//     time.style.paddingLeft = "0"
// }
},1000)