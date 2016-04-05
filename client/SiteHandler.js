"use strict";

let $ = document.querySelector.bind(document);
let AccountHandler = require("./AccountHandler");
let AliasHandler = require("./AliasHandler");

let GameClient = require("./GameClient");

let LoginBox = require("./Site/LoginBox");
let AliasCreationBox = require("./Site/AliasCreationBox");

let NoiseTest = require("./NoiseTest");
/**
 * Handled all webrelated things.
 * @namespace
 */
class SiteHandler
{
    constructor()
    {

    }

    get Gamearea() { return this._gamearea; }

    Init()
    {
        let stats = new Stats();
        stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

        this.stats = stats;

        // align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.zIndex = "100";
        stats.domElement.style.left = '3px';
        stats.domElement.style.top = '3px';

        document.body.appendChild( stats.domElement );

        this._gamearea = $("#gamearea");

        let lb = new LoginBox();
        lb.StartGame = this.StartGame.bind(this);

        //let nt = new NoiseTest();
    }
    /**
     * Starts the game.
     */
    StartGame()
    {
        if ( !AliasHandler.IsValid )
        {
            let h = new GameClient(this);
            this._gamearea.classList.add("show");
        }
        else
        {
            let acb = new AliasCreationBox();
            acb.StartGame = this.StartGame.bind(this);
        }
    }
}

module.exports = new SiteHandler();
