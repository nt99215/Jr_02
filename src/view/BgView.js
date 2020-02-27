import AssetKey from "../data/AssetKey";
import MouseEffect from "../ui/MouseEffect";
import GameConfig from "../data/GameConfig";
import SoundManager from "../manager/SoundManager";
import SoundAssetKey from "../data/SoundAssetKey";

export default class BgView{
    constructor(game) {
        this._game = game;
        this._gameGroup = this._game.add.group();

        this.bg = new Phaser.Image(this._game, 0, 0,  AssetKey.DEFAULT_GAME_ATLAS, AssetKey.BG_FIELD);
        this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add(this.bgClick, this);
        this._gameGroup.addChild(this.bg);

    }

    bgClick() {
        if(! GameConfig.IN_GAME) return;
        SoundManager.instance.effectSound(SoundAssetKey.EFFECT_OXY_NEW);
        new MouseEffect(this._game, this._game.input.x, this._game.input.y, 50, 1);

    }


}