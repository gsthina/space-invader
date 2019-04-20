// Game.scenes[1].extend = cc.Scene.extend({ 
// 	onEnter:function () { 
// 		this._super(); 
// 		var layer = new Game.layers[1].extend(); 
// 		layer.init(); 
// 		this.addChild( layer ); 
// 	} 
// });

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer 	= new MainMenuLayer();
        var infoLayer = new InfoLayer();

        // var bgLayer = new BackGroundLayer();	
        // var testLayer = new MyLayer();	
        // this.addChild(bgLayer);
        // this.addChild(testLayer);
        this.addChild(layer);
        this.addChild(infoLayer);
    }
});

var LevelViewScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer   = new LevelViewLayer();
        var bgLayer = new BackGroundLayer();    
        // var testLayer = new MyLayer();   
        this.addChild(bgLayer);
        // this.addChild(testLayer);
        this.addChild(layer);
    }
});

var GamePlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GamePlayLayer();
        var bgLayer = new BackGroundLayer();
        var controlsLayer = new ControlsLayer();
        // var focusLayer = new FocusLayer();
        this.addChild(bgLayer);
        this.addChild(layer);
        this.addChild(controlsLayer);
        // this.addChild(focusLayer);

    }
});

var GameOverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});