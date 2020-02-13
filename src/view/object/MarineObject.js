import AssetKey from "../../data/AssetKey";
import SoundAssetKey from "../../data/SoundAssetKey";
import SoundManager from "../../manager/SoundManager";
let fishAsset = [AssetKey.IMG_OXY, AssetKey.SUBMARINE];
let scaleArr = [0.5, 0.6, 0.7, 0.8, 1];
export default class MarineObject extends Phaser.Sprite{
    constructor(game, assetNum, ally, oxyArr) {
        super(game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, fishAsset[assetNum]);
        this._game = game;
        this._gameGroup = this._game.add.group();
        this.ally = ally;
        this.oxyArr = oxyArr;
    }

    _movement(obj) {

         let tween = this._game.add.tween(obj).to({x:obj.x - 1300}, this._game.rnd.integerInRange(3000, 8000), Phaser.Easing.Linear.Out, true, 0, 0, false);
         this._game.add.tween(obj).to({y: obj.y + this._game.rnd.integerInRange(50, 100)}, this._game.rnd.integerInRange(600, 1500), Phaser.Easing.Linear.Out, true, 0, 100, true);
        tween.onComplete.add(this._destroy, this);

    }

    _verticalMovement(obj) {
        let rn = scaleArr[parseInt(Math.random() * scaleArr.length)];
        obj.scale.setTo(rn, rn);
        let tween = this._game.add.tween(obj).to({y: -100}, this._game.rnd.integerInRange(3000, 5000), Phaser.Easing.Linear.Out, true, 0, 0);
        let zigzag = this._game.add.tween(obj).to({x:obj.x + this._game.rnd.integerInRange(10, 60)}, this._game.rnd.integerInRange(300, 1200), Phaser.Easing.Sinusoidal.In, true, 0, 30, true);
        tween.onComplete.add(this._destroy, this);
    }

    _oxyExplosion(obj) {
        let scaleArr = [0.2, 0.4, 0.3];
        let speedArr = [800, 600, 500];
        for(let i=0; i<3; i++)
        {
            let oxy = this._game.add.image(obj.x, obj.y, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.IMG_OXY);
            // oxy.scale.setTo(scaleArr[i], scaleArr[i]);
            oxy.x = obj.x;
            oxy.y = obj.y;
            oxy.x += (i * 15);
            // oxy.alpha = 0;
            this._game.add.tween(oxy).to({alpha:0}, speedArr[i], Phaser.Easing.Linear.Out, true, 0, 0, false );
            this._game.add.tween(oxy).to({y: oxy.y - 300}, speedArr[i], Phaser.Easing.Linear.Out, true, 0, 0, false );
            this._game.add.tween(oxy.scale).to({x:scaleArr[i], y:scaleArr[i]}, speedArr[i], Phaser.Easing.Bounce.Out, true, 0, 0, false);

        }
    }


    _destroy(obj) {
        obj.destroy();
    }

    _collisionEffect(obj, pong) {

        SoundManager.instance.effectSound(SoundAssetKey.EFFECT_OXY_NEW, 0.8);
        if(obj.ally)
        {
            this._oxyExplosion(pong);
            obj.destroy();
        }
    }

}