import AssetKey from "../../data/AssetKey";
import TutorialAssetKey from "../../data/TutorialAssetKey";
import FishTweener from "../object/FishTweener";
import SeparateAnimation from "../object/SeparateAnimation";

let tweenArr = [];
let speedArr = [800, 1500, 1200, 2000, 1600, 1800, 2000];

export default class TutorialChapter_5 extends Phaser.Group{
    constructor(game) {
        super(game);

        this._game = game;
        this._gameGroup = game.add.group();
    }

    _init() {

        this._gameGroup.add(this._game.make.image(181, 30, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUD));
        this._gameGroup.add(this._game.make.image(733, 125, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUDTAIL));
        this._gameGroup.add(this._game.make.image(339, 54, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_TEXT_04));

        this.pong = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_PONG_04, 374, 180, 1, 3, '', 2, 5, true);
        this._gameGroup.addChild(this.pong);
        this.tween = this._game.add.tween(this.pong).to({y:this.pong.y - 10}, 300, Phaser.Easing.Linear.Out, true, 0, 100, true);

        this.shark = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_SHARK_2, 795, 196, 1, 2, '', 2, 5, true);
        this._gameGroup.addChild(this.shark);
        this.tween = this._game.add.tween(this.shark).to({y:this.shark.y - 15}, 400, Phaser.Easing.Linear.Out, true, 0, 100, true);

        this.fish1 = this._gameGroup.add(this._game.make.image(152, 254, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_07));
        this.fish1.anchor.setTo(0.5, 0.5);
        this.fish1.x += this.fish1.width/2;
        this.fish1.y += this.fish1.height/2;
        this.fish1.scale.x *=-1;
        let tween3 = new FishTweener(this._game, this.fish1, 'xx', 200, speedArr[2], 0, false);
        tweenArr.push(tween3);

        this.fish2 = this._gameGroup.add(this._game.make.image(721, 501, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_03));
        this.fish2.anchor.setTo(0.5, 0.5);
        this.fish2.x += this.fish2.width/2;
        this.fish2.y += this.fish2.height/2;
        this.fish2.scale.x *=-1;
        let tween4 = new FishTweener(this._game, this.fish2, 'xx', 200, speedArr[3], 0, false);
        tweenArr.push(tween4);

        this.jelly = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_JELLY_2, 139, 393, 1, 3, '', 2, 5, true);
        this._gameGroup.addChild(this.jelly);

        this.twinkle = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_TWINKLE, 325, 177, 1, 2, '', 2, 5, true);
        this._gameGroup.addChild(this.twinkle);


    }

    _destroy() {

        for(let i = 0; i<tweenArr.length; i++)
        {
            tweenArr[i]._destroy();
        }
        this._gameGroup.removeChildren(0, this._gameGroup.length);

    }

}