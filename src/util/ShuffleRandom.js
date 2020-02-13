let posX, sharkPosX, sX, sY, jellyPosX, oxyPosX;

let xDist = 250;
let yDist = 33;

let xTerm = 500;
let sharkTerm = 900;

let coralWidth = 150;

export default class ShuffleRandom{
    constructor(game) {
        this._game = game;

        posX = [];
        sharkPosX = [];
        jellyPosX = [];
        oxyPosX = [];
        sX = [];
        sY = [];

    }

    _shuffle(num) {
        let arr = [];
        for(let i=0; i<num; i++){
            // let n = (i +1) * xDist + xTerm;
            let n = i * xTerm + this._game.rnd.integerInRange(50, 500);
            posX.push(n);
            // posY.push(i * yDist + yTerm);
            // sharkPosX.push(n + this._game.rnd.integerInRange(coralWidth, coralWidth * 4));
            let sP = i * sharkTerm + this._game.rnd.integerInRange(50, 500);
            sharkPosX.push(sP);
        }

        arr.push(posX, sharkPosX);
        return arr;
    }

    _shuffleJelly(num) {
        let arr = [];
        for(let i=0; i<num; i++){
            // let n = (i +1) * xDist + xTerm;
            let n = i * (xTerm * 1.7) + this._game.rnd.integerInRange(200, 500);
            jellyPosX.push(n);
            // posY.push(i * yDist + yTerm);
            // posY.push(n + this._game.rnd.integerInRange(coralWidth, coralWidth * 2));
        }

        arr.push(jellyPosX);
        return arr;
    }

    _shuffleOxy(num) {
        let arr = [];
        for(let i=0; i<num; i++){
            // let n = i * (parseInt(xTerm / 6)) + this._game.rnd.integerInRange(150, 400);
            let n = i * (parseInt(800 / 6)) + this._game.rnd.integerInRange(150, 400);
            oxyPosX.push(n);
        }

        arr.push(oxyPosX);
        return arr;
    }

    _reShuffle(reArr, min) {

        let j, x, i;
        for (i = reArr.length - min; i > 0; i--)
        {
            j = Math.floor(Math.random() * (i + 1));
            x = reArr[i];
            reArr[i] = reArr[j];
            reArr[j] = x;
        }
        return reArr;
    }

    _compare ( a , b ) {
        a.toString();
        b.toString();
        return ( b < a ) ? 1 : ( b == a ) ? 0 : -1;
    }

    posInit(num) {

        let posArr = []
        let temp, rnum

        for(let i=1; i<=num; i++){
            posArr.push(i);
        }

        for(let i=0; i< posArr.length ; i++)
        {
            rnum = parseInt(Math.random() *num);
            temp = posArr[i];
            posArr[i] = posArr[rnum];
            posArr[rnum] = temp;
        }

        return posArr;

        this._game = null;
    }


}

ShuffleRandom = null;


