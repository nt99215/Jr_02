import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";
import SoundAssetKey from "../../data/SoundAssetKey";

export default class PreloadResource{
    constructor(game) {
        PreloadResource.instance = this;
        this.game = game;
    }

    preload() {

        this.game.load.atlasJSONHash(AssetKey.INTRO_ASSET, 'asset/game/image/intro-asset.png', 'asset/game/image/intro-asset.json');
        this.game.load.atlasJSONHash( AssetKey.BTN_ASSET, 'asset/game/image/game-main-button.png', 'asset/game/image/game-main-button.json');
        this.game.load.atlasJSONHash(AssetKey.DEFAULT_GAME_ATLAS, 'asset/game/image/default_gameAtlas.png', 'asset/game/image/default_gameAtlas.json');
        this.game.load.atlasJSONHash(AssetKey.TUTOR_ASSET, 'asset/game/image/tutor-asset.png', 'asset/game/image/tutor-asset.json');
        this.game.load.atlasJSONHash(AssetKey.TUTOR_TEXT_ASSET, 'asset/game/image/tutor-text-asset.png', 'asset/game/image/tutor-text-asset.json');
        this.game.load.atlasJSONHash(AssetKey.RESULT_ASSET, 'asset/game/image/ending-asset.png', 'asset/game/image/ending-asset.json');

        let extension = ".mp3";

        if( this.game.device.desktop )
        {
            GameConfig.CURRENT_DEVICE = 'desktop';
        }
        else
        {
            if( this.game.device.android )
            {
                extension = ".ogg";
                GameConfig.CURRENT_DEVICE = 'android';
            }
            else
            {
                extension = ".m4a";
                GameConfig.CURRENT_DEVICE = 'ios';
            }

        }

        /**
         * tutorial Sound
         * @type {string}
         */

        const gameIntro = 'asset/game/sound/' + SoundAssetKey.GAME_INTRO + extension;

        const tutorNarr_1 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_1 + extension;
        const tutorNarr_2 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_2 + extension;
        const tutorNarr_3 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_3 + extension;
        const tutorNarr_4 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_4 + extension;
        const tutorNarr_5 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_5 + extension;


        const result_good = 'asset/game/sound/' + SoundAssetKey.RESULT_GOOD + extension;
        const result_great = 'asset/game/sound/' + SoundAssetKey.RESULT_GREAT + extension;
        const infoSnd = 'asset/game/sound/' + SoundAssetKey.INFO_SND + extension;

        const effectOxy = 'asset/game/sound/' + SoundAssetKey.EFFECT_OXY + extension;
        const effectOxy_1 = 'asset/game/sound/' + SoundAssetKey.EFFECT_OXY_1 + extension;
        const effectOxyNew = 'asset/game/sound/' + SoundAssetKey.EFFECT_OXY_NEW + extension;
        const effectFish = 'asset/game/sound/' + SoundAssetKey.EFFECT_FISH + extension;
        const effectJelly = 'asset/game/sound/' + SoundAssetKey.EFFECT_JELLY + extension;
        const effectShark = 'asset/game/sound/' + SoundAssetKey.EFFECT_SHARK + extension;
        const effectSharkNew = 'asset/game/sound/' + SoundAssetKey.EFFECT_SHARK_NEW + extension;
        const effectClear = 'asset/game/sound/' + SoundAssetKey.EFFECT_CLEAR + extension;
        const touchJelly = 'asset/game/sound/' + SoundAssetKey.TOUCH_JELLY + extension;
        const touchShark = 'asset/game/sound/' + SoundAssetKey.TOUCH_SHARK + extension;
        const touchFish = 'asset/game/sound/' + SoundAssetKey.TOUCH_FISH + extension;
        const clearSnd = 'asset/game/sound/' + SoundAssetKey.CLEAR_SND + extension;


        const basicTouchSnd = 'asset/game/sound/' + SoundAssetKey.BASIC_TOUCH_SOUND + extension;
        const mainBgm = 'asset/game/sound/' + SoundAssetKey.MAIN_BGM + extension;
        const btnSnd = 'asset/game/sound/' + SoundAssetKey.BUTTON_SOUND + extension;
        const startSnd = 'asset/game/sound/' + SoundAssetKey.START_SOUND + extension;
        const selectedSnd = 'asset/game/sound/' + SoundAssetKey.SELECTED_SOUND + extension;

        /**
         *
         * effect Sound (add)
         */
        const sndClose = 'asset/game/sound/' + SoundAssetKey.SND_CLOSE + extension;
        const sndNext = 'asset/game/sound/' + SoundAssetKey.SND_NEXT + extension;
        const sndOff = 'asset/game/sound/' + SoundAssetKey.SND_OFF + extension;
        const sndOn = 'asset/game/sound/' + SoundAssetKey.SND_ON + extension;
        const sndPrev = 'asset/game/sound/' + SoundAssetKey.SND_PREV + extension;
        const sndSkip = 'asset/game/sound/' + SoundAssetKey.SND_SKIP + extension;
        const sfx_retry = 'asset/game/sound/' + SoundAssetKey.RESTART_SOUND + extension;


        /**
         * TUTOR NARRATION
         *@type {SoundQueue}
         * @private
         */
        this.game.load.audio( SoundAssetKey.GAME_INTRO, gameIntro);

        this.game.load.audio( SoundAssetKey.tutorNarr_1, tutorNarr_1);
        this.game.load.audio( SoundAssetKey.tutorNarr_2, tutorNarr_2);
        this.game.load.audio( SoundAssetKey.tutorNarr_3, tutorNarr_3);
        this.game.load.audio( SoundAssetKey.tutorNarr_4, tutorNarr_4);
        this.game.load.audio( SoundAssetKey.tutorNarr_5, tutorNarr_5);

        /**
         * RESULT PAGE
         * @type {SoundQueue}
         * @private
         */
        this.game.load.audio( SoundAssetKey.RESULT_GOOD, result_good);
        this.game.load.audio( SoundAssetKey.RESULT_GREAT, result_great);

        /**
         * EFFECT SOUND
         * @type {SoundQueue}
         * @private
         */

        this.game.load.audio( SoundAssetKey.BASIC_TOUCH_SOUND, basicTouchSnd);
        this.game.load.audio( SoundAssetKey.BUTTON_SOUND, btnSnd);
        this.game.load.audio( SoundAssetKey.MAIN_BGM, mainBgm);
        this.game.load.audio( SoundAssetKey.SELECTED_SOUND, selectedSnd);
        this.game.load.audio( SoundAssetKey.START_SOUND, startSnd);

        this.game.load.audio( SoundAssetKey.SND_CLOSE, sndClose);
        this.game.load.audio( SoundAssetKey.SND_NEXT, sndNext);
        this.game.load.audio( SoundAssetKey.SND_OFF, sndOff);
        this.game.load.audio( SoundAssetKey.SND_ON, sndOn);
        this.game.load.audio( SoundAssetKey.SND_PREV, sndPrev);
        this.game.load.audio( SoundAssetKey.SND_SKIP, sndSkip);

        this.game.load.audio( SoundAssetKey.INFO_SND, infoSnd);
        this.game.load.audio( SoundAssetKey.CLEAR_SND, clearSnd);
        this.game.load.audio( SoundAssetKey.EFFECT_OXY, effectOxy);
        this.game.load.audio( SoundAssetKey.EFFECT_OXY_1, effectOxy_1);
        this.game.load.audio( SoundAssetKey.EFFECT_OXY_NEW, effectOxyNew);
        this.game.load.audio( SoundAssetKey.EFFECT_FISH, effectFish);
        this.game.load.audio( SoundAssetKey.EFFECT_JELLY, effectJelly);
        this.game.load.audio( SoundAssetKey.EFFECT_SHARK, effectShark);
        this.game.load.audio( SoundAssetKey.EFFECT_SHARK_NEW, effectSharkNew);
        this.game.load.audio( SoundAssetKey.EFFECT_CLEAR, effectClear);
        this.game.load.audio( SoundAssetKey.TOUCH_JELLY, touchJelly);
        this.game.load.audio( SoundAssetKey.TOUCH_SHARK, touchShark);
        this.game.load.audio( SoundAssetKey.TOUCH_FISH, touchFish);
        this.game.load.audio( SoundAssetKey.RESTART_SOUND, sfx_retry);


    }


}


PreloadResource.instance = null;