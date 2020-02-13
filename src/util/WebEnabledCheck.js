import GameConfig from "../data/GameConfig";

export default class WebEnabledCheck {
    constructor(game) {
        WebEnabledCheck.instance = this;
    }

    _stringCheck(loc, str) {
        let idx = loc.indexOf(str);
        // console.log(loc, str, idx);
        if(idx !==-1) return true;
        else  return false;
    }

    backBtnEnabled(btn) {
        let loc = location.href;
        if(this._stringCheck(loc, GameConfig.CHECK_WEB_STRING)) btn.visible = false;
    }

}

