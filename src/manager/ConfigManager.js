import GameConfig from "../data/GameConfig";

export default class ConfigManager {
    /**
     * CONFIG RESET
     *
     */
    GAME_CONFIG_RESET() {
        GameConfig.POP_ENABLED = false;
        // GameConfig.SOUND_ENABLED = true;
        GameConfig.BGM_ENABLED = true;
        GameConfig.IN_GAME = true;
        GameConfig.MAP_MOVING = false;
        GameConfig.TUTORIAL_DISABLED = false;
        GameConfig.GAME_FINISH = false;
        GameConfig.IN_GAME = true;
        GameConfig.GAME_SCORE = 3;

    }

    GAME_OVER() {
        GameConfig.IN_GAME = false;
        GameConfig.GAME_RESET = true;


    }

}