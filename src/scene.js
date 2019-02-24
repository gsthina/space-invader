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
        var infoLayer = new InfoLayer();
        this.addChild(bgLayer);
        this.addChild(layer);
        this.addChild(infoLayer);
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