import SoundManager from "../../manager/SoundManager";
import SoundAssetKey from "../../data/SoundAssetKey";
import AssetKey from "../../data/AssetKey";

let thisAssetKey;
let thisAssetName;
let thisRate;
let thisLoop;

let thisAni;

export default class SeparateAnimation extends Phaser.Image{
    constructor(game, assetKey, assetName, xPos, yPos, start, stop, suffix, zeroPad, desireRate = 10, loop = true) {
        super(game, 0, 0, assetKey);

        //this.anchor.setTo(0.5, 0.5);
        thisAssetKey = assetKey;
        thisAssetName = assetName;
        thisRate = desireRate;
        thisLoop = loop;
        thisAni = this.animations.add(assetName, Phaser.Animation.generateFrameNames(assetName, start, stop, suffix, zeroPad),  desireRate, loop);
        this.animations.play(assetName, desireRate, loop);
        this.x = xPos;
        this.y = yPos;

    }

    _stop() {
        thisAni.stop(null, true);
    }

    _play() {
        thisAni.play();
    }

    _destroy() {
        this.animations.destroy();
    }


}