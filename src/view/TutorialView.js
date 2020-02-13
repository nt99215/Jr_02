import AssetKey from "../data/AssetKey";
import GameConfig from "../data/GameConfig";
import SoundAssetKey from "../data/SoundAssetKey";
import SoundManager from "../manager/SoundManager";
import TutorialChapter_1 from "./tutorial/TutorialChapter_1";
import TutorialChapter_2 from "./tutorial/TutorialChapter_2";
import TutorialChapter_3 from "./tutorial/TutorialChapter_3";
import TutorialChapter_4 from "./tutorial/TutorialChapter_4";
import TutorialChapter_5 from "./tutorial/TutorialChapter_5";
import SceneManager from "../manager/SceneManager";

let chapter;
let num;
let total = 5;
let currentAudio;
export default class TutorialView extends Phaser.Group{
    constructor(game, parent) {
        super(game);

        this.assetKey = AssetKey.BTN_ASSET;
        this._game = game;
        this._gameGroup = this._game.add.group();
        // this._container = container;
        this._parent = parent;

        for(let i = 1; i<=5; i++)
        {
            this['_audio_' + i] = null;
            this['_audio_' + i] = game.add.audio(SoundAssetKey['tutorNarr_' + i], 0.7, false);
        }

        this.tutorial = [new TutorialChapter_1(this._game),
            new TutorialChapter_2(this._game),
            new TutorialChapter_3(this._game),
            new TutorialChapter_4(this._game),
            new TutorialChapter_5(this._game)]

        num = 1;

        this._createBg();
        this._createTutorial(num);
        this._createBtn();
        this._btnAlign(num);
        this._sndPlay(num);

    }

    _createBtn() {

        /**
         * PrevBtn
         * @type {Phaser.Image}
         */
        this.prevBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onPrev.bind(this), this, AssetKey.BTN_TUTORIAL_PREV_DEFAULT, AssetKey.BTN_TUTORIAL_PREV_DEFAULT, AssetKey.BTN_TUTORIAL_PREV_OVER));
        this.prevBtn.x = 24;
        this.prevBtn.y = this._game.height -this.prevBtn.height - 9;
        this.prevBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.SND_PREV, this.prevBtnSound, this.prevBtn)

        /**
         * NextBtn
         * @type {Phaser.Image}
         */
        this.nextBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onNext.bind(this), this, AssetKey.BTN_TUTORIAL_NEXT_DEFAULT, AssetKey.BTN_TUTORIAL_NEXT_DEFAULT, AssetKey.BTN_TUTORIAL_NEXT_OVER));
        this.nextBtn.x = this._game.width - this.nextBtn.width - 24;
        this.nextBtn.y = this._game.height -this.nextBtn.height - 9;
        this.nextBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.SND_NEXT, this.nextBtnSound, this.nextBtn)

        /**
         * SkipBtn
         * @type {Phaser.Image}
         */
        this.skipBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onSkip.bind(this), this, AssetKey.BTN_TUTORIAL_SKIP_DEFAULT, AssetKey.BTN_TUTORIAL_SKIP_DEFAULT, AssetKey.BTN_TUTORIAL_SKIP_OVER));
        this.skipBtn.x = this.nextBtn.x - this.skipBtn.width - 9;
        this.skipBtn.y = this._game.height -this.skipBtn.height - 9;
        this.skipBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.SND_SKIP, this.skipBtnSound, this.skipBtn)

        /**
         * StartBtn
         * @type {Phaser.Image}
         */
        this.startBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onStart.bind(this), this, AssetKey.BTN_TUTORIAL_START_DEFAULT, AssetKey.BTN_TUTORIAL_START_DEFAULT, AssetKey.BTN_TUTORIAL_START_OVER));
        this.startBtn.x = this._game.width - this.startBtn.width - 24;
        this.startBtn.y = this._game.height -this.startBtn.height - 9;
        this.startBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.START_SOUND, this.startBtnSound, this.startBtn)

    }

    _buttonSndPlay(sndKey, snd, btn) {
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);

    }


    _sndPlay(num) {
        if(! GameConfig.SOUND_ENABLED || num>total) return;
        let str ='_audio_' + num;
        currentAudio = this[str];
        currentAudio.play();
        currentAudio.onStop.add(this.onNext, this);

    }


    onPrev() {
        // this._game.time.events.removeAll();
        num -=1;
        this._removeImage();
        this._btnAlign(num);
        if(currentAudio)
        {

            currentAudio.onStop.removeAll();
            currentAudio.stop();
        }


        this._sndPlay(num);
        this._createTutorial(num);

    }


    onNext() {
        if(num<total)
        {

            num +=1;
            this._removeImage();
            this._btnAlign(num);
            if(currentAudio)
            {

                currentAudio.onStop.removeAll();
                currentAudio.stop();
            }


            this._sndPlay(num);
            this._createTutorial(num);

        }


    }

    onStart() {

        /**
         *
         * GAME START FROM TUTORIAL
         */


        this._disabledBtn();
        this._game.time.events.add(1300, enabled, this);

        function enabled() {

            SoundManager.instance.allSoundPause();
            if(GameConfig.SCENE_STATE === 'intro')
            {
                // this._container.dispatch();
                this._parent._create();
            }
            // this._game.time.events.removeAll();
            this._removeImage();
            this._destroy();
        }

    }

    onSkip() {

        this._disabledBtn();
        this._game.time.events.add(1000, enabled, this);

        function enabled() {
            SoundManager.instance.allSoundPause();
            // this._game.time.events.removeAll();
            this._removeImage();
            this._destroy();
        }

    }


    _btnAlign(num) {

        switch (num) {
            case 1:
            {

                this.prevBtn.visible = false;
                this.startBtn.visible = false;
                break;
            }
            case 2:
            {

                this.prevBtn.visible = true;
                break;
            }
            case 3:
            {
                this.nextBtn.visible = true;
                this.startBtn.visible = false;
                break;
            }

            case 4:
            {
                this.nextBtn.visible = true;
                this.startBtn.visible = false;
                break;
            }

            case 5:
            {
                this.nextBtn.visible = false;
                this.startBtn.visible = true;
                break;
            }

        }
    }

    _createBg() {

        let mainBg = new Phaser.Image(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.BG_FIELD);
        mainBg.inputEnabled = true;
        this._gameGroup.addChild(mainBg);

        let front = new Phaser.Image(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.BG_FRONT);
        front.y = this._game.height - front.height;
        this._gameGroup.addChild(front);
    }

    _createTutorial(currentNum) {

        chapter = this.tutorial[currentNum - 1];
        this._gameGroup.addChildAt(chapter, 1);
        chapter._init();

        //CAMERA SHAKE IT;
        if(currentNum == 3)
        {
            if(GameConfig.SHAKE_ENABLED)
            {
                this._game.camera.shake(0.01, 200);
            }

        }

    }

    _removeImage() {


        if(chapter)
        {
            chapter._destroy();
            chapter.destroy();
        }

    }


    _disabledBtn() {

        this.prevBtn.input.enabled = false;
        this.nextBtn.input.enabled = false;
        this.skipBtn.input.enabled = false;
        this.startBtn.input.enabled = false;

        if(currentAudio)
        {

            currentAudio.onStop.removeAll();
            currentAudio.stop();
        }

        this._game.time.events.removeAll();
    }

    _destroy() {

        // this._game.remove([this.skipBtn, this.prevBtn, this.nextBtn, this.startBtn, this.skipBtn], true);

        SceneManager.instance._restore();
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._gameGroup.destroy();

    }


}