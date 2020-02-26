import AssetKey from "../data/AssetKey";
import GameConfig from "../data/GameConfig";
import PongPong from "../view/object/PongPong";
import Coral from "../view/object/Coral";
import ShuffleRandom from "../util/ShuffleRandom";
import Shark from "../view/object/Shark";
import MarineObject from "../view/object/MarineObject";
import OceanNavigator from "../view/object/OceanNavigator";
import Fish from "../view/object/Fish";
import SubMarineAnimation from "../view/object/SubMarineAnimation";
import SoundAssetKey from "../data/SoundAssetKey";
import SoundManager from "../manager/SoundManager";

let timer;
let counter;
let moving;

let topMargin = 100;
let removePos = -500;
let oxyStartPos = 300;
let jellyFishStartPos = 300;

let movingPos, repeat, distance, speed, hit;
let coralQuantity, sharkQuantity, jellyFishQuantity, fishQuantity, oxyQuantity;

let coralXfpos, sharkPos, jellyFishPos, fishPos, oxyPos;
let coralSequence, sharkSequence, jellyFishSequence, fishSequence;


export default class ObjectManager extends Phaser.Group{
    constructor(game) {
        super(game);
        this._game = game;

        this._bgGroup = this._game.add.group();
        this._allyGroup = this._game.add.physicsGroup();
        this._enemyGroup = this._game.add.physicsGroup();
        this._allyGroup.enableBody = true;
        this._enemyGroup.enableBody = true;
        this._focus = true;

        repeat = GameConfig.OCEAN_LENGTH;
        distance = 0;
        coralQuantity = 0;
        sharkQuantity = 0;
        jellyFishQuantity = 0;
        fishQuantity = 0;
        oxyQuantity = 0;
        hit = false;
        speed = GameConfig.MAP_SPEED;

        this._positionSetting();
        this._createNavigator();
        this._init();

    }

    _createNavigator() {
        this._navi = new OceanNavigator(this._game);
        this._bgGroup.addChild(this._navi);
    }

    _positionSetting() {
        let sR = new ShuffleRandom(this._game);
        let arr = sR._shuffle(GameConfig.MAX_CORAL );
        let jellyArr = sR._shuffleJelly(GameConfig.MAX_JELLY_FISH);
        let oxyArr = sR._shuffleOxy(GameConfig.MAX_OXY);
        coralSequence = sR.posInit(GameConfig.MAX_CORAL);
        sharkSequence = sR.posInit(GameConfig.MAX_SHARK);
        // jellyFishSequence = sR.posInit(GameConfig.MAX_JELLY_FISH);
        fishSequence = sR.posInit(GameConfig.MAX_FISH);

        // coralXpos = arr[0];
        sharkPos = arr[1];
        fishPos = arr[0];
        jellyFishPos = jellyArr[0];
        oxyPos = oxyArr[0];

    }

    _init() {


        /**
         * BG FRONT
         * @type {Phaser.Image | Phaser.Loader | * | never}
         */
       this.bg = new Phaser.Image(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.BG_FRONT);
       this.bg.y = this._game.height - this.bg.height;
       this._bgGroup.addChild(this.bg);
       this.bg2 = new Phaser.Image(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.BG_FRONT);
       this.bg2.x = this.bg.width;
       this.bg2.y = this.bg.y;
       this._bgGroup.addChild(this.bg2);


        /**
         * PONG PONG
         * @type {never|Phaser.Sprite}
         */

        this.pong = new PongPong(this._game);
        this.pong.x = 200;
        this.pong.y = 330;
        this.pong.scale.setTo(GameConfig.OBJECT_SCALE, GameConfig.OBJECT_SCALE);
        this.pong._infoAni();
        this.pong._movement(this.pong);

        movingPos = this._game.width /2;
        this._bgGroup.addChild(this.pong);

        this._createRectangle();
        this._game.physics.arcade.enable(this.pong);
        this.pong.inputEnabled = true;
        this.pong.input.enableDrag(false, false, false, 0, this._graphics);
        this.pong.events.onDragUpdate.add(this._check, this);
        this.pong.events.onDragStop.add(this._stop, this);

    }

    _check() {
       moving = true;
       GameConfig.MAP_MOVING = true;
       this.pong._infoRemove();
       this.pong.tweenBreath.pause();

    }

    _stop() {
       // moving = false;
        this.pong._movement(this.pong);
    }

    _collisionHandler(pong, target) {

        pong = this.pong;
        if(hit) return;
        if(! target.ally)
        {
            hit = true;
            GameConfig.GAME_SCORE = 1;

            //CAMERA SHAKE
            if(GameConfig.SHAKE_ENABLED) this._game.camera.shake(0.01, 200);

            setTimeout( () => {
                hit = false;
            }, 1500)
        }

        target._collisionEffect(target, pong);
        pong._collisionEffect(pong, target);

    }

    _speedHandler()
    {
        if(distance<=8500)
        {
            speed = GameConfig.MAP_SPEED;
        }
        else
        {
            speed = GameConfig.MAP_SPEED_UP;
        }


    }

    _focusCheck() {



        if(document.hasFocus())
        {
            if(GameConfig.FOCUS_ENABLED)
            {
                return true;
            }
            else
            {
                SoundManager.instance.bgmResume(SoundAssetKey.MAIN_BGM);
                // SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND);
                GameConfig.FOCUS_ENABLED = true;
                // console.log('aa');
                return true;
            }
        }
        else
        {
            SoundManager.instance.bgmPause(SoundAssetKey.MAIN_BGM);
            SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, true);
            GameConfig.FOCUS_ENABLED = false;
            // console.log('nn');
            return false;
        }

    }

    _update() {

        if(! this._focusCheck()) return;

        this._game.physics.arcade.overlap(this.pong.circle, this._enemyGroup.children, this._collisionHandler, null, this);
        this._game.physics.arcade.overlap(this.pong, this._allyGroup.children, this._collisionHandler, null, this);

        if(! moving) return;

        if(repeat === 0)
        {
            moving = false;
            this._subMarineHandler();
            return;
        }

        this.bg.x -= speed;
        this.bg2.x -= speed;

        distance +=speed;
        this._navi._updateSlidePosition(distance/((this.bg.width + this.bg2.width) * GameConfig.OCEAN_LENGTH ));
        this._objectHandler();

        if(this.bg.x < (- this._game.width))
        {
            this.bg.x = this._game.width;
        }

        if(this.bg2.x < (- this._game.width))
        {
            this.bg2.x = this._game.width;
            repeat--;
        }

        // console.log(distance)


    }

    _objectHandler() {

        if(this._enemyGroup.children.length > 0)
        {
            for(let i = 0; i<this._enemyGroup.children.length; i++)
            {

                this._enemyGroup.children[i].position.x -= speed;
                if(this._enemyGroup.children[i].position.x < removePos)
                {
                    this._enemyGroup.children[i].destroy();
                }
            }

        }

        // this._coralHandler();  //산호
        this._oxyHandler();
        this._fishHandler();
        this._jellyFishHandler();
        this._sharkHandler();
    }

    /**
     *
     * EFFECT SOUND HANDLER
     */
    _effectSoundHandler(target, context, asset) {

        SoundManager.instance.effectSound(asset, 0.7);

    }


    /**
     * CORAL
     */
    _coralHandler() {

        if(distance >= coralXpos[coralQuantity])
        {

            let coralAssetNum = GameConfig.CORAL_ASSET_ARRAY[coralSequence[coralQuantity] - 1];
            let coral = new Coral(this._game, coralAssetNum);
            coral.x = this._game.width;
            coral.y = this._game.height - coral.height;
            this._game.physics.arcade.enable(coral);
            coralQuantity++;
        }
    }

    /**
     * Oxy
     */

    _oxyHandler() {

        if(distance >= oxyPos[oxyQuantity]) {
            oxyQuantity++;
            let oxy = new MarineObject(this._game, 0, true);
            oxy.x = this._game.rnd.integerInRange(oxyStartPos, this._game.width);
            oxy.y = 720;
            oxy.inputEnabled = true;
            oxy.events.onInputDown.add(this._effectSoundHandler, this, '', SoundAssetKey.EFFECT_OXY_NEW);
            oxy._verticalMovement(oxy);
            this._game.physics.arcade.enable(oxy);
            this._allyGroup.addChild(oxy);
        }
    }

    /**
     * FISH
     */
    _fishHandler() {

        if(distance >= fishPos[fishQuantity]) {

            let fishAssetNum = GameConfig.FISH_ASSET_ARRAY[fishSequence[fishQuantity] - 1];
            fishQuantity++;

            let fish = new Fish(this._game, fishAssetNum, true, 10);
            fish.x = this._game.width;
            fish.y = this._game.rnd.integerInRange(150, 500);
            fish.inputEnabled = true;
            fish.events.onInputDown.add(this._effectSoundHandler, this, '', SoundAssetKey.TOUCH_FISH);
            fish._movement(fish);
            this._game.physics.arcade.enable(fish);
            this._allyGroup.addChild(fish);
            //console.log('fishQuantity', fishQuantity)
        }

    }

    /**
     * JELLY FISH
     */

    _jellyFishHandler () {

        if(distance >= jellyFishPos[jellyFishQuantity]) {
            jellyFishQuantity++;
            let jelly = new Fish(this._game, 3, false, 5);
            jelly.x = this._game.rnd.integerInRange(jellyFishStartPos, this._game.width);
            jelly.y = 720;
            jelly.scale.setTo(GameConfig.OBJECT_SCALE, GameConfig.OBJECT_SCALE);
            jelly.inputEnabled = true;
            jelly.events.onInputDown.add(this._effectSoundHandler, this, '', SoundAssetKey.TOUCH_JELLY);
            jelly._zigzagMovement(jelly);
            this._game.physics.arcade.enable(jelly);
            this._enemyGroup.addChild(jelly);
            //console.log('jellyFishQuantity', jellyFishQuantity)
        }

    }


    /**
     * SHARK
     */
    _sharkHandler() {


        if(distance >= sharkPos[sharkQuantity])
        {
            if(! sharkQuantity > GameConfig.MAX_SHARK) return;
            let sharkAssetNum = GameConfig.SHARK_ASSET_ARRAY[sharkSequence[sharkQuantity] - 1];
            sharkQuantity++;
            if(sharkAssetNum === undefined) {

                return;
            }

            let shark;

            shark = new Shark(this._game, sharkAssetNum);
            shark.x = this._game.width;
            shark.y = this._game.rnd.integerInRange(200, 400);
            shark.scale.setTo(GameConfig.OBJECT_SCALE, GameConfig.OBJECT_SCALE);
            shark.inputEnabled = true;
            shark.events.onInputDown.add(this._effectSoundHandler, this, '', SoundAssetKey.TOUCH_SHARK);
            shark._init(this);
            this._game.physics.arcade.enable(shark);
            this._enemyGroup.addChild(shark);
            //console.log('sharkQuantity',sharkQuantity)

        }

    }

    /**
     * SUBMARINE
     */
    _subMarineHandler() {

        this._enemyGroup.removeChildren(0, this._enemyGroup.length);
        this._enemyGroup.destroy();

        this._allyGroup.removeChildren(0, this._allyGroup.length);
        this._allyGroup.destroy();

        this.pong.input.enabled = false;
        this.pong.inputEnabled = false;
        this.pong.input.draggable = false;

        //DIMMED
        this._graphics =  new Phaser.Graphics(this._game, 0, 0);
        this._graphics.beginFill(0x000000, 0.6);
        this._graphics.drawRect(0, 0, 1280, 720);
        this._graphics.endFill();
        this._bgGroup.addChild(this._graphics);

        let marine = new SubMarineAnimation(this._game, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.SUBMARINE_PREFIX, 0, 0, 1, 4, '', 2, 6, true, oxyPos);
        marine.x = this._game.width;
        marine.y = 170;
        marine._subMarineMovement(marine);
        this._bgGroup.addChild(marine);
        this._bgGroup.bringToTop(this.pong);
        this.pong._subMarineMovement(this.pong);

        GameConfig.HELP_BUTTON.visible = false;
        this._endingEventTimeHandler(this);

    }


    _endingEventTimeHandler() {
        counter = 0;
        timer= this._game.time.create(false);
        timer.repeat(Phaser.Timer.SECOND, GameConfig.ENDING_INTERVAL, step, this);
        setTimeout(function(){
            timer.start()
        }, 1000)

        function step() {
            counter++;
            if(counter === GameConfig.ENDING_INTERVAL)
            {
                this._end();
                timer.stop();
            }

        }

    }


    _end() {
        GameConfig.GAME_FINISH = true;
    }


    _createRectangle() {

        this._graphics = this._game.add.graphics(0, topMargin);
        this._graphics.beginFill(0x000000, 0);
        this._graphics.drawRect(0, 0, GameConfig.DRAGGABLE_AREA, this._game.height - topMargin);
        this._graphics.endFill();
        this._bgGroup.addChild(this._graphics);

    }


    _objectPause() {
        for(let i = 0; i<this._bgGroup.length; i++) {
            this._bgGroup.children[i].visible = false;
        }
        for(let i = 0; i<this._enemyGroup.length; i++) {
            this._enemyGroup.children[i].visible = false;
        }

        for(let i = 0; i<this._allyGroup.length; i++) {
            this._allyGroup.children[i].visible = false;
        }
        this._navi.visible = false;
        this.pong._infoRemove();

    }

    _objectReplay() {

        for(let i = 0; i<this._bgGroup.length; i++) {
            this._bgGroup.children[i].visible = true;
        }
        for(let i = 0; i<this._enemyGroup.length; i++) {
            this._enemyGroup.children[i].visible = true;
        }
        for(let i = 0; i<this._allyGroup.length; i++) {
            this._allyGroup.children[i].visible = true;
        }
        this._navi.visible = true;
        this.pong._oxyEffect();

        if(! GameConfig.MAP_MOVING) this.pong._infoAni();


    }

    _destroy() {
        this._bgGroup.removeChildren(0, this._bgGroup.length);
        this._bgGroup.destroy();

        this._enemyGroup.removeChildren(0, this._enemyGroup.length);
        this._enemyGroup.destroy();

        this._allyGroup.removeChildren(0, this._allyGroup.length);
        this._allyGroup.destroy();
        this._navi._destroy();
        repeat = GameConfig.OCEAN_LENGTH;

    }

}