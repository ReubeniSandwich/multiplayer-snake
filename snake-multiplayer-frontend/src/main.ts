import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

const board_size = 600

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
<!--    <a href="https://vitejs.dev" target="_blank">-->
<!--      <img src="${viteLogo}" class="logo" alt="Vite logo" />-->
<!--    </a>-->
<!--    <a href="https://www.typescriptlang.org/" target="_blank">-->
<!--      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />-->
<!--    </a>-->
<!--    <h1>Vite + TypeScript</h1>-->
<!--    <div class="card">-->
<!--      <button id="counter" type="button"></button>-->
<!--    </div>-->
    <canvas id="canvas-board" width="${board_size}" height="${board_size}"></canvas>
    <canvas id="canvas-grid-background" width="${board_size}" height="${board_size}"></canvas>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const canvas = document.querySelector<HTMLCanvasElement>('#canvas-board')
const canvasGrid = document.querySelector<HTMLCanvasElement>('#canvas-grid-background')

if (canvas == null || canvasGrid == null) {
    throw new Error('Can\'t find canvas board')
}

const ctx = canvas.getContext("2d")
const ctxGrid = canvasGrid.getContext("2d")

if (ctx == null || ctxGrid == null) {
    throw new Error('Cannot find canvas board')
}

// todo how to make balance grid every time?
// how to make snake fit in grid...

const grid_line_size = 2
const grid_size = 40
for (let i = 0; i < board_size; i += grid_size) {
    ctxGrid.fillStyle = "rgb(200 0 0)";
    ctxGrid.fillRect(i, 0, grid_line_size, board_size)
    ctxGrid.fillRect(0, i, board_size, grid_line_size)
}

const snakey: Snake = {name: "reuben", body: []}
const snakey2: Snake = {name: "reuben", body: []}

const body: BodyPart = {x: 40, y: 40}
const body2: BodyPart = {x: 80, y: 40}
const body3: BodyPart = {x: 120, y: 40}
const body4: BodyPart = {x: 160, y: 40}
snakey.body.push(body)
snakey.body.push(body2)
snakey.body.push(body3)
snakey.body.push(body4)

const abody: BodyPart = {x: 40, y: 120}
const bbody2: BodyPart = {x: 80, y: 120}
const cbody3: BodyPart = {x: 120, y: 120}
const dbody4: BodyPart = {x: 160, y: 120}
snakey2.body.push(abody)
snakey2.body.push(bbody2)
snakey2.body.push(cbody3)
snakey2.body.push(dbody4)


let snakeList: Snake[] = [];
snakeList.push(snakey)
snakeList.push(snakey2)


enum Direction {
    LEFT, RIGHT, DOWN, UP
}

//sorta works lol... doesn't delete the current snake block
// TODO block bad directions
var direction: Direction = Direction.RIGHT
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            direction = Direction.LEFT
            break;
        case "ArrowRight":
            direction = Direction.RIGHT
            break;
        case "ArrowUp":
            direction = Direction.UP
            break;
        case "ArrowDown":
            direction = Direction.DOWN
            break;
    }
})

// drawSnake(ctx, snakey)

// moveSnake(ctx, 40, 40)

// function moveSnake(ctx: CanvasRenderingContext2D, x: number, y: number) {
//     ctx.fillStyle = "rgb(0 0 200 / 50%)";
//     ctx.fillRect(x, y, 40, 40);
// }

function drawSnake(ctx: CanvasRenderingContext2D, snakeList: Snake[]): any {
    for(const snake of snakeList) {
        for (let i = 0; i < snake.body.length; i += 1) {
            const bodyPart: BodyPart = snake.body[i];
            ctx.fillStyle = "rgb(100 0 200 / 50%)";
            ctx.fillRect(bodyPart.x, bodyPart.y, 40, 40);
        }
    }
}

//todo bug where going left when its going right will make bad behaviro.
// disable left when alreeady going right and vice versa. same for up down.

function moveSnakeBody(snakeList: Snake[], direction: Direction): any {

    let bodyX = 0
    let bodyY = 0
    switch (direction) {
        case Direction.LEFT:
            bodyX = -40
            bodyY = 0
            break;
        case Direction.RIGHT:
            bodyX = 40
            bodyY = 0
            break;
        case Direction.UP:
            bodyX = 0
            bodyY = -40
            break;
        case Direction.DOWN:
            bodyX = 0
            bodyY = 40
    }


    for(const snake of snakeList) {
        let snakeHead: BodyPart = snake.body[0]
        let prevBodyPosition: BodyPart = snake.body[0]
        snakeHead.x += bodyX
        snakeHead.y += bodyY
        // this is bad very bad lol
        // why snake length looks like 3 despite body of 4?
        for (let i = 0; i < snake.body.length; i += 1) {

            const temp = structuredClone(snake.body[i])
            const bodyPart: BodyPart = snake.body[i];
            bodyPart.x = prevBodyPosition.x
            bodyPart.y = prevBodyPosition.y

            prevBodyPosition = temp
        }
    }
}



// sleep time expects milliseconds
function sleep (time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

while (true) {
    console.log("testing");
    ctx.clearRect(0, 0, board_size, board_size);
    moveSnakeBody(snakeList, direction)
    drawSnake(ctx, snakeList)
    await sleep(100)
}








