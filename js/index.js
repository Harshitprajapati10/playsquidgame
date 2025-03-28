const start = document.getElementById("start")
const maincontroller = document.getElementById("maincontroller")
const music = new Audio("../media/audio/aud01.mp3")
const hinge = new Audio("../media/audio/hinge.mp3")
const gunShot = new Audio("../media/audio/shot.mp3")
music.loop = true;
let moving;
let playerminus;
let speed = 0.1
let frontFaceTiming = 2000

const playerArray = [
    "../media/players/player1.png",
    "../media/players/player2.png",
    "../media/players/player3.png",
    "../media/players/player4.png",
    "../media/players/player5.png",
    "../media/players/player6.png",
]

function rotateboxRandomly(){
    const randomdelay = [6000,5500][Math.floor(Math.random()*2)]
    setTimeout(() => {
        playerminus = true;
        // maincontroller.style.background = 'green'
        maincontroller.style.backgroundImage = "url(../media/top/front.png)"
        maincontroller.style.transform = 'rotateY(180deg)'
        music.pause()
        hinge.play()
        setTimeout(() => {
            maincontroller.style.transform = 'rotateY(360deg)'
            // maincontroller.style.background = 'black'
            playerminus = false;
            maincontroller.style.backgroundImage = "url(../media/top/back.png)"
            hinge.play()    
            music.play()
           
        }, frontFaceTiming);
    }, randomdelay);
}

function startRandomRotations(){
    rotateboxRandomly()
    setInterval(rotateboxRandomly, 5000);
}

function hidestarrtbutton(){
    playbuttonbox.innerHTML = `<div id="circle"><img src="../media/buttons/circle.png"/></div>
            <div id="cross"><img src="../media/buttons/cross.png"/></div>`
}


//startgame function to start the game
function startGame(){
    music.play()
    // setInterval(() => {
    //     console.log(maincontroller.style.backgroundColor)
    // }, 500);
    startRandomRotations()
    playerSetter()
    hidestarrtbutton()

    const startbutton = document.getElementById("circle")
    const pausebutton = document.getElementById("cross")
    startbutton.addEventListener('click',()=>{
        moving = true;
    })
    pausebutton.addEventListener('click',()=>{
        moving = false;
    })
    playerMover()

    let playerArray = Array.from(document.getElementsByClassName("tracks")); //id :track1-6
    let indexArray = [0,1,2,3,4,5]
    // console.log(playerArray)
    setInterval(() => {
        if(playerminus && moving){
            if(indexArray.length > 0){
                const randomindex = Math.floor(Math.random() * indexArray.length)
                // console.log(randomindex)
                playerArray[indexArray.splice(randomindex,1)].style.opacity = "0"
                gunShot.play()

            }
            // console.log("minus one")
            
        }else if(indexArray.length == 0){
            GameOver("game over by elimination")
            //TODO
            // showpopup("Game Over")
        }
    }, 1000);
}

start.addEventListener('click',()=>{startGame()})




function playerSetter(){
    const tracks = Array.from(document.getElementsByClassName("tracks"))
    const height = "20%"
    const width = "90%"
    // const bg = "#fff"
    const position = "absolute"
    const bottomarray = ['0px','2px','3px','5px','6px']

    let playerindices = [0,1,2,3,4,5]
    tracks.forEach((e) => {
        let randomIndex = Math.floor(Math.random()*playerindices.length)
        let selectedIndex = playerindices[randomIndex] //0-6 random values
        playerindices.splice(randomIndex,1)
        let backGroundImage = playerArray[selectedIndex]
        // console.log(backGroundImage)
        // console.log(selectedIndex)
        e.innerHTML = `<div class="player" style="height: ${height};width: ${width};position:${position};bottom:${bottomarray[Math.floor(Math.random()*bottomarray.length)]}">
        <img class="playerImage" src="${backGroundImage}"/>
        </div>`
    })

    
}

function playerMover(){
    //move the players
    const tracks = Array.from(document.getElementsByClassName("tracks"))
    const maxBottom = finishline.getBoundingClientRect().bottom
    const range = startline.getBoundingClientRect().top
    // console.log(range)
    // console.log(maxBottom)
    tracks.forEach((e)=>{
        let currentbottom = e.firstElementChild.getBoundingClientRect().bottom
        // console.log(currentbottom)
        intervalid = setInterval(() => {    
            if((range-maxBottom )>= (currentbottom-range) && moving){
                currentbottom += speed
                e.firstElementChild.style.bottom = `${currentbottom-range}px`
                // console.log(currentbottom)
            }else if((range-maxBottom )<(currentbottom-range)){
                GameOver("game over12") //restart window
            }
        }, 10);
        
    })
}


function GameOver(e){
    bottom.innerHTML = `<div id="gameover">
                <div class="info">Game Over</div>
                <div id="message">Reload to Replay</div>
            </div>`
}