import AssetKey from "../../data/AssetKey";
import TutorialAssetKey from "../../data/TutorialAssetKey";
import FishTweener from "../object/FishTweener";
import SeparateAnimation from "../object/SeparateAnimation";

let tweenArr = [];
let speedArr = [800, 1500, 2000, 1700];
export default class TutorialChapter_1 extends Phaser.Group{
    constructor(game) {
        super(game);

        this._game = game;
        this._gameGroup = game.add.group();
    }

    _init() {

       this._oxyGenerate();
       this._gameGroup.add(this._game.make.image(181, 30, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUD));
       this._gameGroup.add(this._game.make.image(733, 125, AssetKey.TUTOR_ASSET, TutorialAssetKey.TEXTCLOUDTAIL));
       this._gameGroup.add(this._game.make.image(223, 54, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_TEXT_01));

        this.pong = new SeparateAnimation(this._game, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_PONG_00, 496, 179, 1, 2, '', 2, 5, true);
        this._gameGroup.addChild(this.pong);
        let tween1 = new FishTweener(this._game, this.pong, 'yy', 20, speedArr[0], 100, true);
        tweenArr.push(tween1);

       this.fish1 = this._gameGroup.add(this._game.make.image(186, 291, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_02));
       let tween2 = new FishTweener(this._game, this.fish1, 'xx', 300, speedArr[1], 0, false);
       tweenArr.push(tween2);

       this.fish2 = this._gameGroup.add(this._game.make.image(898, 384, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_05));
       let tween3 = new FishTweener(this._game, this.fish2, 'xx', 200, speedArr[2], 0, false);
       tweenArr.push(tween3);

       this.fish3 = this._gameGroup.add(this._game.make.image(1027, 275, AssetKey.TUTOR_ASSET, TutorialAssetKey.IMG_FISH_01));
       let tween4 = new FishTweener(this._game, this.fish3, 'xx', 300, speedArr[3], 0, false);
       tweenArr.push(tween4);

    }

    _oxyGenerate() {

        let xPos = [471, 431, 387, 455, 418, 840, 820, 850, 790];
        let yPos = [194, 275, 331, 353, 404, 209, 291, 354, 400];
        let radius = [13, 30, 12, 25, 5, 8, 28, 10, 24];
        let alp = [0.8, 0.7, 0.5, 0.5, 0.8, 0.6, 0.5, 0.7, 0.7];
        for(let i = 0; i<xPos.length; i++)
        {

            this.oxy = new Phaser.Graphics(this._game);
            this.oxy.beginFill(0x86dcfe, 1);
            this.oxy.drawCircle(0, 0, radius[i]);
            this.oxy.endFill();

            this.oxy.x = xPos[i];
            this.oxy.y = yPos[i] + 100;
            this.oxy.alpha = alp[i];
            this._gameGroup.addChild(this.oxy);
            this._game.add.tween(this.oxy).to({y: 100, alpha:0}, alp[i] * 3000, Phaser.Easing.Linear.Out, true, 0, 100, false);

        }
    }

    _destroy() {

        for(let i = 0; i<tweenArr.length; i++)
        {
            tweenArr[i]._destroy();
        }
        this._gameGroup.removeChildren(0, this._gameGroup.length);

    }

}