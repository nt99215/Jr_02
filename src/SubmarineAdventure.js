import SoundManager from "./manager/SoundManager";
import SceneManager from "./manager/SceneManager";
import SoundAssetKey from "./data/SoundAssetKey";
import AssetKey from "./data/AssetKey";
import GameConfig from "./data/GameConfig";
import Controller from "./ui/Controller";
import Intro from "./view/Intro";
import BgView from "./view/BgView";
import ObjectManager from "./manager/ObjectManager";
import WebEnabledCheck from "./util/WebEnabledCheck";
import ResultView from "./view/ResultView";
import ScreenManager from "./loader/manager/ScreenManager";
import ConfigManager from "./manager/ConfigManager";

export default class SubmarineAdventure extends Phaser.Sprite{
    constructor(game, x, y) {
        super(game, x, y);
        // this._gameMain = gameMain;
        // this._gameManager = gameMain.gameManager;
        this._game = game;

        /**
         * Manager add
         *
         */
        new SoundManager(this._game);
        new SceneManager(this._game);
        new WebEnabledCheck(this._game);

        if(! this.game.device.desktop && this.game.device.fullScreen)
            this.game.input.onTap.add(ScreenManager.instance.fullScreen, this);
    }


    _startViewInit() {

        if(GameConfig.GAME_RESET)
        {
            this._gameOver();
        }

        GameConfig.SCENE_STATE = 'intro';
        this._introBg = new Intro(this._game, this);
        GameConfig.CURRENT_SCENE = this._introBg;
        this._mainController = new Controller(this._game, this);
        GameConfig.MAIN_CONTROLLER = this._mainController;
        // this._gameManager.startBGContent = this._introBg;
        SoundManager.instance.intro(SoundAssetKey.GAME_INTRO, false);

    }

    _create() {

        GameConfig.SCENE_STATE = 'mainScene';
        SoundManager.instance.allSoundPause();

        this._createBG();
        this._createController();
        this._createBgm();

    }

    _createBG() {

        if(this._introBg)
        {
            this._introBg._destroy();
            this._introBg = null;
        }

        new BgView(this._game);
        this._objectManager = new ObjectManager(this._game);
        GameConfig.CURRENT_SCENE = this._objectManager;

    }

    _createController() {
        this._controller = new Controller(this._game);
    }

    _createBgm() {
        SoundManager.instance.allSoundPause();
        SoundManager.instance.bgmStart();
    }


    update() {

        if(! GameConfig.IN_GAME || GameConfig.POP_ENABLED) return;

        if(this._objectManager)
        {
            let elapsed = this._game.time.elapsedMS / (500 / this._game.time.desiredFps);
            //if(elapsed > 2) return;
            this._objectManager._update(elapsed);
        }

        if(GameConfig.GAME_FINISH)
        {
            ConfigManager.prototype.GAME_OVER();
            this._gameOver();
        }
    }


    _gameOver() {

        GameConfig.SCENE_STATE = 'result';

        if(this._controller)
        {
            this._controller._btnDisabled();
            this._controller.removeAll(true)
            this._controller.destroy(true);
            this._controller = null;
        }

        new ResultView(this._game, this);

    }


}