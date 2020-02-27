/**
 * Created by naver on 2017. 9. 13..
 */

import GameConfig from "../data/GameConfig";
import SoundAssetKey from "../data/SoundAssetKey";

export default class SoundManager{
    constructor(game) {
        SoundManager.instance = this;
        this._game = game;
        this._queue = {}     // key {key:Key , snd:soundObj}
    }

    intro() {

        if(GameConfig.INTRO_SND_PLAY)
        {
            GameConfig.CURRENT_GUIDE_SOUND = SoundAssetKey.GAME_INTRO;
            this.introSound(SoundAssetKey.GAME_INTRO, 0.8);
            GameConfig.INTRO_SND_PLAY = false;
        }
    }

    bgmStart() {
    /*    if(! GameConfig.POP_ENABLED && GameConfig.SOUND_ENABLED)
        {
            GameConfig.BGM_PLAYING = true;
            if(! SoundManager.instance._queue[SoundAssetKey.MAIN_BGM])
            {
                SoundManager.instance.play(SoundAssetKey.MAIN_BGM, true);


            }

            else
            {
                if(! SoundManager.instance._queue[SoundAssetKey.MAIN_BGM].snd.isPlaying)
                {

                    SoundManager.instance.bgmResume(SoundAssetKey.MAIN_BGM);
                }

            }
        }*/
    }

    introSound(key, volume) {
        if(! GameConfig.SOUND_ENABLED) return;
        this._queue[key] = {
            snd: this._game.make.audio(key, volume),
            volume: volume,
        };

        this._queue[key].snd.play();
        this._queue[key].snd.onStop.add(this.bgmSoundStart, this);
    }

    bgmSoundStart(e = null) {

        console.log("bgmSoundStart")
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
        console.log("effectSound");
        this.effectSoundStop(SoundAssetKey.MAIN_BGM,0.8, true)
        // if(this._queue[key] === undefined) return;
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

    effectSoundStop(key, volume = 0.8, bgm= false) {

        console.log("effectSoundStop");
        if(this._queue[key])
        {
            if (this._queue[key].snd.isPlaying)
            {
                this._queue[key].snd.volume = volume;
            }
            else
            {
                if(bgm && key === SoundAssetKey.MAIN_BGM)
                this._queue[key].snd.play();
            }

        }
        else
        {

            if(bgm && key === SoundAssetKey.MAIN_BGM)
            {
                this.bgmSoundStart();
            }
        }

        // if(! GameConfig.BGM_PLAYING) this.bgmResume(SoundAssetKey.MAIN_BGM);
        /*  if(this.browserCheck()) return;
             else
             {
                 if(! GameConfig.BGM_PLAYING) this.bgmResume(SoundAssetKey.MAIN_BGM);
             }*/
        /* if(remove)
       {
           this._queue[key].snd.stop();
           return;
       }*/

     /*   SoundManager.instance.play(SoundAssetKey.MAIN_BGM, true);

        if(SoundManager.instance._queue[key])
        {
            if (SoundManager.instance._queue[key].snd.isPlaying) {
                SoundManager.instance._queue[key].snd.volume = volume;
            }
            if(key === SoundAssetKey.MAIN_BGM)
            {
                console.log(key)
                SoundManager.instance.play(key, true);
                if(this._queue[key])
                {
                    // this._queue[key].snd.resume();

                }

                else
                {
                    // SoundManager.instance.play(key, true);
                }
            }


        }*/

    }


    // SoundManager.instance.bgmResume(SoundAssetKey.MAIN_BGM);


    //BG-> FG 프리징 이슈로 ANDROID && NAVER APP일 경우만 'disableVisibilityChange' 활성화
    browserCheck() {
        return this._game.device.android && navigator.userAgent.indexOf('NAVER(inapp') !== -1;
    }

    allSoundPause(){

        this._game.sound.pauseAll();

    }


    _bgmPause(key) {

     /*   if(this._queue[key])
        {
            this._queue[key].snd.pause();
            GameConfig.BGM_ENABLED  = false;
            GameConfig.BGM_PLAYING = false;
        }
*/
    }

    _bgmResume(key) {

     /*   if(this._queue[key] === undefined) return;
        if(this._queue[key].snd.isPlaying || ! GameConfig.SOUND_ENABLED  || ! GameConfig.BGM_ENABLED) return;
        if(GameConfig.BGM_ENABLED && GameConfig.SOUND_ENABLED)
        {

            if(this._queue[key])
            {
                this._queue[key].snd.resume();

            }

            else
            {
                SoundManager.instance.play(key, true);
            }

            GameConfig.BGM_PLAYING = true;
        }
*/

    }



    /**
     *
     * @param key : 사운드 키
     * @param loop : 계속 제생인지
     * @param volume : 볼륨은 몇인지
     * @param nextKey : 재생하고 다음에 제생할 사운드
     * @param isCompliteRemove : 재생완료후 삭제할지
     * @returns {*}
     */
    play(key, loop = false, volume = 0.7, nextKey=null, isCompleteRemove = false){
        // if(! GameConfig.SOUND_ENABLED) return;

        //var snd = null;
        // console.log("play",key);

/*
        if(this._queue[key]){
            this._queue[key].snd.play();

        }else{
            // console.log(key, volume);
            //let snd = this._game.add.audio(key, volume);
            this._queue[key] = {snd:this._game.make.audio(key, volume), loop:loop, volume:volume, nextKey:nextKey, isCompleteRemove:isCompleteRemove}

            //console.log(key)

            if(loop){
                this._queue[key].snd.loopFull();
            }else{
                if(isCompleteRemove || nextKey) {
                    // console.log("Event 추가 ", this._queue[key].snd);
                    this._queue[key].snd.onStop.add(this.onCompleteSound, this);

                }

                this._queue[key].snd.play();
                //
            }
        }*/
    }

    onCompleteSound(e){
        // console.log("Complite~~", e, e.key);

        let key = e.key;
        //
        if(this._queue[key]){
            // console.log(this._queue[key].nextKey);
            //
            if(this._queue[key].nextKey){
                this.play(this._queue[key].nextKey, false, 0.8, null, false)
            }
            //
            //    //this._queue[key].snd.onStop.dispose();
            //    //this._queue[key].snd.onStop.remove();
            //    this.remove(key);
            //
            if(this._queue[key].isCompleteRemove){
                this.remove(key)
            }
        }
    }

    stop(key){
        //if(this._queue[key]){
        //    this._queue[key].snd.stop();
        //}
        this.remove(key)
    }

    remove(key){
        // console.log("remove", key);
        if(!key){
            //throw "not key~~"
            // return;
        }

        if(this._queue[key]){
            // this._queue[key].snd.onStop.dispose();
            // this._queue[key].snd.destroy();
            // this._queue[key].snd = null;
            // delete this._queue[key];
        }
    }


}

SoundManager.instance = null;
