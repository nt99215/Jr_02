export default class ScreenManager {
    constructor() {
        ScreenManager.instance = this;

    }

    fullScreen() {

        if("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document)
        {
            if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
            {
                alert('fullScreen');
                // console.log("User allows fullscreen");
                let element = document.body;
                // let element = document.getElementById('loading');
                if("requestFullscreen" in element) element.requestFullscreen();
                else if ("webkitRequestFullscreen" in element)  element.webkitRequestFullscreen();
                else if ("mozRequestFullScreen" in element) element.mozRequestFullScreen();
                else if ("msRequestFullscreen" in element) element.msRequestFullscreen();
            }
        }
        else
        {
            alert("User doesn't allow full screen");
        }
    }

    isMobile() {
        let filter = "win16|win32|win64|mac|macintel";
        if( navigator.platform  ){
            if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
                return true;
            }else{
                return false;
            }
        }
    }

    checkBr(){
        /**
         * PC 브라우저 지원 하지 않을 경우
         * IE 8 이하 일 경우
         */
        let canvas = document.getElementById("glcanvas");
        let gl;
        if(this.isMobile()) {
            if(!canvas) return false;
            gl = this.initWebGL(canvas);      // Initialize the GL context
            document.body.removeChild(canvas);

            if (gl) {
                return true;
            }else{
                return false;
            }
        }else{
            if(!canvas) return false;
            document.body.removeChild(canvas);
            if(navigator.appName.toLocaleLowerCase() == "microsoft internet explorer") {
                if(navigator.userAgent.indexOf("MSIE 10.0") == -1) {
                    if(navigator.userAgent.indexOf("MSIE 9.0") == -1) {
                        // console.log("지원 X");
                        return false
                    }
                }
            }
        }
        return true;
    }

    initWebGL(canvas) {
        let gl = null;
        try {
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
        catch(e) {}
        // If we don't have a GL context, give up now
        if (!gl) {
            gl = null;
        }
        return gl;
    }

    changeWinSize() {

        let ww = document.body.clientWidth;
        let wh = document.body.clientHeight;

        let _loading = document.getElementById('loading');

        let cw = 1280;
        let ch = 720;

        let scaleX = ww / cw;
        let scaleY = wh / ch;


        let scale;
        if (scaleX > scaleY)
        {
            scale = scaleY
        }
        else
        {
            scale = scaleX
        }

        if(_loading) {
            let ah = Math.round(ch * scale);
            let aw = Math.round(cw * scale);

            _loading.style.width = aw + 'px';
            _loading.style.height = ah + 'px';

            let leftGap = Math.round((ww - aw) / 2);
            let topGap = Math.round((wh - ah) / 2);

            _loading.style.left = leftGap + 'px';
            _loading.style.top = topGap + 'px';
        }
    }

    screen_change() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            // console.log("Current full screen element is : " + (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement))
        } else {
            if ("exitFullscreen" in document) {
                document.exitFullscreen();
            } else if ("webkitExitFullscreen" in document) {
                document.webkitExitFullscreen();
            } else if ("mozCancelFullScreen" in document) {
                document.mozCancelFullScreen();
            } else if ("msExitFullscreen" in document) {
                document.msExitFullscreen();
            }
        }
    }

    init() {
        let flag = this.checkBr();
        if (flag) {
            document.addEventListener("fullscreenchange", this.screen_change);
            document.addEventListener("webkitfullscreenchange", this.screen_change);
            document.addEventListener("mozfullscreenchange", this.screen_change);
            document.addEventListener("MSFullscreenChange", this.screen_change);
            document.addEventListener("fullscreenerror", function () {/*console.log("Full screen failed");*/
            });
            document.addEventListener("webkitfullscreenerror", function () {/*console.log("Full screen failed");*/
            });
            document.addEventListener("mozfullscreenerror", function () {/*console.log("Full screen failed");*/
            });
            document.addEventListener("MSFullscreenError", function () {/*console.log("Full screen failed");*/
            });
            window.addEventListener("resize", function (evt) {
                // this.changeWinSize();
            }, false);
           /* let gameScript = document.createElement('script');
            gameScript.setAttribute('src', 'index.bundle.js');
            document.body.appendChild(gameScript);*/
            this.changeWinSize();
        } else {
            this.changeWinSize();
            let div = document.getElementById('loading');
            div.style.backgroundImage = "url('')";
            div.innerHTML += '<div class="inner">' +
                '<p>해당 컨텐츠를 지원 하지 않는 브라우저 입니다. </p>' +
                '</div>';
        }
    }


}