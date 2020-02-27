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

        window.onblur = () => {
            if(this._appCheck())
            {
                GameConfig.SOUND_ENABLED = false;
                SoundManager.instance.effectSoundStop(SoundAssetKey.MAIN_BGM, GameConfig.MUTE_SOUND_VOLUME);
                SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, GameConfig.MUTE_SOUND_VOLUME, false);
                console.log('focusLoss~');
            }

        };
        window.onfocus = () => {
            if(this._appCheck()) {
                GameConfig.SOUND_ENABLED = true;
                SoundManager.instance.effectSoundStop(SoundAssetKey.MAIN_BGM, 0.8, true);
                console.log('focusGain');
            }
        };

      /* this.game.focusLoss = () => {
           if(this._appCheck())
           {
               GameConfig.SOUND_ENABLED = false;
               SoundManager.instance.effectSoundStop(SoundAssetKey.MAIN_BGM, GameConfig.MUTE_SOUND_VOLUME);
               SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, GameConfig.MUTE_SOUND_VOLUME, false);
               console.log('focusLoss~');
           }

       };
       this.game.focusGain = () => {
           if(this._appCheck()) {
               GameConfig.SOUND_ENABLED = true;
               SoundManager.instance.effectSoundStop(SoundAssetKey.MAIN_BGM, 0.8, true);
               console.log('focusGain');
           }
       };*/

    }

    _appCheck() {
        if (this.game.device.android && navigator.userAgent.indexOf('NAVER(inapp') !== -1) return true;
        else return false;
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