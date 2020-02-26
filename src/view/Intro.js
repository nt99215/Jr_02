import GameConfig from "../data/GameConfig";
import AssetKey from "../data/AssetKey";
import SoundManager from "../manager/SoundManager";
import SoundAssetKey from "../data/SoundAssetKey";
import SeparateAnimation from "./object/SeparateAnimation";
import ScreenManager from "../loader/manager/ScreenManager";


let term = 20;
let oxyTerm = 30;
let desireFps = 5;
export default class Intro {
    constructor(game, parent = null) {

        this._game = game;
        // this._dispatcher = dispatcher;
        this._parent = parent;
        this._gameGroup = this._game.add.group();

        if(GameConfig.SCENE_STATE === 'intro') this._init();
    }

    _init() {

        this._gameGroup.add(this._game.make.image(0, 0, AssetKey.INTRO_ASSET, AssetKey.INTRO_BG));
        this._gameGroup.add(this._game.make.image(329, 59, AssetKey.INTRO_ASSET, AssetKey.IMG_TITLE));
        this.pong = new SeparateAnimation(this._game, AssetKey.INTRO_ASSET, AssetKey.INTRO_PONG, 58, 159, 1, 4, '', 2, 10, true);
        this._gameGroup.addChild(this.pong);
        this._game.add.tween(this.pong).to({ y: this.pong.y + 7 }, 500, Phaser.Easing.Linear.Out, true, 0, 1000, true);
        this.oxy1 = this._gameGroup.add(this._game.make.image(349, 44, AssetKey.INTRO_ASSET, AssetKey.IMG_OXY_01));
        this._game.add.tween(this.oxy1).to({ y: this.oxy1.y + oxyTerm }, 800, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.oxy2 = this._gameGroup.add(this._game.make.image(712, 48, AssetKey.INTRO_ASSET, AssetKey.IMG_OXY_02));
        this._game.add.tween(this.oxy2).to({ y: this.oxy2.y + oxyTerm }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.oxy3 = this._gameGroup.add(this._game.make.image(807, 129, AssetKey.INTRO_ASSET, AssetKey.IMG_OXY_03));
        this._game.add.tween(this.oxy3).to({ y: this.oxy3.y - oxyTerm }, 600, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.shark = new SeparateAnimation(this._game, AssetKey.INTRO_ASSET, AssetKey.INTRO_SHARK, 999, 173, 1, 4, '', 2, desireFps, true);
        this._gameGroup.addChild(this.shark);
        this.fish1 = new SeparateAnimation(this._game, AssetKey.INTRO_ASSET, AssetKey.INTRO_FISH_01, 374, 613, 1, 4, '', 2, desireFps, true);
        this._gameGroup.addChild(this.fish1);
        this.fish2 = new SeparateAnimation(this._game, AssetKey.INTRO_ASSET, AssetKey.INTRO_FISH_021, 920, 550, 1, 4, '', 2, desireFps, true);
        this._gameGroup.addChild(this.fish2);


        this._oxyGenerate();

        this.weed1 = this._gameGroup.add(this._game.make.image(0, 476, AssetKey.INTRO_ASSET, AssetKey.IMG_SEAWEED_01));
        this.weed1.anchor.setTo(0.5, 1);
        this.weed1.x +=this.weed1.width/2;
        this.weed1.y +=this.weed1.height + 30;
        this.weed1.rotation = -0.1;
        this._game.add.tween(this.weed1).to({ rotation : 0.1 }, 1500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.weed2 = this._gameGroup.add(this._game.make.image(1139, 457, AssetKey.INTRO_ASSET, AssetKey.IMG_SEAWEED_02));
        this.weed2.anchor.setTo(0.5, 1);
        this.weed2.x +=this.weed1.width/2 + 20;
        this.weed2.y +=this.weed1.height + 30;
        this.weed2.rotation = -0.1;
        this._game.add.tween(this.weed2).to({rotation : 0.1 }, 1800, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

        // this.startBtn = this._gameGroup.add(this._game.make.image(0, 0, AssetKey.BTN_ASSET, AssetKey.START_BUTTON));
        // this.startBtn.inputEnabled = true;
        // this.startBtn.events.onInputDown.add(this._gameStart, this);


        this.startBtn = this._gameGroup.addChild(this._game.make.button(0, 0, AssetKey.BTN_ASSET, this._gameStart.bind(this), this, AssetKey.START_BUTTON, AssetKey.START_BUTTON, AssetKey.START_BUTTON));
        this.startBtn.x= 506;
        this.startBtn.y= this._game.height - this.startBtn.height - 156;





    }

    _oxyGenerate() {

        let xPos = [50, 80, 110, 120, 150, 180, 200, 1030, 1070, 1100, 1130, 1160, 1180, 1210, 1230];
        let radius = [15, 25, 17, 12, 22, 14, 12, 25, 13, 15, 23, 16, 18, 23, 13];
        let alp = [0.3, 0.7, 0.5, 0.4, 0.5, 0.8, 0.6, 0.8, 0.5, 0.7, 0.7, 0.8, 0.7, 0.5, 0.8, 0.5];

        for(let i = 0; i<xPos.length; i++)
        {

            let oxy = new Phaser.Graphics(this._game);
            oxy.beginFill(0x86dcfe, 1);
            oxy.drawCircle(0, 0, radius[parseInt(Math.random() * radius.length)]);
            oxy.endFill();

            let rt = this._game.rnd.integerInRange(1400, 2500);
            let delay = this._game.rnd.integerInRange(200, 1200);
            let term = this._game.rnd.integerInRange(5, 20);
            let alpha = alp[parseInt(Math.random() * alp.length)];

            oxy.anchor.setTo(0.5, 0.5);
            oxy.scale.set(0, 0);
            oxy.x = xPos[i];
            oxy.y = this._game.height + 100;
            oxy.alpha = 0;
            this._gameGroup.addChild(oxy);
            this._gameGroup.bringToTop(this.pong);
            this._game.add.tween(oxy).to({alpha: alpha}, rt, Phaser.Easing.Linear.Out, true, 0, 0, false);
            this._game.add.tween(oxy.scale).to({x: 1,  y:1}, 500, Phaser.Easing.Linear.Out, true, 0, 0, false);

            let tween = this._game.add.tween(oxy).to({y: 400}, rt, Phaser.Easing.Linear.Out, true, delay, 0, false);
            let tween2 = this._game.add.tween(oxy).to({x: oxy.x + term}, radius[i] * 20, Phaser.Easing.Linear.Out, true, 0, 100, true);

            tween.onComplete.add( () => {
                tween2.stop(true);
                let tween3 = this._game.add.tween(oxy).to({y:200, alpha: 0}, 1000, Phaser.Easing.Linear.Out, true, 0, 0, false);
                this._game.add.tween(oxy.scale).to({x: 0,  y:0}, 500, Phaser.Easing.Linear.Out, true, 0, 0, false);
                tween3.onComplete.add(() => {
                    oxy.destroy();
                })
            });

        }

        this._game.time.events.add( this._game.rnd.integerInRange(800, 2000), this._oxyGenerate, this);
    }

    /**
     * GAME START
     */
    _gameStart() {

        // this._game.scale.fullScreenScaleMode =  Phaser.ScaleManager.SHOW_ALL;
        // this._game.scale.startFullScreen();

        SoundManager.instance.allSoundPause();
        SoundManager.instance.effectSound(SoundAssetKey.START_SOUND);
        GameConfig.TUTORIAL_DISABLED = true;
        this.startBtn.input.enabled = false;
        this._game.time.events.add(1200, enabled, this);

        if(!this._game.device.desktop && this._game.device.fullscreen){
            ScreenManager.instance.fullScreen();
        }

        function enabled() {
            this._game.time.events.removeAll();
            // if(GameConfig.SCENE_STATE === 'intro') this._dispatcher.dispatch();
            GameConfig.TUTORIAL_DISABLED = false;
            this._parent._create();
        }

    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._game.time.events.removeAll();
    }

}