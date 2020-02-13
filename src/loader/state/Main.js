import GameInfo from "../const/GameInfo";
import ResultView from "../../view/ResultView";
import Intro from "../../view/Intro";
import ResourceKey from "../const/ResourceKey";
import LoadManager from "../manager/LoadManager";
import SubmarineAdventure from "../../SubmarineAdventure";

export default class Main extends Phaser.State {
    init(){
    }

    preload() {
    }

    render() {
    }

    update() {

    }

    create() {

        if(this.game.renderType === Phaser.HEADLESS){
            GameInfo.GAME_RENDER_TYPE = "Phaser.HEADLESS";
        }else if(this.game.renderType === Phaser.CANVAS){
            GameInfo.GAME_RENDER_TYPE = "Phaser.CANVAS";
        }else if(this.game.renderType === Phaser.WEBGL){
            GameInfo.GAME_RENDER_TYPE = "Phaser.WEBGL";
        }

        this.scene = this.game.add.group();
        this.mainContents = this.scene.add(new SubmarineAdventure(this.game, 0, 0));
        this.mainContents._startViewInit();

        setTimeout( () => {
            // LoadManager.instance.removeImg(PreloadResourceKeys.BOOT_LOADING_BACK);
            // LoadManager.instance.removeImg(PreloadResourceKeys.MAIN_INTRO_RESOURCE_KEY);
        }, 500);

        LoadManager.instance.removeImg(ResourceKey.BOOT_LOADING_BACK);
        LoadManager.instance.removeImg(ResourceKey.PRELOAD_RESOURCE);
        this.state.remove('Preloader');

    }

}