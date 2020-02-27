import AssetKey from "../data/AssetKey";
import GameConfig from "../data/GameConfig";
import SoundManager from "../manager/SoundManager";
import SoundAssetKey from "../data/SoundAssetKey";
import BackgroundEffect from "../ui/BackgroundEffect.js";
import ConfigManager from "../manager/ConfigManager";
import SeparateAnimation from "./object/SeparateAnimation";
import WebEnabledCheck from "../util/WebEnabledCheck";


let guideSnd;
let speechBubbleArr = [AssetKey.IMG_SPEECHBUBBLE_01, AssetKey.IMG_SPEECHBUBBLE_02];
let starXpos = [453, 584, 716];
let starYpos = [96, 76, 96];

export default class ResultView extends Phaser.Group{
    constructor(game, parent) {
        super(game);

        this._game = game;
        this._gameGroup = this._game.add.group();
        // this._dispatcher = dispatcher;
        this._parent = parent;

        GameConfig.POP_ENABLED = true;
        GameConfig.SCENE_STATE = "result";
        this._init();
        this._webCheck();
    }

    _webCheck() {
        WebEnabledCheck.instance.backBtnEnabled(this.closeBtn);
    }

    _init() {

        /*this._graphics = this._game.add.graphics(0,0);
        this._graphics.beginFill(0x90c308, 1);
        this._graphics.drawRect(0, 0, 1280, 720);
        this._graphics.endFill();
        this._gameGroup.addChild(this._graphics);*/
        this.bgImg = this._gameGroup.add(this._game.make.image(0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.BG_FIELD));


        this._graphicsOver = this._game.add.graphics(0,0);
        this._graphicsOver.beginFill(0x000000, 0.6);
        this._graphicsOver.drawRect(0, 0, 1280, 720);
        this._graphicsOver.endFill();
        this._graphicsOver.x = 0;
        this._graphicsOver.y = 0;
        this._gameGroup.addChild(this._graphicsOver);

        /**
         * BG & TEXT
         * @type {Phaser.Image}
         */

        this.bg = this._gameGroup.add(this._game.make.image(256, 39, AssetKey.RESULT_ASSET, AssetKey.RESULT_IMG_POPUP));
        this.shark = new SeparateAnimation(this._game, AssetKey.RESULT_ASSET, AssetKey.RESULT_IMG_SHARK, 99, 428, 1, 2, '', 2, 5, true);
        this._gameGroup.addChild(this.shark);
        this.sharkTween = this._game.add.tween(this.shark).to({y: this.shark.y - 10}, 800, Phaser.Easing.Linear.Out, true, 0, 100, true);

        this.pong = new SeparateAnimation(this._game, AssetKey.RESULT_ASSET, AssetKey.RESULT_IMG_PONG, 846, 336, 1, 2, '', 2, 4, true);
        this._gameGroup.addChild(this.pong);
        this.pongTween = this._game.add.tween(this.pong).to({y: this.pong.y - 10}, 1000, Phaser.Easing.Linear.Out, true, 0, 100, true);



        /**
         *
         * ANIMATION
         * @type {Phaser.Image}
         */

        /**
         * BUTTON
         */
        this.closeBtn = this._gameGroup.add(this._game.make.button(0, 0,  AssetKey.BTN_ASSET, this._onClose.bind(this), this, AssetKey.BTN_CLOSE_DEFAULT, AssetKey.BTN_CLOSE_DEFAULT, AssetKey.BTN_CLOSE_OVER));
        this.closeBtn.x = this._game.width - this.closeBtn.width- 217;
        this.closeBtn.y = 178;
        this.closeBtnSound = null;
        this._buttonSndEnabled(SoundAssetKey.SND_CLOSE, this.closeBtnSound, this.closeBtn);

        this.restartBtn = this._gameGroup.add(this._game.make.button(0, 0,  AssetKey.BTN_ASSET, this._onRestart.bind(this), this, AssetKey.RETRY_BUTTON, AssetKey.RETRY_BUTTON, AssetKey.RETRY_BUTTON_OVER));
        this.restartBtn.x = 506;
        this.restartBtn.y = 497;
        this.restartBtnSound = null;
        this._buttonSndEnabled(SoundAssetKey.RESTART_SOUND, this.restartBtnSound, this.restartBtn);


        /**
         *
         * STAR SET
         */
        this._starInit();

    }


    _starInit() {

        let num = GameConfig.GAME_SCORE;
        let speech;
        if(num <=1) num = 1;
        if(GameConfig.SCENE_STATE === "result")
        {

            for(let i=0; i<3; i++)
            {
                let img = this._game.add.image(starXpos[i], starYpos[i], AssetKey.RESULT_ASSET, 'img_staroff_0' + (i + 1));
                this._gameGroup.addChild(img);
            }

            for(let i=0; i<num; i++)
            {
                let img2 = this._game.add.image(starXpos[i], starYpos[i], AssetKey.RESULT_ASSET, 'img_staron_0' + (i + 1));
                this._gameGroup.addChild(img2);
            }

            if(num === 3)
            {
                guideSnd = SoundAssetKey.RESULT_GREAT;
                speech = speechBubbleArr[1];
            }
            else
            {
                guideSnd = SoundAssetKey.RESULT_GOOD;
                speech = speechBubbleArr[0];
            }

            this.speechBubble = this._gameGroup.add(this._game.make.image(330, 287, AssetKey.RESULT_ASSET, speech));

            /**
             *
             * CELEBARTION EFFECT
             * @type {BackgroundEffect}
             */
            this.backGroup = new BackgroundEffect(this._game);
            this._gameGroup.addChild(this.backGroup);

            SoundManager.instance.allSoundPause();
            SoundManager.instance.effectSound(guideSnd);


        }


    }

    _buttonSndEnabled(sndKey, snd, btn) {
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);

    }

    _onClose(){
        this._disabledBtn();
        this._game.time.events.add(400, close, this);
        function close() {
            top.location.href = GameConfig.APP_URL;
        }

    }


    _onRestart() {
        this._disabledBtn();
        this._game.time.events.add(1000, enabled, this);

        function enabled() {

            this._gameGroup.removeChildren(0, this._gameGroup.length);
            ConfigManager.prototype.GAME_CONFIG_RESET();
            // this._dispatcher.dispatch();
            this._parent._create();
        }

    }

    _disabledBtn() {
        this.closeBtn.input.enabled = false;
        this.restartBtn.input.enabled = false;
    }

}