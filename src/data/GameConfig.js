let currentScene = null;
let introSnd = true;
let pause = true;
let device;
let scene = '';
let reset;
let soundEnabled = true;
let focusEnabled = true;
let bgmEnabled = true;
let bgmPlaying = false;
let mainController;
let tutorialDisabled = false;
let pop = false;
let finish = false;
let oceanLength = 5;  //map length
let mapSpeed = 4;
let mapSpeedUp = 7;
let movingSpeed = 100;
let objectScale = 0.85;
let mapMove = false;
let shakeEnabled = true;  //camera shake
// let primaryCoral = 15;
// let primaryShark = 15;
// let primaryJellyFish = 10;
// let primaryFish = 15;

let primaryCoral = 30;
let primaryShark = 20;
let primaryJellyFish = 15;
let primaryFish = 30;

let primaryOxy = 99;
let coralAssetArr = [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];
let sharkAssetArr = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
let fishAssetArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2];
let sharkSpeedArr = [4500, 3000];
let gameScore = 3;
let endingInterval = 5;  // milliSecond
let currentGuideSound = null;
let helpBtn = null;
let draggableArea = 1152;
const appUrl = 'https://jr.msdl.naver.com/jrapp?cmd=close&type=webview&version=1';
const appEnabledString = 'app';
const webEnabledString = 'web';

export default class GameConfig {

    static get INTRO_SND_PLAY() {return introSnd; }
    static set INTRO_SND_PLAY(bool) {introSnd = bool; }
    static get CURRENT_SCENE() { return currentScene}
    static set CURRENT_SCENE(obj){currentScene = obj; }
    static get GAME_RESET() { return reset;}
    static set GAME_RESET(bool) { reset = bool;}
    static get SCENE_STATE() { return scene; }
    static set SCENE_STATE(str) {scene = str; }

    static get IN_GAME() { return pause; }
    static set IN_GAME(bool) { return pause = bool; }

    static get MAP_MOVING() { return mapMove; }
    static set MAP_MOVING(bool) { return mapMove = bool; }

    static get SOUND_ENABLED() {return soundEnabled; }
    static set SOUND_ENABLED(bool) {soundEnabled = bool; }

    static get FOCUS_ENABLED() {return focusEnabled; }
    static set FOCUS_ENABLED(bool) {focusEnabled = bool; }

    static get BGM_ENABLED() {return bgmEnabled; }
    static set BGM_ENABLED(bool) {bgmEnabled = bool; }

    static get BGM_PLAYING() {return bgmPlaying; }
    static set BGM_PLAYING(bool) {bgmPlaying = bool; }

    static get DRAGGABLE_AREA() {return draggableArea; }

    static get CURRENT_DEVICE()  { return device; }
    static set CURRENT_DEVICE(str)  { device = str; }

    static get MAIN_CONTROLLER() { return mainController; }
    static set MAIN_CONTROLLER(obj) { mainController = obj; }

    static get TUTORIAL_DISABLED() {return tutorialDisabled ; }
    static set TUTORIAL_DISABLED(bool) {tutorialDisabled = bool;}

    static get POP_ENABLED() { return pop;}
    static set POP_ENABLED(bool) { pop = bool; }

    static get GAME_FINISH() { return finish; }
    static set GAME_FINISH(bool) { finish = bool; }

    static get OCEAN_LENGTH() { return oceanLength;}
    static get MOVING_SPEED() { return movingSpeed; }
    static get MAP_SPEED() { return mapSpeed; }
    static get MAP_SPEED_UP() { return mapSpeedUp; }

    static get SHAKE_ENABLED() { return shakeEnabled; }
    static set SHAKE_ENABLED(bool) { shakeEnabled = bool; }

    static get MAX_CORAL() { return primaryCoral; }
    static get MAX_SHARK() { return primaryShark; }
    static get MAX_JELLY_FISH() { return primaryJellyFish; }
    static get MAX_FISH() { return primaryFish; }
    static get MAX_OXY() { return primaryOxy; }
    static get CORAL_ASSET_ARRAY() { return coralAssetArr; }
    static get SHARK_ASSET_ARRAY() { return sharkAssetArr; }
    static get SHARK_SPEED_ARRAY() { return sharkSpeedArr; }

    static get OBJECT_SCALE() { return objectScale; }

    static get FISH_ASSET_ARRAY() { return fishAssetArr; }

    static get GAME_SCORE() { return gameScore; }
    static set GAME_SCORE(num) { gameScore = num; }

    static get CURRENT_GUIDE_SOUND() { return currentGuideSound; }
    static set CURRENT_GUIDE_SOUND(obj) { currentGuideSound = obj; }

    static get HELP_BUTTON() { return helpBtn; }
    static set HELP_BUTTON(obj) { helpBtn = obj; }

    static get ENDING_INTERVAL() { return endingInterval; }
    static get APP_URL() { return appUrl; }
    static get CHECK_APP_STRING() { return appEnabledString; }
    static get CHECK_WEB_STRING() { return webEnabledString; }


}

