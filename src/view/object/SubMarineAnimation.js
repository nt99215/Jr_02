import SoundManager from "../../manager/SoundManager";
import SoundAssetKey from "../../data/SoundAssetKey";
import AssetKey from "../../data/AssetKey";
import SeparateAnimation from "./SeparateAnimation";

let thisAssetKey;
let thisAssetName;
let thisRate;
let thisLoop;

let thisAni;

export default class SubMarineAnimation extends Phaser.Sprite{
    constructor(game, assetKey, assetName, xPos, yPos, start, stop, suffix, zeroPad, desireRate = 10, loop = true, oxyArr) {
        super(game, 0, 0, assetKey);

        this._game = game;
        this._gameGroup = this._game.add.group();
        //this.anchor.setTo(0.5, 0.5);
        this.oxyArr = oxyArr;
        thisAssetKey = assetKey;
        thisAssetName = assetName;
        thisRate = desireRate;
        thisLoop = loop;
        thisAni = this.animations.add(assetName, Phaser.Animation.generateFrameNames(assetName, start, stop, suffix, zeroPad),  desireRate, loop);
        this.animations.play(assetName, desireRate, loop);
        this.x = xPos;
        this.y = yPos;

    }

    _stop() {
        thisAni.stop(null, true);
    }

    _play() {
        thisAni.play();
    }

    _subMarineMovement(obj) {

        SoundManager.instance.allSoundPause();
        SoundManager.instance.effectSound(SoundAssetKey.EFFECT_CLEAR);
        let tween = this._game.add.tween(obj).to({x:550, y:170}, 2000, Phaser.Easing.Linear.Out, true, 0, 0, false);
        tween.onComplete.add(effectSndHandler, this);

        function effectSndHandler() {
            SoundManager.instance.effectSound(SoundAssetKey.CLEAR_SND);

        }

        this._shiningEffect();
        this._generateOxy();
        this._twinkleEffect();


    }


    _twinkleEffect() {

        let scaleArr = [0.5, 1, 0.7, 0.5, 0.5, 1, 1];
        let xPos = [460, 498, 619, 655, 783, 778, 638];
        let yPos = [228, 105, 164, 58, 78, 125, 235];
        let interval = [300, 400, 500];

        for(let i = 0; i<scaleArr.length; i++)
        {
            let tw = new Phaser.Image(this._game, xPos[i] + 27, yPos[i] + 27, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.IMG_TWINKLE);
            this._gameGroup.addChildAt(tw, 1);
            tw.scale.setTo(0, 0);
            tw.anchor.setTo(0.5, 0.5);
            tw.alpha = 0;
            let rn = interval[parseInt(Math.random() * interval.length)];
            this._game.add.tween(tw).to({alpha: 1}, rn, Phaser.Easing.Linear.Out, true, 0, 100, true);

            this._game.add.tween(tw.scale).to({ x: scaleArr[i], y: scaleArr[i]}, rn, Phaser.Easing.Bounce.Out, true, 0, 0, false);
        }
    }

    _shiningEffect() {

        this.shining = new SeparateAnimation(this._game, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.IMG_LIGHT_PREFIX, 325, 0, 1, 2, '', 2, 5, true);
        this._gameGroup.addChildAt(this.shining, 0);
        this.shining.alpha = 0;
        let tween = this._game.add.tween(this.shining).to({alpha: 1}, 800, Phaser.Easing.Bounce.Out, true, 0, 0, false);
    }

    _generateOxy() {

        SoundManager.instance.effectSound(SoundAssetKey.EFFECT_OXY, 0.5);
        let scaleArr = [0.3, 0.5, 0.7, 1];
        for(let i=0; i<this.oxyArr.length; i++)
        {
            this.oxy = this._game.add.image(parseInt(this.oxyArr[i] / 10), this._game.height + 200, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.IMG_OXY);
            let rnd = scaleArr[parseInt(Math.random() * 4)];
            this.oxy.scale.setTo(rnd, rnd);
            this.oxy.alpha = rnd;
            let time = this._game.rnd.integerInRange(800, 5000);
            let time2 = this._game.rnd.integerInRange(800, 3000);
            let time3  = this._game.rnd.integerInRange(100, 300);
            let term  = this._game.rnd.integerInRange(10, 30);

            let tween = this._game.add.tween(this.oxy).to({y: -100}, time, Phaser.Easing.Linear.Out, true, time2, 0, false);
            this._game.add.tween(this.oxy).to({x: this.oxy.x + term}, time3, Phaser.Easing.Linear.Out, true, 0, 10, true);
            tween.onComplete.add( () => {
                this.oxy.destroy();

            });

            this._gameGroup.addChild(this.oxy);
        }

    }

    _destroy() {
        this.animations.destroy();
        this._gameGroup.removeChildren(0, this._gameGroup.length);
    }


}