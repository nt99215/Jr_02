import AssetKey from "../../data/AssetKey";

let coralAsset = ['img_rock_l', 'img_rock_m', 'img_rock_s'];

export default class Coral extends Phaser.Sprite{
    constructor(game, assetNum) {
        super(game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, coralAsset[assetNum]);
        this._game = game;

    }

    _collisionEffect(obj) {

        let tween = this._game.add.tween(obj).to({alpha:0}, 300, Phaser.Easing.Linear.Out, true, 0, 2);
        tween.onComplete.addOnce(alphaRestore);
        function alphaRestore() {
            obj.alpha = 1;
        }
    }

}