export class Movement {
    constructor(){

    }

    setGameLoop(callback){
        setInterval(callback, 50);
    }
}