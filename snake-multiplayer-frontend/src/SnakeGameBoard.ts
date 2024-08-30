import {Snake} from "./Snake.ts";

class SnakeGameBoard {
    snakes: Snake[];
    board: Board

    constructor(snakes: Snake[], board: Board) {
        this.snakes = snakes;
        this.board = board;
    }

    sendEvent(event: SnakeEventEnum) {
        switch (event) {
            case SnakeEventEnum.DIRECTION:
                "direction";
                break;
            case SnakeEventEnum.GROW:
                "grow";
                break;
            case SnakeEventEnum.FRUIT:
                "fruit"
                break;
            case SnakeEventEnum.DIE:
                "death";
                break;
        }
    }

    // todo event enum?
    eventAnnouncer() {}

    getEventHistory() {}
}