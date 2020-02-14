import ResourceKey from "../const/ResourceKey";
import GameInfo from "../const/GameInfo";
import PreloadResource from "../const/PreloadData";
import Intro from "../../view/Intro";
import ResultView from "../../view/ResultView";
import GameConfig from "../../data/GameConfig";
import ScreenManager from "../manager/ScreenManager";

export default class Preloader extends Phaser.State {

    init() {
        this.queue = [];
        this.ready = false;
        // this.queue = [this.preload.bind(this)];
        this.preloadResource = new PreloadResource(this.game);
        this.addQueue(this.preloadResource.preload.bind(this));
    }


    addQueue(fn) {
        this.queue.push(fn);
    }


    preload() {

        //LOADING BG ADD
        this.bg = this.game.add.image(0, 0, ResourceKey.BOOT_LOADING_BACK);
        // bg.x= (gameInfo.designWidth - bg.widows) >> 1;
        this.bg.x = GameInfo.GAME_WIDTH/2 - this.bg.width/2;
        this.bg.y = GameInfo.GAME_HEIGHT/2 - this.bg.height/2;

        //ROW
        this.loadingCircle = this.game.add.image(490, 210, ResourceKey.PRELOAD_RESOURCE, 'loading_circle');
        this.preloadBar = this.game.add.sprite(557, 415, ResourceKey.PRELOAD_RESOURCE, 'loading_bar');
        this.game.load.setPreloadSprite(this.preloadBar);

        this.loadingJuni = this.game.add.sprite(557, 243, ResourceKey.PRELOAD_RESOURCE, 'loading_juni_piyo_01');
        // this.loadingJuni.x = (GameInfo.GAME_WIDTH - this.loadingJuni.width)  >> 1;
        this.loadingJuni.x = GameInfo.GAME_WIDTH/2 - this.loadingJuni.width/2;

        //ERROR IMAGE
        this.fileErrorImg = this.game.add.image(490, 186, ResourceKey.PRELOAD_RESOURCE, 'reloding_juni');
        this.networkErrorImg = this.game.add.image(490, 186, ResourceKey.PRELOAD_RESOURCE, 'network_juni');
        this.fileErrorImg.visible = false;
        this.networkErrorImg.visible = false;

        this.loadingJuni.animations.add('loadingJuni', ["loading_juni_piyo_01", "loading_juni_piyo_02", "loading_juni_piyo_03", "loading_juni_piyo_02"], 7, true);
        this.loadingJuni.animations.play('loadingJuni');

        // this.reloadBtn = this.game.add.button(562, 410, ResourceKey.PRELOAD_RESOURCE, this._reload.bind(this), this, "reloding_btn_off", "reloding_btn_off", "reloding_btn_on");
        // this.reloadBtn.visible = false;



        //QUEUE ADD FUNCTION
        let fn;
        for (let i = 0; i < this.queue.length; i++) {
            fn = this.queue[i];
            if( typeof(fn) == 'function') fn();
        }



        let cc = document.getElementById('loading');
        // console.log(cc);
        if(cc) document.body.removeChild(cc);
        // console.log(document.body);


        //DATA LOAD
        this.game.load.onLoadStart.add(this._loadStart, this);
        this.game.load.onFileComplete.add(this._fileComplete, this);
        this.game.load.onLoadComplete.add(this._loadComplete, this);
        this.game.load.onFileError.addOnce(this._loadError, this);

        if(! this.game.device.desktop && this.game.device.fullScreen)
            this.game.input.onTap.add(ScreenManager.instance.fullScreen, this);


    }


    create() {
        this.state.remove('Boot');
        this.game.clearBeforeRender = false;

    }

    _loadStart() {
        // console.log( '[GamePreloader] loadStart' );
    }
    _fileComplete() {
        // console.log( '[GamePreloader] _fileComplete' );
    }
    _loadComplete() {
        // if(this.ready)
        this.state.start('Main', true, false);
        // console.log( '[GamePreloader] _loadComplete' );

    }
    _loadError() {
        if(! window.navigator.onLine) {
            this._networkError();
            return;
        }

        this.fileErrorImg.visible = true;
        // this.reloadBtn.visible = true;
        this.loadingJuni.animations.stop('juni');
        this.loadingJuni.visible = false;
        this.loadingCircle.visible = false;
        console.log( '[GamePreloader] _loadError' );
    }

    _reload() {
        // this.game.state.start('Preload', true, false);
        // this.init();
    }
    _networkError() {
        this.networkErrorImg.visible = true;
        console.log( '[GamePreloader] _networkError' );
    }


}