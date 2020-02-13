import SeparateAnimation from "../object/SeparateAnimation";
import AssetKey from "../../data/AssetKey";
import TutorialAssetKey from "../../data/TutorialAssetKey";
import FishTweener from "../object/FishTweener";

let tweenArr = [];
let speedArr = [800, 1500, 2000, 1700, 1600, 1800, 2000];
export default class TutorialChapter_2 extends Phaser.Group{
    constructor(game) {
        super(game);

        this._game = game;
        this._gameGroup = game.add.group();
    }

    _init() {

        this._gameGroup.add(this._game.make.image(182, 30, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUDLARGE));
        this._gameGroup.add(this._game.make.image(573, 177, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUDTAILLARGE));
        this._gameGroup.add(this._game.make.image(266, 54, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_TEXT_02));
        this.pong = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_PONG_01, 389, 247, 1, 4, '', 2, 5, true);
        this._gameGroup.addChild(this.pong);


        this.fish0 = this._gameGroup.add(this._game.make.image(823, 486, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_01));
        this.fish0.x +=200
        let tween2 = new FishTweener(this._game, this.fish0, 'xx', 400, speedArr[1], 0, false);
        tweenArr.push(tween2);

        this.fish1 = this._gameGroup.add(this._game.make.image(154, 430, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_02));
        let tween3 = new FishTweener(this._game, this.fish1, 'xx', 300, speedArr[2], 0, false);
        tweenArr.push(tween3);

        this.fish2 = this._gameGroup.add(this._game.make.image(976, 355, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_05));
        this.fish2.x +=100;
        let tween4 = new FishTweener(this._game, this.fish2, 'xx', 150, speedArr[3], 0, false);
        tweenArr.push(tween4);

        this.oxy0 = this._gameGroup.add(this._game.make.image(858, 254, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_OXY_03));
        let tween5 = new FishTweener(this._game, this.oxy0, 'yy', 50, speedArr[4], 100, true);
        tweenArr.push(tween5);

        this.oxyAni1 = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_OXY_01_1, 262, 228, 1, 2, '', 1,5, true);
        let tween6 = new FishTweener(this._game, this.oxyAni1, 'yy', 60, speedArr[5], 100, true);
        tweenArr.push(tween6);
        this._gameGroup.addChild(this.oxyAni1);
        this.oxyAni2 = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_OXY_02_1, 759, 303, 1, 2, '', 1,5, true);
        let tween7 = new FishTweener(this._game, this.oxyAni2, 'yy', 40, speedArr[6], 100, true);
        tweenArr.push(tween7);
        this._gameGroup.addChild(this.oxyAni2);

    }

    _destroy() {

        for(let i = 0; i<tweenArr.length; i++)
        {
            tweenArr[i]._destroy();
        }
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this.removeChildren(0, this.length);

    }

}