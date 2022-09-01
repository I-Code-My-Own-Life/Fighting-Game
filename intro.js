console.log("That this file is working.");
let canvas1 = document.getElementById("canvas1");
let img = document.getElementById('img');
let c = canvas1.getContext("2d");
let brightness = 0;
// canvas1.width = innerWidth;
// canvas1.height = innerHeight;
let background = new Image();
background.src = "background.png"
let text = document.getElementById("intro-text");
let fontSize = 0;
let colors  = ["lime","navy","purple","blue","brisk","coral","deeppink","red","yellowgreen","blue","white","chartreuse","aqua","crimson","gold","orange","lawngreen","brown","yellow"];
let btn = document.getElementById("btn");
function animate(){
    if(brightness < 150){
        brightness ++;
    }
    console.log(brightness)
    img.style.filter = `brightness(${brightness}%)`
    let color = Math.floor(Math.random() * colors.length)
    let color2 = Math.floor(Math.random() * colors.length)
    let currentColor = colors[color];
    let currentColor2 = colors[color2];
    // c.drawImage(background,0,0,canvas1.width,canvas1.height)
    if(fontSize < 80){
        text.style.fontSize = `${fontSize}px`;
        fontSize+= 0.8;
        text.style.background = `linear-gradient(90deg,${currentColor},${currentColor2})`;
        text.style.webkitTextFillColor = "transparent";
        text.style.webkitBackgroundClip = "text";
    }
    if(fontSize > 80){
        btn.style.visibility = "visible"
    }
    requestAnimationFrame(animate);
}
animate();
btn.addEventListener("click",()=>{
    location.href = "/game.html"
    console.log("The game has begun!")
})