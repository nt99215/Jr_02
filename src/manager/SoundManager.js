/**
 * Created by naver on 2020. 02. 27.
 */

import GameConfig from "../data/GameConfig";
import SoundAssetKey from "../data/SoundAssetKey";

export default class SoundManager{
    constructor(game) {
        SoundManager.instance = this;
        this._game = game;
        this._queue = {};
    }

    intro() {

        if(GameConfig.INTRO_SND_PLAY)
        {
            GameConfig.CURRENT_GUIDE_SOUND = SoundAssetKey.GAME_INTRO;
            this.introSound(SoundAssetKey.GAME_INTRO, 0.8);
            GameConfig.INTRO_SND_PLAY = false;
        }
    }

    introSound(key, volume) {
        if(! GameConfig.SOUND_ENABLED) return;
        this._queue[key] = {
            snd: this._game.make.audio(key, volume),
            volume: volume,
        };

        this._queue[key].snd.play();
        this._queue[key].snd.onStop.add(this.introClose, this);
    }

    introClose() {
        this.effectSoundStop(SoundAssetKey.MAIN_BGM, 0.8, true);
    }

    bgmSoundStart(e = null) {

        if(! GameConfig.SOUND_ENABLED) return;
        let key = SoundAssetKey.MAIN_BGM;
        let volume = 0.8;
        this._queue[key] = {
            snd: this._game.make.audio(key, volume),
            volume: volume,
        };

        this._queue[key].snd.loopFull();
        this._queue[key].snd.play();

    }

    effectSound(key, volume = 0.8) {

        if(! GameConfig.SOUND_ENABLED) return;

        if (this._queue[key])
        {

            if(this._queue[key].snd.isPlaying)
            {
                this._queue[key].snd.stop();
            }
        }
        else
        {
            this._queue[key] = {
                snd: this._game.make.audio(key, volume),
                volume: volume,
            }
        }

        this._queue[key].snd.play();
    }

    effectSoundStop(key, volume = 0.8, bgm= false, remove = false) {

        if(this._queue[key])
        {
            if (this._queue[key].snd.isPlaying)
            {
                if(remove)
                {
                    this._queue[key].snd.stop();
                    return;
                }
                this._queue[key].snd.volume = volume;
            }
            else
            {
                if(bgm && key === SoundAssetKey.MAIN_BGM) this._queue[key].snd.play();
            }
        }
        else
        {
            if(bgm && key === SoundAssetKey.MAIN_BGM) this.bgmSoundStart();
        }

    }


    //BG-> FG 프리징 이슈로 ANDROID && NAVER APP일 경우 활성화
    browserCheck() {
        return this._game.device.android && navigator.userAgent.indexOf('NAVER(inapp') !== -1;
    }

    allSoundPause(){
        this._game.sound.pauseAll();
    }

}

SoundManager.instance = null;
