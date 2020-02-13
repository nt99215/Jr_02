/**
 * Created by NAVER on 2017-09-02.
 */

import AssetKey from "../data/AssetKey";

/**
 * 배경 축하 요소 이펙트
 */
export default class BackgroundEffect  extends Phaser.Group{
    constructor(game) {

        super(game);
        this.imgArr = [ 'celebration_greenM', 'celebration_orangeM', 'celebration_redM',
                'celebration_orange_circle', 'celebration_red_circle', 'celebration_star'];

        this.timeCount = 100;       // 타이머 100번 실행
        this.totalElement = 100     // 100 개의 엘리먼트
        this.perTime = 25;          // ms 몇초 간격     작을수록 빨리 클수록 느림

        this._init();
    }

    _init(){
        this.setKey = AssetKey.RESULT_ASSET;
        this._start();
    }

    _start(){
        this._remove();

        // 엘리먼트들 담아놓을 그룹
        this.elements1 = this.add(this.game.make.group());
        this.elements2 = this.add(this.game.make.group());
        // 이펙트 보이기
        this.showBackEffect();
    }

    _stop(){
        this._remove();
    }

    /**
     * 배경 폭죽 효과 보여줍니다.
     */
    showBackEffect() {

        this.createEffectTimer1 = this.game.time.events.add(100, () => {
            for (let i = 0; i < this.totalElement; i++) {
                this.createElement(this.elements1);
            }

            this.effectTimer1 = this.game.time.events.repeat(this.perTime, this.timeCount, () => {
                let t = this.timeCount-this.effectTimer1.repeatCount;
                if(this.effectTimer1.repeatCount > 74){
                    let count = ( 125 - this.effectTimer1.repeatCount ) / 50;
                    this.elements1.forEachAlive(function (element) {
                        element.alpha = count
                        element.scale.set(count);
                        element.x += element.vx;
                        element.y = element.y0 + (element.vy*t) + (element.g*t*(t-1))/2;
                    }, this);
                }else{
                    this.elements1.forEachAlive(function (element) {
                        element.x += element.vx;
                        element.y = element.y0 + (element.vy*t) + (element.g*t*(t-1))/2;
                    }, this);
                }

            }, this);
        }, this);


        this.createEffectTimer2 = this.game.time.events.add(2000, () => {
            for(let i = 0; i < this.totalElement; i++) {
                this.createElement(this.elements2);
            }

            this.effectTimer2 = this.game.time.events.repeat(this.perTime, this.timeCount, () => {
                let t = this.timeCount - this.effectTimer2.repeatCount;

                if(this.effectTimer2.repeatCount > 74){
                    let count = ( 125 - this.effectTimer2.repeatCount ) / 50;
                    this.elements2.forEachAlive(function (element) {
                        element.alpha = count;
                        element.scale.set(count);
                        element.x += element.vx;
                        element.y = element.y0 + (element.vy*t) + (element.g*t*(t-1))/2;
                    }, this);
                }else{
                    this.elements2.forEachAlive(function (element) {
                        element.x += element.vx;
                        element.y = element.y0 + (element.vy*t) + (element.g*t*(t-1))/2;
                    }, this);
                }

            }, this);
        } ,this);
    }

    /**
     * 폭죽 요소 만듭니다.
     * 트윈 대신 타이머로 alpha, scale 등 변경해서 움직이도록 합니다.
     */
    createElement(group) {
        //let element = this.game.make.image(640, 580, this.setKey, this.imgArr[this.game.rnd.between(0, this.imgArr.length-1)]);
        let element = this.game.make.image(640, 580, this.setKey, this.imgArr[this.game.rnd.between(0, this.imgArr.length-1)]);
        element.alpha = 0.5;
        element.scale.set(0.5);
        element.g = 1.15;   // 가속도. 1보다 커야합니다.
        element.y0 = element.y; // 초기값
        element.vy = Math.random()*9-39;    // -39 ~ -30
        element.vx = Math.random()*24-12;   // -12 ~ 12
        group.add(element);

    }


    /**
     * 폭죽 요소를 담아놓은 그룹과, 요소 동작에 사용된 타이머를 제거합니다.
     */
    _remove() {

        if(this.createEffectTimer1){    // 스킵할 때 에러나서 제거 코드 추가했어요
            this.game.time.events.remove(this.createEffectTimer1);
            this.createEffectTimer1 = null;
        }

        if(this.createEffectTimer2){    // 스킵할 때 에러나서 제거 코드 추가했어요
            this.game.time.events.remove(this.createEffectTimer2);
            this.createEffectTimer2 = null;
        }

        if(this.effectTimer1) {
            this.game.time.events.remove(this.effectTimer1);
            this.effectTimer1 = null;
        }

        if(this.effectTimer2) {
            this.game.time.events.remove(this.effectTimer2);
            this.effectTimer2 = null;
        }

        if(this.elements1) {
            this.elements1.removeAll();
            this.elements1.destroy();
            this.elements1 = null;
        }

        if(this.elements2) {
            this.elements2.removeAll();
            this.elements2.destroy();
            this.elements2 = null;
        }

        this.removeAll();

    }
}