export default class GameMainEvent
{
    /* ==================================== Main -> Game Event ==================================== */
    //--------------------------------------
    //  Game 상태
    //--------------------------------------
    /**
     * Game이 Resource Load 완료되면 발생하는 이벤트
     * @eventType gameResourceLoadCompleteMainEvent
     */
    static get GAME_RESOURCE_LOAD_COMPLETE(){ return "gameResourceLoadCompleteMainEvent"; }

    /**
     * Game이 Start View에 init 될때 발생하는 이벤트
     * @eventType gameStartViewInit
     */
    static get GAME_START_VIEW_INIT(){ return "gameStartViewInit"; }

    /**
     * Game이 Create 되면 발생하는 이벤트
     * @eventType gameCreateMainEvent
     */
    static get GAME_CREATE(){ return "gameCreateMainEvent"; }

    /**
     * Game이 Remove 되면 발생하는 이벤트
     * @eventType gameRemoveMainEvent
     */
    static get GAME_REMOVE(){ return "gameRemoveMainEvent"; }

    /**
     * Game이 Update 될때 발생하는 이벤트
     * @eventType gameUpdateMainEvent
     */
    static get GAME_UPDATE(){ return "gameUpdateMainEvent"; }

    /**
     * Game이 Resize 되면 발생하는 이벤트
     * @eventType gameResizeMainEvent
     */
    static get GAME_RESIZE(){ return "gameResizeMainEvent"; }

    //--------------------------------------
    //  Game 진행 관련
    //--------------------------------------
    /**
     * Game 시작 버튼 클릭시 발생되는 이벤트
     * @eventType gameStartMainEvent
     */
    static get GAME_START(){ return "gameStartMainEvent"; }

    /**
     * Game을 종료 시킬때 발생하는 이벤트
     * @eventType gameStopMainEvent
     */
    static get GAME_STOP(){ return "gameStopMainEvent"; }

    /**
     * Game을 일시 정지 시킬때 발생하는 이벤트
     * @eventType gamePauseMainEvent
     */
    static get GAME_PAUSE(){ return "gamePauseMainEvent"; }

    /**
     * 일시정지된 Game을 다시 시작할때 발생하는 이벤트
     * @eventType gameResumeMainEvent
     */
    static get GAME_RESUME(){ return "gameResumeMainEvent"; }

    /**
     * Game Popup Open시 발생하는 이벤트
     * @eventType gameOverPopupOpenMainEvent
     */
    static get GAME_OVER_POPUP_OPEN(){ return "gameOverPopupOpenMainEvent"; }

    /* ==================================== Game -> Main Event ==================================== */
    /**
     * Game이 끝났을때 발생하는 이벤트
     * @eventType gameOverMainEvent
     */
    static get GAME_OVER(){ return "gameOverMainEvent"; }

    /**
     * @param	{string}    type		이벤트 종류
     * @param	{object}    data        이벤트로 보내는 데이타
     * @param	{boolean}   bubbles
     * @param	{boolean}   cancelable
     */
    constructor( type, data = null, bubbles = false, cancelable = false ) {
        this.type = type;
        this.data = data;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
    }

    //------------------------------------------------------------------------
    //
    // Getter / Setter
    //
    //------------------------------------------------------------------------	

    //------------------------------------------------------------------------
    //
    //  Methods ( first Override )
    //
    //------------------------------------------------------------------------

    //------------------------------------------------------------------------
    //
    //  Handlers ( first Override )
    //
    //------------------------------------------------------------------------
}
