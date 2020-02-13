import AssetKey from "../../data/AssetKey";
import MouseEffect from "../../ui/MouseEffect";
import SoundAssetKey from "../../data/SoundAssetKey";
import SoundManager from "../../manager/SoundManager";
let fishAsset = [AssetKey.IMG_FISH_PREFIX_01, AssetKey.IMG_FISH_PREFIX_02, AssetKey.IMG_FISH_PREFIX_03, AssetKey.IMG_JELLY_PREFIX];
let angleArr = [0.2, 0.3, 0.5, 0.7, 1];
let moveArr = [400, 600, 1000];
let scaleArr = [2, 2, 1.7];
export default class Fish extends Phaser.Sprite{
    constructor(game, assetNum, ally, desireRate = 5) {
        super(game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, assetNum);
        this._game = game;
        // this.anchor.setTo(0.5, 0.5);
        this.ally = ally;
        this._num = assetNum;
        this._desireRate = desireRate;
        this._gameGroup = this._game.add.group();

        this.animations.add(fishAsset[this._num], Phaser.Animation.generateFrameNames(fishAsset[this._num], 1, 4, "", 2), 1, true);
        this.animations.play(fishAsset[this._num], this._desireRate, true);

        this._makeRadius();
    }

    _makeRadius() {

        // console.log(this._num)
        if(this._num < 3) //if not jelly
        {
            // console.log(this.width, this.height)
            this.circle = new Phaser.Graphics(this._game);
            this.circle.beginFill(0xffffff, 0);
            // this.circle.lineStyle(3, 0xffffff, 1);
            this.circle.drawCircle(40, 30, parseInt(this.height * scaleArr[this._num]));
            this.circle.endFill();
            this.addChild(this.circle);
        }



    }

    _movement(obj) {

         let tween = this._game.add.tween(obj).to({x:obj.x - 1300}, this._game.rnd.integerInRange(6000, 9000), Phaser.Easing.Linear.Out, true, 0, 0, false);
         this._game.add.tween(obj).to({y: obj.y + this._game.rnd.integerInRange(10, 50)}, moveArr[parseInt(Math.random() * moveArr.length) ], Phaser.Easing.Linear.Out, true, 0, 100, true);
        tween.onComplete.add(this._destroy, this);

    }

    _zigzagMovement(obj) {
        obj.anchor.setTo(0.5, 0.5);
        let rot = angleArr[parseInt(Math.random() * angleArr.length)];
        let tween = this._game.add.tween(obj).to({y:-200}, this._game.rnd.integerInRange(6500, 10000), Phaser.Easing.Linear.Out, true, 0, 0, false);
        // this._game.add.tween(obj).to({x: obj.x - this._game.rnd.integerInRange(30, 50), rotation:rot}, this._game.rnd.integerInRange(500, 1000), Phaser.Easing.Linear.Out, true, 0, 100, true);
        this._game.add.tween(obj).to({rotation:rot}, this._game.rnd.integerInRange(500, 1000), Phaser.Easing.Linear.Out, true, 0, 100, true);
        tween.onComplete.add(this._destroy, this);
    }

    _destroy(obj) {
        obj.destroy();
    }

    _collisionEffect(obj) {


        if(obj.ally)
        {
            SoundManager.instance.effectSound(SoundAssetKey.EFFECT_FISH, 0.7);
            new MouseEffect(this._game, obj.x, obj.y, 90, 0);
            obj.destroy();
        }

        else
        {
            SoundManager.instance.effectSound(SoundAssetKey.EFFECT_JELLY, 0.7);
            let tween = this._game.add.tween(obj).to({alpha:0}, 300, Phaser.Easing.Linear.Out, true, 0, 2);
            tween.onComplete.addOnce(alphaRestore, this);

        }

        function alphaRestore() {
            obj.alpha = 1;
            // obj.destroy();
            let tween = this._game.add.tween(obj).to({y: -200}, 1000, Phaser.Easing.Linear.Out, true, 0, 0, false);
            tween.onComplete.add(objDestroy, this);
        }
        function objDestroy() {
            obj.destroy();

        }
    }

}