import AssetKey from "../../data/AssetKey";
import SoundManager from "../../manager/SoundManager";
import SoundAssetKey from "../../data/SoundAssetKey";
import GameConfig from "../../data/GameConfig";

let obj = [];
let pong;
let pongYpos;
// let oxyScaleArr = [0.2, 0.3, 0.4];
let oxyScaleArr = [0.1, 0.2, 0.3];
let inGame;
let infoSnd = false;
export default class PongPong extends Phaser.Sprite{
    constructor(game) {
        super(game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS);
        this._game = game;
        this.anchor.setTo(0.5, 0.5);
        this._gameGroup = this._game.add.group();
        this.circle = null;
        inGame = true;

        //inGame
        this.animations.add(AssetKey.IMG_PONG_PREFIX, Phaser.Animation.generateFrameNames(AssetKey.IMG_PONG_PREFIX, 1, 5, "", 2), 8, true);
        //gameComplete
        this.animations.add(AssetKey.IMG_PONG_COMP_PREFIX, Phaser.Animation.generateFrameNames(AssetKey.IMG_PONG_COMP_PREFIX, 1, 2, "", 2), 5, true);
        //collision
        this.animations.add(AssetKey.IMG_PONG_COLLISION_PREFIX, Phaser.Animation.generateFrameNames(AssetKey.IMG_PONG_COLLISION_PREFIX, 1, 2, "", 2), 8, true);

        this.animations.play(AssetKey.IMG_PONG_PREFIX, 8, true);

        this._oxyEffect();
        this._makeRadius();
    }

    _infoAni() {

        let xPos = this.x;
        let yPos = this.y;
        // console.log(xPos, yPos);

        let circle = this._game.add.image(xPos, yPos, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.INFO_TOUCH);
        obj.push(circle);
        circle.x = xPos + 10;
        circle.anchor.setTo(0.5, 0.5);
        circle.scale.setTo(0.1, 0.1);
        circle.alpha = 0;
        this._game.add.tween(circle.scale).to({x:1, y:1}, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false );
        let circleTween = this._game.add.tween(circle).to({alpha:1}, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false );
        circleTween.onComplete.add( () => {
            if(! infoSnd)
            {
                GameConfig.CURRENT_GUIDE_SOUND = SoundAssetKey.INFO_SND;
                SoundManager.instance.effectSound(SoundAssetKey.INFO_SND, 0.8);
                infoSnd = true;
            }
        });

        let hand = this._game.add.image(xPos, yPos, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.INFO_HAND);
        obj.push(hand);
        hand.anchor.setTo(0.5, 0.5);
        hand.scale.setTo(0.1, 0.1);
        hand.alpha = 0;
        hand.x = xPos + 90;
        hand.y = yPos + 70;
        this._game.add.tween(hand.scale).to({x:1, y:1}, 750, Phaser.Easing.Elastic.Out, true, 1000, 0, false );
        this._game.add.tween(hand).to({alpha:1}, 750, Phaser.Easing.Elastic.Out, true, 1000, 0, false );
        let handCursor = this._game.add.tween(hand).to({x:xPos + 350}, 850, Phaser.Easing.Linear.Out, true, 1800, 0, false );
        handCursor.onComplete.add(timeHandler, this);

        let txtBox = this._game.add.image(xPos, yPos, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.INFO_TEXTBOX);
        obj.push(txtBox);
        txtBox.anchor.setTo(0.5, 0.5);
        txtBox.x = xPos + 200;
        txtBox.y = yPos + 180;
        txtBox.alpha = 0;
        this._game.add.tween(txtBox).to({alpha:1}, 800, Phaser.Easing.Linear.Out, true, 0, 0, false );

        function handReplay() {

            hand.x = xPos + 90;
            handCursor = this._game.add.tween(hand).to({x:xPos + 350}, 850, Phaser.Easing.Linear.Out, true, 0, 0, false );
            handCursor.onComplete.add(timeHandler, this);
        }

        function timeHandler() {

            this._game.time.events.add(2000, handReplay, this);
        }

    }

    _infoRemove() {

        SoundManager.instance.effectSoundStop(SoundAssetKey.INFO_SND, true);
        for(let i = 0; i<obj.length; i++)
        {
            obj[i].destroy();
        }
    }

    _makeRadius() {
        this.circle = new Phaser.Graphics(this._game);
        this.circle.beginFill(0xffffff, 0);
        // this.circle.lineStyle(3, 0xffffff, 1);
        this.circle.drawCircle(30, 0, 55);
        this.circle.endFill();
        this.addChild(this.circle);

    }


    _oxyEffect() {
        for(let i = 0; i<5; i++)
        {
            let oxy = this._game.add.image(0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.IMG_OXY);
            let rnd = oxyScaleArr[parseInt(Math.random() * oxyScaleArr.length)];
            let xTerm = 10;
            let yTerm = -20;
            oxy.scale.setTo(rnd, rnd);
            oxy.alpha = 0.3;
            oxy.x = this._game.rnd.integerInRange(this.x - 120 + xTerm, this.x - 50 + xTerm);
            oxy.y = this._game.rnd.integerInRange(this.y + 80 + yTerm, this.y + 120 + yTerm);
            this._gameGroup.addChild(oxy);
            let zigzag = this._game.add.tween(oxy).to({x:oxy.x + 20}, this._game.rnd.integerInRange(100, 300), Phaser.Easing.Linear.Out, true, 0, 100, true);
            let tween = this._game.add.tween(oxy).to({y: this.y - 300, alpha:0}, this._game.rnd.integerInRange(800, 1200), Phaser.Easing.Linear.Out, true, 0, 0, false);
            tween.onComplete.add( () => {
                zigzag.stop(true);
                oxy.destroy();

            })

        }

        this._game.time.events.add( this._game.rnd.integerInRange(500, 900), this._oxyEffect, this);
    }

    _movement(obj) {
        this.tweenBreath = this._game.add.tween(obj).to({y: obj.y + 20}, 800, Phaser.Easing.Linear.Out, true, 0, 1000, true);

    }

    _subMarineMovement(obj) {

        inGame = false;
        // GameConfig.BGM_ENABLED = false;
        this.animations.play(AssetKey.IMG_PONG_COMP_PREFIX, 5, true);

        this._game.time.events.removeAll();
        let tween = this._game.add.tween(obj).to({x:325, y: 430}, 2200, Phaser.Easing.Linear.Out, true, 0, 0, false);
        this._game.add.tween(obj).to({y: 430}, 2200, Phaser.Easing.Linear.Out, true, 0, 0, false);

        tween.onComplete.add( ()=> {
            this._movement(obj);
            this._oxyEffect();
        }, this);

    }

    _add() {

        let asset = coralAsset[parseInt(Math.random() * 3)];
        this._coral = new Phaser.Image(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, asset);
        this._coral.x = this._game.width;
        this._coral.y = this._game.height - this._coral.height;
        this._gameGroup.addChild(this._coral);

    }


    _generateCoral(xP, yP) {
        this._coral = new Phaser.Image(this._game, xP, yP, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.IMG_ROCK_L);
        this._coral.x = this._obj.x + this._coral.width;
        this._gameGroup.addChild(this._coral);
    }

    _collisionEffect(obj, target) {

        // console.log(obj)
        pong = obj;
        if(! target.ally)
        {
            this.animations.play(AssetKey.IMG_PONG_COLLISION_PREFIX, 8, true);
            let downTerm =   615 - (pong.y);
            pongYpos = parseInt(pong.y);
            if(downTerm<=0)
            {
                downTerm = 0;
            }
            else if(downTerm>100)
            {
                downTerm = 100;
            }
            let tween = this._game.add.tween(pong).to({y: pong.y + downTerm}, 700, Phaser.Easing.Elastic.Out, true, 0, 0, false);
            tween.onComplete.addOnce(effectRestore, this);

        }

        function effectRestore() {
            pong.y = pongYpos;

            if(! inGame)
            {
                this.animations.play(AssetKey.IMG_PONG_COMP_PREFIX, 5, true);
            }
            else
            {
                this.animations.play(AssetKey.IMG_PONG_PREFIX, 8, true);
            }

        }

    }

    _destroy() {

        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._gameGroup.destroy();
        this.circle.destroy();
        this._game.time.events.removeAll();

    }

}