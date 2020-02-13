import SeparateAnimation from "../object/SeparateAnimation";
import AssetKey from "../../data/AssetKey";
import TutorialAssetKey from "../../data/TutorialAssetKey";
import FishTweener from "../object/FishTweener";

let tweenArr = [];
let speedArr = [800, 1500, 1200, 1700, 1600, 1800, 2000];
export default class TutorialChapter_3 extends Phaser.Group{
    constructor(game) {
        super(game);

        this._game = game;
        this._gameGroup = game.add.group();
    }

    _init() {

        this._gameGroup.add(this._game.make.image(182, 30, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUDLARGE));
        this._gameGroup.add(this._game.make.image(573, 177, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUDTAILLARGE));
        this._gameGroup.add(this._game.make.image(266, 54, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_TEXT_02));

        let xTerm = -30;
        let yTerm = 25;

        this.pong = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_PONG_02, 336 + xTerm, 262 + yTerm, 1, 4, '', 2, 10, true);
        let tween1 = new FishTweener(this._game, this.pong, 'yy', 10, speedArr[0], 100, true);
        tweenArr.push(tween1);
        this._gameGroup.addChildAt(this.pong, 0);

        this.fish1 = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_04, 216 + xTerm, 270 + yTerm, 1, 3, '', 2, 5, true);
        this.tween = this._game.add.tween(this.fish1).to({x:parseInt(this.fish1.x + 5)}, 240, Phaser.Easing.Linear.Out, true, 240, 100, true)
        this._gameGroup.addChild(this.fish1);

        this.jelly = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_JELLY_1, 680 + xTerm, 477, 1, 3, '', 2, 6, true);
        this._gameGroup.addChild(this.jelly);

        this.shark = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_SHARK_1, 564 + xTerm, 221 + yTerm, 1, 3, '', 2, 5, true);
        this._gameGroup.addChild(this.shark);

    }

    _destroy() {

        for(let i = 0; i<tweenArr.length; i++)
        {
            tweenArr[i]._destroy();
        }
        this.tween.stop(true);
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this.removeChildren(0, this.length);

    }

}