import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import {Direction, Snake, ColorRgba, BodyPart} from "./Snake.ts";
import {Fruit} from "./Fruit.ts";
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

const snakey: Snake = {name: "reuben", id: 1, facingDirection: Direction.RIGHT, body: []}
const snakey2: Snake = {name: "bob", id: 2, facingDirection: Direction.RIGHT, body: []}

let color1: ColorRgba = {red: 100, green: 0, blue: 100, opacity: 90}
let color2: ColorRgba = {red: 300, green: 0, blue: 200, opacity: 90}

const body6: BodyPart = {x: 40, y: 40, color: color1}
const body5: BodyPart = {x: 80, y: 40, color: color1}
const body4: BodyPart = {x: 120, y: 40, color: color1}
const body3: BodyPart = {x: 160, y: 40, color: color1}
const body2: BodyPart = {x: 200, y: 40, color: color1}
const body: BodyPart = {x: 240, y: 40, color: color1}
snakey.body.push(body)
snakey.body.push(body2)
snakey.body.push(body3)
snakey.body.push(body4)
snakey.body.push(body5)
snakey.body.push(body6)

const abody4: BodyPart = {x: 40, y: 120, color: color2}
const bbody3: BodyPart = {x: 80, y: 120, color: color2}
const cbody2: BodyPart = {x: 120, y: 120, color: color2}
const dbody1: BodyPart = {x: 160, y: 120, color: color2}
snakey2.body.push(dbody1)
snakey2.body.push(cbody2)
snakey2.body.push(bbody3)
snakey2.body.push(abody4)


let snakeList: Snake[] = [];
snakeList.push(snakey)
snakeList.push(snakey2)


// bug users can switch very fast ... up left down... which can allow for illegal directions
var direction: Direction = Direction.RIGHT
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            if (direction == Direction.RIGHT) {
                break;
            }
            direction = Direction.LEFT
            break;
        case "ArrowRight":
            if (direction == Direction.LEFT) {
                break;
            }
            direction = Direction.RIGHT
            break;
        case "ArrowUp":
            if (direction == Direction.DOWN) {
                break;
            }
            direction = Direction.UP
            break;
        case "ArrowDown":
            if (direction == Direction.UP) {
                break;
            }
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
            ctx.fillStyle = `rgb(${bodyPart.color.red} ${bodyPart.color.green} ${bodyPart.color.blue} / ${bodyPart.color.opacity}%)`;
            ctx.fillRect(bodyPart.x, bodyPart.y, 40, 40);
        }
    }
}

//todo bug where going left when its going right will make bad behaviro.
// disable left when alreeady going right and vice versa. same for up down.

function getSnakeDirection(direction: Direction) {
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
    return {bodyX, bodyY};
}

function moveSnakeBody(snakeList: Snake[], direction: Direction): any {
    let {bodyX, bodyY} = getSnakeDirection(direction);


    for(const snake of snakeList) {
        let snakeHead: BodyPart = snake.body[0]
        const xte = snake.body[0].x
        const yte = snake.body[0].y
        const color = snake.body[0].color
        let prevBodyPosition: BodyPart = {x: xte, y: yte, color: color}
        snakeHead.x += bodyX
        snakeHead.y += bodyY
        // this is bad very bad lol
        // why snake length looks like 3 despite body of 4?
        for (let i = 1; i < snake.body.length; i += 1) {

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

function killSnake(deleteSnake: Snake) {
    snakeList = snakeList.filter(snake => snake.name !== deleteSnake.name );
}

function checkWallBoundaries(snakeList: Snake[]) {
    for (const snake of snakeList) {
        const snakeHead: BodyPart = snake.body[0]
        if (snakeHead.x >= board_size || snakeHead.x < 0) {
            killSnake(snake)
        }

        if (snakeHead.y >= board_size || snakeHead.y < 0) {
            killSnake(snake)
        }
    }
}

function checkSnakeBoundaries(snakeList: Snake[]) {
    for (const currentSnake of snakeList) {
        const currentSnakeHead = currentSnake.body[0];

        // ignore snake head ... set i to 1
        for (let i = 1; i < currentSnake.body.length; i++) {
            if (currentSnakeHead.x === currentSnake.body[i].x && currentSnakeHead.y === currentSnake.body[i].y) {
                killSnake(currentSnake);
            }
        }

        const otherSnakes: Snake[] = snakeList.filter(snake => snake.id !== currentSnake.id )
        const bodyLocationsX: Set<number> = new Set();
        const bodyLocationsY: Set<number> = new Set();

        for (const otherSnake of otherSnakes) {
            for (const body of otherSnake.body) {
                bodyLocationsX.add(body.x)
                bodyLocationsY.add(body.y)
            }

        }

        if (bodyLocationsX.has(currentSnakeHead.x) && bodyLocationsY.has(currentSnakeHead.y)) {
            console.log("snake is ded")
            killSnake(currentSnake);
        }
        // I could use a map and check if any map value has a value of more than 1... but then I lose track of WHO hit someone.\
        // Maybe not so... I only need to keep track of the heads.
        // I don't kill both parties, I only kill the heads... so I could create a map of all values, and then from that map check the values of heads to see if there is a collision.
        // not sure yet...
        // it's probably fast enough as is... It should be fine for me to brute force it.
    }
}

var mainFruit: Fruit = { name: "cherry", x: 120, y: 240}

function appendNewSnakeBodyPart(snake: Snake) {
    let xPrev = snake.body[snake.body.length -1].x
    let yPrev = snake.body[snake.body.length -1].y

    let {bodyX, bodyY} = getSnakeDirection(direction);

    let newBodyPart = {
        x: xPrev += bodyX,
        y: yPrev += bodyY,
        color: snake.body[snake.body.length -1].color,
    }

    snake.body.push(newBodyPart)
}

interface Coordinates {
    x: number;
    y: number;
}

function updateFruitLocation(snakeList: Snake[]) {
    const illegalCoordinatesX: Set<number> = new Set();
    const illegalCoordinatesY: Set<number> = new Set();

    for (const snake of snakeList) {
        snake.body.forEach(bodyPart => {
            illegalCoordinatesX.add(bodyPart.x)
            illegalCoordinatesY.add(bodyPart.y)
        });
    }

    let fruitCoordinates: Coordinates = getRandomCoordinates(board_size, grid_size)
    while (illegalCoordinatesX.has(fruitCoordinates.x) && illegalCoordinatesY.has(fruitCoordinates.y)) {
        fruitCoordinates = getRandomCoordinates(board_size, grid_size)
    }

    console.log("coords")
    console.log(illegalCoordinatesX, illegalCoordinatesY, fruitCoordinates)

    mainFruit = {name: mainFruit.name, x: fruitCoordinates.x, y: fruitCoordinates.y};
}

// todo ensure the division is a even number
function getRandomCoordinates(boardSize: number, gridSize: number): Coordinates {
    let randomNumberRange: number = boardSize / gridSize;
    let xCoordinate = (Math.floor(Math.random() * randomNumberRange) * gridSize);
    let yCoordinate = (Math.floor(Math.random() * randomNumberRange) * gridSize);

    console.log(xCoordinate, yCoordinate);

    return {
        x: xCoordinate,
        y: yCoordinate
    }
}

function checkFruit(snakeList: Snake[]) {

    // Only snake head matters
    for (const snake of snakeList) {
        let snakeHead = snake.body[0];
        if (snakeHead.x == mainFruit.x && snakeHead.y == mainFruit.y) {
            appendNewSnakeBodyPart(snake)
            updateFruitLocation(snakeList)
        }
    }
}

function renderFruit(ctx: CanvasRenderingContext2D, mainFruit: Fruit) {
    ctx.fillStyle = "rgb(350 0 0)";
    ctx.fillRect(mainFruit.x, mainFruit.y, 40, 40);
}

// Order matters
while (true) {
    ctx.clearRect(0, 0, board_size, board_size);
    moveSnakeBody(snakeList, direction)
    checkWallBoundaries(snakeList)
    checkSnakeBoundaries(snakeList)
    drawSnake(ctx, snakeList)
    checkFruit(snakeList)
    renderFruit(ctx, mainFruit)
    await sleep(100)
}








