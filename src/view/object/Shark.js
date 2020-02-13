import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";
import SoundAssetKey from "../../data/SoundAssetKey";
import SoundManager from "../../manager/SoundManager";
let sharkAsset = [AssetKey.IMG_SHARK_PREFIX_01, AssetKey.IMG_SHARK_PREFIX_02, AssetKey
    .IMG_JELLY_PREFIX];
export default class Shark extends Phaser.Sprite{
    constructor(game, assetNum) {
        super(game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, assetNum);
        this._game = game;
        // this.anchor.setTo(0.5, 0.5);
        this._num = assetNum;
        this._gameGroup = this._game.add.group();

        this.animations.add(sharkAsset[this._num], Phaser.Animation.generateFrameNames(sharkAsset[this._num], 1, 4, "", 2), 1, true);
        this.animations.play(sharkAsset[this._num], 5, true);
    }

    _init() {
        let num = this.y;
        if(this.y > 350)
        {
            num = -200
        }
        else
        {
            num = 200
        }
       this._game.add.tween(this).to({y:this.y + num}, GameConfig.SHARK_SPEED_ARRAY[this._num], Phaser.Easing.Linear.Out, true, 0, 100, true);

    }

    _collisionEffect(obj, yPos) {

        // SoundManager.instance.effectSound(SoundAssetKey.EFFECT_SHARK, 0.7);
        SoundManager.instance.effectSound(SoundAssetKey.EFFECT_SHARK_NEW, 0.7);
        let tween = this._game.add.tween(obj).to({alpha:0}, 300, Phaser.Easing.Linear.Out, true, 0, 2);
        tween.onComplete.addOnce(alphaRestore, this);
        function alphaRestore() {
            obj.alpha = 1;
            // obj.destroy();
            let tween = this._game.add.tween(obj).to({x: -500}, 1000, Phaser.Easing.Linear.Out, true, 0, 0, false);
            tween.onComplete.add(objDestroy, this);
        }
        function objDestroy() {
            obj.destroy();

        }
    }


}