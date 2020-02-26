import ResourceKey from "../const/ResourceKey";

window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

export default class Boot extends Phaser.State {
    init(...args) {
        this.game.stage.backgroundColor = 0x0000;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.input.maxPointers = 1;
        this.game.stage.disableVisibilityChange = true;

        this.game.scale.refresh();

        this.game.time.advancedTiming = true;
        this.game.time.desiredFps = 60;
        this.game.time.slowMotion = 1.0;
        // console.log('BOOT');
    }

    preload() {
        this.game.load.image(ResourceKey.BOOT_LOADING_BACK, './asset/game/image/preLoadingBg.png');
        // this.game.load.atlasJSONHash(ResourceKey.PRELOAD_RESOURCE, './asset/game/image/loading.png', './asset/game/image/loading.json')
    }

    create() {
        // ResourceKey.data = this.game.cache.getJSON(ResourceKey.PRELOAD_RESOURCE);
        this.loadLoadingImg();

    }

    loadLoadingImg(){

        this.game.load.atlasJSONHash(ResourceKey.PRELOAD_RESOURCE, './asset/game/image/loading.png', './asset/game/image/loading.json');
        this.game.load.onLoadComplete.addOnce(()=> {
            setTimeout(()=> {
                this.game.state.start('Preloader', true, false);
            }, 500);
        }, this);

        this.game.load.start();
    }

    render() {
    }

    update() {

    }




}