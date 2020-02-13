import AssetKey from "../../data/AssetKey";

let startPos = 368;
let endPos = 723;
export default class OceanNavigator extends Phaser.Image{
    constructor(game) {
        super(game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS);
        this._game = game;
        this._init();
    }

    _init() {

        let bg = new Phaser.Image(this._game, 368, 30, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.NAVIGATOR);
        this.slide = new Phaser.Image(this._game, 368, 30, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.NAVIGATOR_SLIDE);
        this.addChildAt(bg, 0);
        this.addChild(this.slide);
    }

    _updateSlidePosition(num) {
        let cNum = (endPos - startPos ) /100 * num;
        this.slide.x = parseInt(startPos + (cNum * 100));
    }

    _destroy() {

        this.removeChildren(0, this.length);

    }

}