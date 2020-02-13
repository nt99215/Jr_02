
export default class LoadManager{
    constructor(game) {

        LoadManager.instance = this;
        this.game = game;
        this._init();

    }

    removeImg(key){
        var check = this.game.cache.checkImageKey(key);
        if(check) {
            this.game.cache.removeImage(key);
        }
    }

    removeJSON(key){
        var check = this.game.cache.checkJSONKey(key);
        if(check) {
            this.game.cache.removeJSON(key);
        }
    }

    removeSound(key){
        var check = this.game.cache.checkSoundKey(key);
        if(check) {
            this.game.cache.removeSound(key);
        }
    }


    _init(){
        // console.log("LoadManager.");
    }
}

LoadManager.instance = null;