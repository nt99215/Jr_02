export default class Dimmed{
    constructor(game) {
        // super(game)

        this._game = game;
        this._gameGroup = this._game.add.group();

        this._init();

    }

    _init() {

        this._graphics =  new Phaser.Graphics(this._game, 0, 0);
        this._graphics.beginFill(0x000000, 0.6);
        this._graphics.drawRect(0, 0, 1280, 720);
        this._graphics.endFill();
        // this._graphics.inputEnabled =  true;
        // this._graphics.events.onInputDown.add(this.bgClick, this);
        this._gameGroup.add(this._graphics);
    }

}