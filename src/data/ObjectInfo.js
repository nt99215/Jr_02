import AssetKey from "./AssetKey";

export default class ObjectInfo {

    static get ROCK_S() {
        return {
            "key": AssetKey.DEFAULT_GAME_ATLAS,
            "ally": 'enemy',
            "assetName": AssetKey.IMG_ROCK_S,
            "collision": true
        }
    }

    static get ROCK_M() {
        return {
            "key": AssetKey.DEFAULT_GAME_ATLAS,
            "ally": 'enemy',
            "assetName": AssetKey.IMG_ROCK_M,
            "collision": true
        }
    }

    static get ROCK_L() {
        return {
            "key": AssetKey.DEFAULT_GAME_ATLAS,
            "ally": 'enemy',
            "assetName": AssetKey.IMG_ROCK_L,
            "collision": true
        }
    }


}
