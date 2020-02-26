import ResourceKey from "../const/ResourceKey";
import SoundManager from "../../manager/SoundManager";
import SoundAssetKey from "../../data/SoundAssetKey";
import GameConfig from "../../data/GameConfig";
import GameInfo from "../const/GameInfo";

window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

export default class Boot extends Phaser.State {
    init(...args) {
        this.game.stage.backgroundColor = 0x0000;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.input.maxPointers = 1;
        //BG-> FG 프리징 이슈로 ANDROID && NAVER APP일 경우만 'disableVisibilityChange' 활성화
        this.game.stage.disableVisibilityChange = this.game.device.android && navigator.userAgent.indexOf('NAVER(inapp') !== -1;

        this.game.scale.refresh();

        this.game.time.advancedTiming = true;
        this.game.time.desiredFps = 60;
        this.game.time.slowMotion = 1.0;
        // console.log('BOOT');
    }

    preload() {
        this.game.load.image(ResourceKey.BOOT_LOADING_BACK, './asset/game/image/preLoadingBg.png');
       this.game.focusLoss = () => {
           SoundManager.instance.bgmPause(SoundAssetKey.MAIN_BGM);
           SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, true);
           // console.log('focusLoss');
       };
       this.game.focusGain = () => {
           SoundManager.instance.bgmResume(SoundAssetKey.MAIN_BGM);
           // console.log('focusGain');
       };

    }

    create() {
        // ResourceKey.data = this.game.cache.getJSON(ResourceKey.PRELOAD_RESOURCE);
        this.loadLoadingImg();

    }

    loadLoadingImg(){

        this.game.load.atlasJSONHash(ResourceKey.PRELOAD_RESOURCE, './asset/game/image/loading.png', './asset/game/image/loading.json');
        this.game.load.onLoadComplete.addOnce(()=> {
            setTimeout(()=> {
                this.game.state.start('Preloader', true, false);
            }, 500);
        }, this);

        this.game.load.start();
    }

    render() {
    }

    update() {

    }




}