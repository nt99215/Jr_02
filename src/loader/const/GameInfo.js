let width = 0;
let height = 0;
let debug = false;
let from = null;
let renderType = "none"
let version = "1.0.0";
let buildDate = "2020.02.11"

export default class GameInfo {

   static get GAME_WIDTH() { return width;}
   static set GAME_WIDTH(num) { width = num;}

   static get GAME_HEIGHT() { return height;}
   static set GAME_HEIGHT(num) { height = num;}

   static get GAME_DEBUG() { return debug;}
   static set GAME_DEBUG(bool) { debug = bool;}

   static get GAME_RENDER_TYPE() { return renderType;}
   static set GAME_RENDER_TYPE(obj) { renderType = obj;}

   static get GAME_VERSION() { return version;}
   static set GAME_VERSION(num) { version = num;}

   static get GAME_BUILD_DATE() { return buildDate;}
   static set GAME_BUILD_DATE(num) { buildDate = num;}

}

