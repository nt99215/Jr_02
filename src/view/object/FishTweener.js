
export default class FishTweener {
    constructor(game, obj, direction, term, duration, repeat, yoyo) {

        this._game = game;
        this._obj = obj;
        this._direction = direction;
        this._term = term;
        this._duration = duration;
        this._repeat = repeat;
        this._yoyo = yoyo;

        if(this._direction ==='xx') this._xMoving();
        else this._yMoving();

    }

    _xMoving() {

        this.tween = this._game.add.tween(this._obj).to({x:this._obj.x - this._term/2}, this._duration, Phaser.Easing.Linear.Out, true, 0, this._repeat, this._yoyo);
        this.tween.onComplete.add( () => {
            this._obj.scale.x *= -1;
            this._term *= -1;
            this._obj.x -= this._term/2
            this._xMoving();
        });

    }

    _yMoving() {
        this._obj.y = this._obj.y - this._term/2;
        this.tween = this._game.add.tween(this._obj).to({y:this._obj.y + this._term}, this._duration, Phaser.Easing.Linear.Out, true, 0, this._repeat, this._yoyo);
    }

    _alpha(obj) {

        let tween = this._game.add.tween(obj).to({alpha: 0}, 500, Phaser.Easing.Linear.Out, true, 0, 100, true);

    }

    _destroy() {
        this.tween.stop(true);
        this._obj.destroy();

    }

}