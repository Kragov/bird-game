let cvs = document.getElementById("canvas")
let ctx = cvs.getContext("2d")

let bird = new Image()
let bg = new Image()
let fg = new Image()
let pipeUp = new Image()
let pipeDown = new Image()

bird.src = "img/bird.png"
bg.src = "img/bg.png"
fg.src = "img/fg.png"
pipeUp.src = "img/pipeUp.png"
pipeDown.src = "img/pipeDown.png"

let gap = 90

let pipe = []

pipe[0] = {
    x : cvs.width,
    y : 0
}

document.addEventListener("keydown", moveUp)

function moveUp () {
    yPos -= 30
}

let xPos = 10
let yPos = 150
let grav = 1.5
let score = 0

function draw() {
    ctx.drawImage(bg, 0, 0)

    for (let i = 0; i < pipe.length; i++) {

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap)

        pipe[i].x--
        if (pipe[i].x === 100) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }
        
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height) {
                    location.reload()
                }
        
        if (pipe[i].x === 5) {
            score++
        }
    }

    

    ctx.drawImage(fg, 0, cvs.height - fg.height)

    ctx.drawImage(bird, xPos, yPos)

    ctx.fillStyle = "#000"
    ctx.font = "24px Verdana"
    ctx.fillText("Score : " + score, 10, cvs.height - 20)

    yPos += grav
    requestAnimationFrame(draw)
}

pipeDown.onload = (draw)
