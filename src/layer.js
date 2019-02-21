// Game.layers[1].extend = cc.Layer.extend({ 
// 	init: function () { 
// 		this._super(); 
// 		var game = this; 
// 		Game.layers[1].start( game ); 
// 	} 
// }); 
// Game.layers[1].start = function( game ){ 
// 	var size = cc.director.getWinSize(); 
// 	var label = cc.LabelTTF.create("NEW TEXT", "Arial", 40);
// 	label.setPosition(size.width / 2, size.height / 2);
// 	game.addChild(label, 1); 
// };

var MainMenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hi, we are the Desi Devs", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var BackGroundLayer = cc.Layer.extend({
	sprite 	: null,
	ctor	: function(){
		this._super();
		var size = cc.winSize;
		this.sprite = new cc.Sprite(res.background_img);
		this.sprite.attr({
			x: size.width / 2,
			y: size.height / 2
		});
		this.sprite.size = cc.winSize;
		this.addChild(this.sprite, 0);

		this.space_overlay = new cc.Sprite(res.space_overlay_img);
		this.space_overlay.attr({
			x: size.width / 2,
			y: size.height / 2,
			rotation: 180
		});
		this.space_overlay.size = cc.winSize;
		this.addChild(this.space_overlay, 0);

		return true;
	}
});


var GamePlayLayer = cc.Layer.extend({
    gun:null,
    dirty: false,
    bullet: null,
    alien: null,
    hoverHandler:null,
    layer: BackGroundLayer,
    ctor:function () {
        this._super();
        this.hoverHandler = cc.EventListener.create({
		    event: cc.EventListener.MOUSE,
		    onMouseMove: function (event) {
		      var target = event.getCurrentTarget();
		      var locationInNode = target.convertToNodeSpace(event.getLocation());
		      var s = target.getContentSize();
		      var rect = cc.rect(0, 0, s.width, s.height);
		      if (cc.rectContainsPoint(rect, locationInNode)) {
		        cc.log("It's hovering! x = " + locationInNode.x + ", y = " + locationInNode.y);
		        target.opacity = 180;
		        return true;
		      } else {
		        target.opacity = 255;
		        return false;
		      }
		  }
		});

        var size = cc.winSize;
        // for (var i = 0; i < sniper_points.length; i++) {
        	this.gun = new cc.Sprite.create(res.missile_obj);
        	this.gun.attr({
        		x: size.width/2,
        		y: 30,
        		rotation: -90,
        		scale: 0.3
        	});
	        this.addChild(this.gun, 0);
	        launch_position_x = size.width/2;
	        // this.sprite.runAction( new cc.MoveBy( this.sprite.time, cc.p( this.sprite.moveX, this.sprite.moveY ) ));
	        cc.eventManager.addListener(gun_movement.clone(), this.gun );

	        var self = this;
	        var shoot_touch_listener = cc.EventListener.create({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
		    	swallowTouches: true,
		    	
		    	onTouchBegan: function (touch, event) {	
				    this.bullet = new cc.Sprite.create(res.bullet_obj);
				    this.bullet.attr({
				    	x : launch_position_x,
				    	y : 0,
            			time 	: 0.3,
            			scale: 0.15
				    });
				    self.addChild(this.bullet, 0);
					this.bullet.runAction(
						new cc.Sequence(
							cc.MoveTo.create( 0.05, cc.p( launch_position_x, 60 ) ),
							// cc.RotateBy.create(1, 1800),
							cc.MoveTo.create( this.bullet.time, cc.p( touch.getLocation().x, touch.getLocation().y ) ),
							// self.addChild(explosion, 0),
							cc.FadeTo.create(0.2, 0)
							
						)
					);
					self.gun.runAction(
						new cc.Sequence(
							cc.MoveTo.create( 0.05, cc.p( launch_position_x, 20 ) ),
							cc.MoveTo.create( 0.05, cc.p( launch_position_x, 30 ) )
						)
					);
					// self.layer.runAction(
					// 	new cc.Sequence(
					// 		cc.RotateBy.create(0.1, 2),
					// 		cc.RotateBy.create(0.1, -2),
					// 		cc.RotateBy.create(0.1, 0)
					// 	)
					// );

					var markPoint = new cc.Sprite.create(res.sniper_point);
					markPoint.attr({
						x: touch.getLocation().x,
						y: touch.getLocation().y,
						scale: 0.5
					});

					self.addChild(markPoint);

					markPoint.runAction(
						new cc.Sequence(
							cc.RotateBy.create(0.13, 45),
							cc.RotateBy.create(0.3, -45),
							cc.scaleTo(0.5, 0.3),
							cc.MoveTo.create( this.bullet.time, cc.p( touch.getLocation().x, touch.getLocation().y ) ),
							// self.addChild(explosion, 0),
							cc.FadeTo.create(0.2, 0),
							
						)
					);




					// cc.eventManager.addListener(self.hoverHandler.clone(), markPoint);
					
					// var markPoint2 = new cc.Sprite.create(res.sniper_point);
					// markPoint2.attr({
					// 	x: touch.getLocation().x,
					// 	y: touch.getLocation().y,
					// 	scale: 0.5
					// });
					// self.addChild(markPoint2);
					// markPoint2.runAction(
					// 	new cc.Sequence(
					// 		cc.RotateBy.create(0.1, -45),
					// 		cc.RotateBy.create(0.3, 45),
					// 		cc.scaleTo(0.5, 0.3),
					// 		cc.MoveTo.create( this.bullet.time, cc.p( touch.getLocation().x, touch.getLocation().y ) ),
					// 		// self.addChild(explosion, 0),
					// 		cc.FadeTo.create(0.2, 0),
							
					// 	)
					// );
				    // this.bullet.runAction( );

				    if(!this.dirty){
				    	this.dirty = true;
					    setInterval(function(){
				    		cc.log(i, size.width-10 , Math.random() * ((size.width-10) - 10) + 10, 10, Math.round(Math.random() * (max - min) + min));
					        this.alien = new cc.Sprite.create(aliens[Math.round(Math.random() * (max - min) + min)]);
					    	var xPos =  Math.random() * ((size.width-10) - 10) + 10;
					    	this.alien.attr({
					    		x: xPos,
					    		y: size.height + 100,
					    		rotation: 0,
					    		scale: 0.3,
					    		time: 10 - (Math.random() * (max - min) + min)
					    	});
						    self.addChild(this.alien, 0);
						    this.alien.runAction(
						    	new cc.Sequence(
									cc.scaleTo(0.5, 0.3),
									cc.MoveTo.create( this.alien.time, cc.p( xPos, 100 ) ),
									// self.addChild(explosion, 0),
									cc.FadeTo.create(0.2, 0)
								)
							);
				    	}, 2000);
					}

//COLLISION PENDING




			    },
			    onTouchMoved: function (touch, event) {			

			    },
		    	onTouchEnded: function (touch, event) {

			    }
			});


			cc.eventManager.addListener(shoot_touch_listener.clone(), this.gun);

	        /*

	        cc.eventManager.addListener({
			    event: cc.EventListener.MOUSE,
			    onMouseMove: function (event) {
			    	var n = Math.floor(event.getLocationX());
            		var m = Math.floor(event.getLocationY());
            		if(m<yPos/2 && m>yPos/4){
            			self.sprite.attr({
				            x 		: n,
				            y 		: (m/(yPos/2))*(m+yPos)
				        });
            		}
				    // var touch = touches[0];
				    // var delta = touch.getDelta();
				    
				    // var node = event.getCurrentTarget();//.getChildByTag(TAG_TILE_MAP);
				    // var diff = cc.pAdd(delta, node.getPosition());
				    // node.setPosition(diff);
			    }
		    }, this);

		    */


	        // this.sprite = null;

        // }


        // ALIENS 
        var min = 1;
	    var max = 6;

    	

        return true;
    },

    init: function(){
		this._super();

		if( 'touches' in sys.capabilities ){
			this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
			this.setTouchEnabled(true);
		}
    },

    addNew: function(event){
    	cc.log("Add New :: ", event);

    }

});