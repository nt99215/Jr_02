import SeparateAnimation from "../object/SeparateAnimation";
import AssetKey from "../../data/AssetKey";
import TutorialAssetKey from "../../data/TutorialAssetKey";
import FishTweener from "../object/FishTweener";

let tweenArr = [];
let speedArr = [800, 1500, 500, 700, 1600, 1800, 2000];
export default class TutorialChapter_4 extends Phaser.Group{
    constructor(game) {
        super(game);

        this._game = game;
        this._gameGroup = game.add.group();
    }

    _init() {

        this._gameGroup.add(this._game.make.image(182, 30, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUDLARGE));
        this._gameGroup.add(this._game.make.image(473, 177, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUDTAILLARGE));
        this._gameGroup.add(this._game.make.image(266, 54, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_TEXT_03));

        this.pong = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_PONG_03, 195, 213, 1, 3, '', 2, 4, true);
        this._gameGroup.addChild(this.pong);
        let tween1 = new FishTweener(this._game, this.pong, 'yy', 10, speedArr[0], 100, true);
        tweenArr.push(tween1);

        this.fish = this._gameGroup.add(this._game.make.image(506, 256, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_06));
        this.fish.anchor.setTo(0.5, 0.5);
        this.fish.x += this.fish.width/2;
        this.fish.y += this.fish.height/2;
        this.fish.scale.x *=-1;
        let tween2 = new FishTweener(this._game, this.fish, 'xx', 100, speedArr[1], 0, false);
        tweenArr.push(tween2);

        this.oxy1 = this._gameGroup.add(this._game.make.image(518, 356, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_OXY_03_1));
        let tween3 = new FishTweener(this._game, this.oxy1, 'yy', 50, speedArr[2], 100, true);
        tweenArr.push(tween3);

        this.oxy2 = this._gameGroup.add(this._game.make.image(670, 268, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_OXY_03_2));
        let tween4 = new FishTweener(this._game, this.oxy2, 'yy', 50, speedArr[3], 80, true);
        tweenArr.push(tween4);

        this.submarine = this._gameGroup.add(this._game.make.image(637, 214, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_SUB));
        this.submarine.y += 10;
        let tween5 = new FishTweener(this._game, this.submarine, 'yy', 20, speedArr[4], 80, true);
        tweenArr.push(tween5);




    }

    _destroy() {

        for(let i = 0; i<tweenArr.length; i++)
        {
            tweenArr[i]._destroy();
        }
        this._gameGroup.removeChildren(0, this._gameGroup.length);

    }

}