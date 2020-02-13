import SoundManager from "./SoundManager";
import GameConfig from "../data/GameConfig";
import SoundAssetKey from "../data/SoundAssetKey";

export default class SceneManager {
    constructor() {
        SceneManager.instance = this;
        this.scene = null;
        // this._game =game;
    }

    _restore() {
        this._sceneCheck();

        if(GameConfig.SCENE_STATE === 'mainScene')
        {
            GameConfig.IN_GAME = true;
            this.scene._objectReplay();
        }
        else
        {

            this.scene._init();
        }

        GameConfig.POP_ENABLED = false;
        GameConfig.MAIN_CONTROLLER._btnEnabled();
        SoundManager.instance.bgmResume(SoundAssetKey.MAIN_BGM);

    }

    _destroy() {

        this._sceneCheck();

        SoundManager.instance.bgmPause(SoundAssetKey.MAIN_BGM);

        if(GameConfig.SCENE_STATE === 'mainScene')
        {
            this.scene._objectPause();
        }
        else
        {
            this.scene._destroy();
        }

        GameConfig.MAIN_CONTROLLER._btnDisabled();
    }

    _sceneCheck() {
        // console.log(GameConfig.CURRENT_SCENE)
        this.scene = GameConfig.CURRENT_SCENE;
    }

}