import Boot from "./loader/state/Boot";
import Preloader from "./loader/state/Preloader";
import Main from "./loader/state/Main";
import GameInfo from "./loader/const/GameInfo";
import SoundManager from "./manager/SoundManager";
import LoadManager from "./loader/manager/LoadManager";
import ScreenManager from "./loader/manager/ScreenManager";

export default class index extends Phaser.Game {
    constructor(targetElementId, w, h, debug = false, from) {
        let cfg = {
            width: w,
            height: h,
            renderer: Phaser.AUTO,
            parent: targetElementId,
            multiTexture: true,
            enableDebug: debug
        };

        GameInfo.GAME_WIDTH = w;
        GameInfo.GAME_HEIGHT = h;
        GameInfo.GAME_DEBUG = debug;
        GameInfo.GAME_RENDER_TYPE = cfg.renderer;

        super(cfg);

        new SoundManager(this);
        new LoadManager(this);
        let sm = new ScreenManager(this);
        sm.fullScreen();



        this.state.add('Boot', Boot, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('Main', Main, false);
        this.state.start('Boot');



    }

}

window.nts = {};
window.nts.index = new index('main_doc', 1280, 720);