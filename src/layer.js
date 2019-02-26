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
			scale: 3,
			rotation: 180
		});
		// this.space_overlay.setOpacity(1);
		this.space_overlay.size = cc.winSize;
		this.addChild(this.space_overlay, 1);

		// this.space_overlay.runAction(cc.FadeTo.create(1,1));
		// this.space_overlay.runAction(cc.rotateBy(2, 180));
		// this.space_overlay.runAction(cc.scaleTo(2, 1));


		// this.bullet.runAction(
		// 	new cc.Sequence(
		// 		cc.MoveTo.create( 0.05, cc.p( launch_position_x, 60 ) ),
		// 		// cc.RotateBy.create(1, 1800),
		// 		cc.MoveTo.create( this.bullet.time, cc.p( touch.getLocation().x, touch.getLocation().y ) ),
		// 		// self.addChild(explosion, 0),
		// 		cc.FadeTo.create(0.2, 0)
				
		// 	)
		// );


		// this.space_overlay.runAction(
		// 	new cc.Sequence(
		// 		cc.FadeIn.create(0.5, 0.5)
		// 	)
		// );

		return true;
	}
});


var GamePlayLayer = cc.Layer.extend({
	gameover: false,
	timeup: false,
	dirty: false,
	gun: null,
	healthLabel: "",
	bulletLimit: BULLET.LIMIT,
	ctor: function(){

		var size = cc.winSize;

		this._super();

		// Reference Variable 

		var self = this;

		// Launch Position 

	    launch_position_x = size.width/2;

		// GUN Sprite

		this.gun = new cc.Sprite.create(res.missile_obj);
		this.gun.attr({
			x: size.width/2,
			y: -40,
			rotation: -90,
			scale: 0.3
		});
	    this.addChild(this.gun, 0);

	    // GUN Action

	    this.gun.runAction(
			new cc.Sequence(
				cc.MoveTo.create( 1.95, cc.p( launch_position_x, 35 ) ),
				cc.MoveTo.create( 0.05, cc.p( launch_position_x, 30 ) )
			)
		);

	    // GUN Listener

	    cc.eventManager.addListener(gun_movement.clone(), this.gun );

	    // Shoot Listener

	    var shoot_listener = cc.EventListener.create({

	    	event: cc.EventListener.TOUCH_ONE_BY_ONE,
	    	swallowTouches: true,

	    	onTouchBegan: function(touch, event){
	    		if(!this.gameover){
	    			self.launchBullet(touch, event);
	    			self.schedule(self.launchAlien, ALIEN.FREQENCY); // Scheduling the aliens fall in every ALIEN.FREQENCY (seconds per object)
	    			self.schedule(self.updateUserHealth);
	    			// self.schedule(self.runTimer, (TIMER + ALIEN.TRAVEL)); // Set timer
	    			//register a schedule to scheduler
					if(!self.dirty){
						self.dirty = true;
						self.loadBullets(self.bulletLimit);
						self.runTimer(TIMER);
					}
	    			// this.unscheduleUpdate();
	    		}
	    	},

	    	onTouchMoved: function(touch, event){

	    	},

	    	onTouchEnded: function(touch, event){

	    	}

	    });

	    cc.eventManager.addListener(shoot_listener.clone(), this);

	    this.scoreLabel = this.scoreText==0 ? cc.LabelTTF.create("Score: " + "0", "Courier New", "30", cc.TEXT_ALIGNMENT_CENTER) : cc.LabelTTF.create("Score: " + this.scoreText.toString(), "Courier New", "30", cc.TEXT_ALIGNMENT_CENTER);
		this.scoreLabel.setPosition(this.size.width*0.2, this.size.height*0.9);
		this.addChild(this.scoreLabel, 1);

		this.time = TIMER;
		this.timeText = cc.LabelTTF.create("Time: " + this.time, "Courier New", "30", cc.TEXT_ALIGNMENT_CENTER);
		this.timeText.setPosition(this.size.width*0.8, this.size.height*0.9);
		this.addChild(this.timeText, 1);

		this.healthLabel = cc.LabelTTF.create("Health: " + USER.HEALTH_PERCENT, "Courier New", "30", cc.TEXT_ALIGNMENT_CENTER);
		this.healthLabel.setPosition(this.size.width*0.8, this.size.height*0.1);
		this.addChild(this.healthLabel, 1);

	},

	loadBullets: function(limit){
		
	},

	time: "00",
	levelUp: false,

	runTimer: function(endTime){
		// this.timeup = true;
		var self = this;
		this.updateScore(0);
		var incrementTime = function(){
			if(parseInt(self.time)<=0){
				clearInterval(interval);
				self.timeText.setString("Time: " + "00");
				self.endGame();
			} else {
				self.time = (parseInt(self.time)-1).toString();
				if(parseInt( self.time )<=20){
					self.timeText.runAction(
				    	new cc.Sequence(
							cc.scaleTo(0.1, 1.2),
							cc.scaleTo(0.2, 1)
						)
					);
				}
				(parseInt(self.time)>9)?self.timeText.setString("Time: " + self.time.toString()):self.timeText.setString("Time: " + "0"+self.time.toString());
			}
		}
		var interval = setInterval(incrementTime, 1000);
		


	},

	info: InfoLayer,

	endGame: function(){
		this.sprite = new cc.Sprite(null);
		this.sprite.setPosition(this.size.width / 2, this.size.height/2 + 50);
		this.sprite.setScale(0);
		this.addChild(this.sprite, 0);

		var label = cc.LabelTTF.create("Thank you!", "Courier New", 50, cc.TEXT_ALIGNMENT_CENTER);
		label.setPosition(0, 60);
		this.sprite.addChild(label, 1); 
		
		var play_text = cc.LabelTTF.create("Please share your score and feedbacks! \n \n Reload to Invade the Space!", "Courier New", 20, cc.TEXT_ALIGNMENT_CENTER);
		play_text.setPosition(0, -10);
		this.sprite.addChild(play_text, 1); 

		// this.sprite.runAction(cc.MoveTo.create(2, cc.p( size.width/2, size.height/2 + 50 )));
		this.sprite.runAction(
	    	new cc.Sequence(
				cc.scaleTo(0.1, 1.05),
				cc.scaleTo(0.1, 1)
			)
		);

		this.gun.runAction(
			new cc.Sequence(
				cc.MoveTo.create(0.1, cc.p(this.size.width/2, -40))
			)
		);
		this.timeup = true;
		this.gameover = true;
		this.clearSpace();
	},

	clearSpace: function(){
		var self = this;
		this.unscheduleAllCallbacks();
		for (var i = 0; i < this.aliensArray.length; i++) {
			this.aliensArray[i].runAction(cc.MoveTo.create(1, cc.p(this.size.width/2, this.size.height)));
			this.aliensArray[i].runAction(
				new cc.Sequence(
					cc.scaleTo(0.1, 0.4),
					cc.scaleTo(0.2, 0.1),
					cc.scaleTo(1, 0)
				)
			);
			setTimeout(function() {self.killSprite( self.aliensArray[i] );}, 1000);
		}

		this.aliensArray = [];
		this.bulletsArray = [];

		new InfoLayer().ctor();

	},

	alien: null,
	powerDirt: false,
	scoreDirt: false,

	update: function(dt){

		this.alien 	=   typeof this.alien !== 'undefined' ? this.alien : new cc.Sprite.create(aliens[Math.round(Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN)]);

		this.alien = this.alien!==null ? this.alien : new cc.Sprite.create(aliens[Math.round(Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN)]);

		var touchPos = this.bullet.getPosition();

		var tempTouch = cc.p(0,0);

		var self = this;

				for (var j = 0; j < this.aliensArray.length; j++) {


					if (cc.rectContainsPoint(this.aliensArray[j].getBoundingBox(), touchPos)){
						
						cc.log("Hit!");

						this.bulletHide = true;

						// ALIEN STRENGTH

						if (this.aliensArray[j].strength>0){ 

							// REDUNDANCE STRENGTH CHECK

							if(!this.powerDirt){

								this.powerDirt = true;

								cc.log("ALIEN : ", j , " : POWER : ", this.aliensArray[j].strength);
							
								var sc = this.aliensArray[j].strength - 1;
								this.aliensArray[j].strength = sc;
								// this.aliensArray[j].setScale(sc*0.01);
								this.aliensArray[j].runAction(
									new cc.Sequence(
										cc.scaleTo(0.1, 0.1),
										cc.scaleTo(0.1, sc/10)
									)
								);
							} else {
								this.powerDirt = (this.aliensArray[j].strength>1) ? true : false;
							}
						
						} else {

							// IF ALIEN STRENGTH == 0
							
							this.aliensArray[j].runAction(
								new cc.Sequence(
									cc.scaleTo(0.1, 0.2),
									cc.scaleTo(0.2, 0)
								)
							);
							// this.aliensArray.splice(j, 1);
							setTimeout(function() {
								if(!self.scoreDirt){
									self.scoreDirt = true;
									self.killAlienSprite(self.aliensArray[j], j);
									cc.log("SCORE: ", SCORE);
									self.updateScore(SCORE);
								}
							}, 300);

						}



						this.killSprite(this.bullet);
						
						this.bulletsArray = [];

					}else if(!this.bulletHide){
						cc.log("Not Hit!");
					}

				}

				// USER HEALTH



		// var point = this.bullet.getPosition();


		// var rotation = Math.atan2(point.y - this.touch.getLocation().y, point.x - this.touch.getLocation().x) - 2.35;

	 //    // Move towards the player
	 //    var x, y;
	 //    x += Math.sin(rotation) * 0.2;
	 //    y -= Math.cos(rotation) * 0.2;

	 //    this.bullet.setPosition(cc.p(x, y));

	},

	updateUserHealth: function(){
		var damage = 0;
		// USER.HEALTH = USER.HEALTH_UNITS_GIVEN;
		for (var j = 0; j < this.aliensArray.length; j++) {
			// USER HEALTH UPDATE
			if(this.aliensArray[j].y <= 0){
				damage = this.aliensArray[j].strength;
				// cc.log("User health update", damage, this.aliensArray[j].y );
				// cc.log("Sprite pos after intrusion", this.aliensArray[j].y );
				USER.HEALTH_UNITS_GIVEN -= damage;
				this.updateHealthText(USER.HEALTH_UNITS_GIVEN);
				this.killSprite(this.aliensArray[j]);
				this.aliensArray.splice(j, 1);
			}
		}

	},

	updateHealthText: function(health){
		this.healthLabel.setString("Health: " + health.toString());
		if(health<=0){
			this.healthLabel.setString("Health: 0");
			this.endGame();
		}
	},

	removeByAttr: function(array, attr, value){
	    var i = array.length;
	    while(i--){
	       if( array[i] && array[i].hasOwnProperty(attr) && (arguments.length > 2 && array[i][attr] === value ) ){ 

	           array.splice(i,1);

	       }
	    }
	    return array;
	},

	killSprite: function(sprite){
		this.removeChild(sprite);
	},

	killAlienSprite: function(sprite, index){
		this.aliensArray.splice(index, 1);
		this.removeChild(sprite);
	},

	drainSprite: function(sprite, quad){
		var self = this;
		var drainPoint;
		if (quad==QUAD.ONE){
			drainPoint = cc.p(self.size.width, self.size.height);
		} else if (quad==QUAD.TWO){
			drainPoint = cc.p(0, self.size.height);
		} else if (quad==QUAD.THREE){
			drainPoint = cc.p(0, 0);
		} else if (quad==QUAD.FOUR){
			drainPoint = cc.p(self.size.width, 0);
		}
		this.bullet.runAction(
			new cc.Sequence(
				cc.MoveTo.create( 0.5, drainPoint )
			)
		);
	},

	scoreText: 0,
	scoreLabel: "",
	size: cc.winSize,

	updateScore: function(score){

		this.scoreText += score;

		this.scoreLabel.setString("Score: " + this.scoreText);

		this.scoreLabel.runAction(
	    	new cc.Sequence(
				cc.scaleTo(0.1, 1.05),
				cc.scaleTo(0.1, 1)
			)
		);
	},

	bullet: null,
	bulletHide: false,
	renderTex: null,
	touch: null,
	event: null,

	launchBullet: function(touch, event){

		this.touch = touch;
		this.event = event;

		this.powerDirt = false;
		this.scoreDirt = false;

		var self = this;

		// Bullet 

		var bullet;

if(!this.gameover){

		if (this.bullet!=null){
			this.bullet = null;
		} else {
			this.bullet = bullet;
		}

		bullet = new cc.Sprite.create(res.bullet_obj);

		bullet.attr({
			x 		: launch_position_x,
	    	y 		: 0,
			time 	: BULLET.TRAVEL_TIME,
			scale 	: 0.15
			// strength: 3
		});

		this.addChild(bullet, 1);
		// cc.log(bullet, cc.p( this.touch.getLocation().x, this.touch.getLocation().y ));
		var travelTime = self.touch.getLocation().y / (bullet.time * 1000);
		cc.log("Bullet Travel Time :: ",  travelTime);
		bullet.runAction(
			new cc.Sequence(
				cc.MoveTo.create( 0.05, cc.p( launch_position_x, 60 ) ),
				cc.MoveTo.create( travelTime, cc.p( self.touch.getLocation().x, self.touch.getLocation().y ) ),
				cc.FadeTo.create(0.2, 0)
			)
		);

		this.bulletsArray.push(bullet);
		this.bullet = bullet;
		this.createShotFocus(touch.getLocation());
		this.bulletTravel();
				// this.unscheduleUpdate();

		setTimeout(function(){
			// self.bulletHide = true;
			// self.removeChild(bullet); // remove sprite of layer
			// self.removeChild(self.bullet); // remove sprite of layer
			cc.log("UNSCHEDULE");
			self.unscheduleUpdate();
			// cc.log(self.bullet, bullet);
         //layer.removeChildByTag(1); // remove sprite by tag
         //layer.removeAllChildren(); // remove all children
         //layer.removeFromParent(); // remove from parent
        }, BULLET.LIFETIME*1000); // after 20 seconds

}

						// setTimeout(function(){
						// 	cc.log("UNSCHEDULE");
						// 	self.unscheduleUpdate();
						// }, BULLET.LIFETIME*1000);


	},

	bulletTravel: function(){
			if(!this.timeup){
				self.bulletHide = true;
				cc.log("SCHEDULE");
				this.scheduleUpdate();
			// }else{
			// 	cc.log("UNSCHEDULE");
			// 	this.unscheduleUpdate();
			}
	},

	getRenderTex                :   function() {

        if (this.renderTex == null) {
            var size            =   cc.winSize;
            var dsf             =   parseInt("0x88F0", 16);
            this.renderTex     =   cc.RenderTexture.create(size.width, size.height);
            this.renderTex.setPosition(cc.p(size.width / 2, size.height / 2));
            this.renderTex.retain();
        }

        return                      this.renderTex;

    },

    aliensArray: [],
    bulletsArray: [],

    enemyZone: null,

	launchAlien: function(touch){
		// cc.log("launchAlien :: ", touch);

		var size = cc.winSize;

		var self = this;

		var xPos =  Math.random() * ((size.width-10) - 10) + 10;
		var power = 1 + Math.round(Math.random() * (ALIEN.MAX_POWER - ALIEN.MIN_POWER) + ALIEN.MIN_POWER);

		this.alien = new cc.Sprite.create(aliens[Math.round(Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN)]);
		this.alien.attr({
			x: xPos,
			y: size.height,
			rotation: 0,
			scale: power * 0.1,
			time: ALIEN.TRAVEL - power - (Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN),
			strength: power
		});

		if(!this.timeup){
			this.aliensArray.push(this.alien);
		    this.addChild(this.alien, 0);
		    this.alien.runAction(
		    	new cc.Sequence(
					cc.MoveTo.create( this.alien.time, cc.p( xPos, -10 ) ),
					cc.FadeTo.create(0.2, 0)
				)
			);
		}

		setTimeout(function(){
	         self.removeChild(this.alien); // remove sprite of layer
	         //layer.removeChildByTag(1); // remove sprite by tag
	         //layer.removeAllChildren(); // remove all children
	         //layer.removeFromParent(); // remove from parent
	         }, ALIEN.TRAVEL); // after 20 seconds

	},

	alienAnimation: function(dt){
		var self = this;
		for (var i = 0; i < this.aliensArray.length; i++) {
			setInterval(function(){
				var rotation = (i%2!=0)?-20:20;
				self.aliensArray[i].runAction(
					new cc.Sequence(
						cc.RotateBy.create(0.03, rotation)
						// cc.RotateBy.create(0.03, -5)
					)
				);
			}, 500);
		}
	},

	createShotFocus: function(position){
		// Shot Focus Point

		var focus = new cc.Sprite.create(res.sniper_point);
		focus.attr({
			x: position.x,
			y: position.y,
			scale: 0.5
		});

		this.addChild(focus);

		focus.runAction(
			new cc.Sequence(
				cc.RotateBy.create(0.1, 45),
				cc.RotateBy.create(0.2, -45),
				cc.scaleTo(0.4, 0.3),
				cc.FadeTo.create(0.2, 0)
			)
		);
	}

});


// var GamePlayDemo = cc.Layer.extend({
//     gun:null,
//     dirty: false,
//     bullet: null,
//     alien: null,
//     layer: BackGroundLayer,
//     ctor:function () {
//         this._super();

//         var size = cc.winSize;
//         this.gun = new cc.Sprite.create(res.missile_obj);
//     	this.gun.attr({
//     		x: size.width/2,
//     		y: -40,
//     		rotation: -90,
//     		scale: 0.3
//     	});
//         this.addChild(this.gun, 0);
//         launch_position_x = size.width/2;
//         // this.sprite.runAction( new cc.MoveBy( this.sprite.time, cc.p( this.sprite.moveX, this.sprite.moveY ) ));
//         cc.eventManager.addListener(gun_movement.clone(), this.gun );

//         var self = this;

//         var shoot_touch_listener = cc.EventListener.create({
// 		    event: cc.EventListener.TOUCH_ONE_BY_ONE,
// 	    	swallowTouches: true,
	    	
// 	    	onTouchBegan: function (touch, event) {	
// 			    this.bullet = new cc.Sprite.create(res.bullet_obj);
// 			    this.bullet.attr({
// 			    	x : launch_position_x,
// 			    	y : 0,
//         			time 	: 0.3,
//         			scale: 0.15
// 			    });
// 			    // scale                   =   typeof scale !== 'undefined' ? scale : 1;
// 			    self.addChild(this.bullet, 0);
// 				this.bullet.runAction(
// 					new cc.Sequence(
// 						cc.MoveTo.create( 0.05, cc.p( launch_position_x, 60 ) ),
// 						// cc.RotateBy.create(1, 1800),
// 						cc.MoveTo.create( this.bullet.time, cc.p( touch.getLocation().x, touch.getLocation().y ) ),
// 						// self.addChild(explosion, 0),
// 						// cc.FadeTo.create(0.2, 0)
						
// 					)
// 				);
// 				self.gun.runAction(
// 					new cc.Sequence(
// 						cc.MoveTo.create( 1.95, cc.p( launch_position_x, 35 ) ),
// 						cc.MoveTo.create( 0.05, cc.p( launch_position_x, 30 ) )
// 					)
// 				);
// 				// self.layer.runAction(
// 				// 	new cc.Sequence(
// 				// 		cc.RotateBy.create(0.1, 2),
// 				// 		cc.RotateBy.create(0.1, -2),
// 				// 		cc.RotateBy.create(0.1, 0)
// 				// 	)
// 				// );

// 				var markPoint = new cc.Sprite.create(res.sniper_point);
// 				markPoint.attr({
// 					x: touch.getLocation().x,
// 					y: touch.getLocation().y,
// 					scale: 0.5
// 				});

// 				self.addChild(markPoint);

// 				markPoint.runAction(
// 					new cc.Sequence(
// 						cc.RotateBy.create(0.13, 45),
// 						cc.RotateBy.create(0.3, -45),
// 						cc.scaleTo(0.5, 0.3),
// 						// cc.MoveTo.create( this.bullet.time, cc.p( touch.getLocation().x, touch.getLocation().y ) ),
// 						// self.addChild(explosion, 0),
// 						cc.FadeTo.create(0.2, 0),
						
// 					)
// 				);




// 				// cc.eventManager.addListener(self.hoverHandler.clone(), markPoint);
				
// 				// var markPoint2 = new cc.Sprite.create(res.sniper_point);
// 				// markPoint2.attr({
// 				// 	x: touch.getLocation().x,
// 				// 	y: touch.getLocation().y,
// 				// 	scale: 0.5
// 				// });
// 				// self.addChild(markPoint2);
// 				// markPoint2.runAction(
// 				// 	new cc.Sequence(
// 				// 		cc.RotateBy.create(0.1, -45),
// 				// 		cc.RotateBy.create(0.3, 45),
// 				// 		cc.scaleTo(0.5, 0.3),
// 				// 		cc.MoveTo.create( this.bullet.time, cc.p( touch.getLocation().x, touch.getLocation().y ) ),
// 				// 		// self.addChild(explosion, 0),
// 				// 		cc.FadeTo.create(0.2, 0),
						
// 				// 	)
// 				// );
// 			    // this.bullet.runAction( );

// 			    if(!this.dirty){
// 			    	this.dirty = true;
// 			    		cc.log(i, size.width-10 , Math.random() * ((size.width-10) - 10) + 10, 10, Math.round(Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN));
// 				        this.alien = new cc.Sprite.create(aliens[Math.round(Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN)]);
// 				    	var xPos =  Math.random() * ((size.width-10) - 10) + 10;
// 				    	this.alien.attr({
// 				    		x: xPos,
// 				    		y: size.height - 100,
// 				    		rotation: 0,
// 				    		scale: 0.3,
// 				    		time: 10 - (Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN)
// 				    	});
// 					    self.addChild(this.alien, 0);
// 					    this.alien.runAction(
// 					    	new cc.Sequence(
// 								cc.scaleTo(0.5, 0.3),
// 								// cc.MoveTo.create( this.alien.time, cc.p( xPos, 100 ) ),
// 								// self.addChild(explosion, 0),
// 								// cc.FadeTo.create(0.2, 0)
// 							)
// 						);
// 					cc.Director.getInstance().getScheduler().scheduleSelector(selector, this, interval, !this._isRunning);
// 				}

// //COLLISION PENDING


// 		    },
// 		    onTouchMoved: function (touch, event) {			

// 		    },
// 	    	onTouchEnded: function (touch, event) {

// 		    }
// 		});


// 			cc.eventManager.addListener(shoot_touch_listener.clone(), this.gun);

// 	        /*

// 	        cc.eventManager.addListener({
// 			    event: cc.EventListener.MOUSE,
// 			    onMouseMove: function (event) {
// 			    	var n = Math.floor(event.getLocationX());
//             		var m = Math.floor(event.getLocationY());
//             		if(m<yPos/2 && m>yPos/4){
//             			self.sprite.attr({
// 				            x 		: n,
// 				            y 		: (m/(yPos/2))*(m+yPos)
// 				        });
//             		}
// 				    // var touch = touches[0];
// 				    // var delta = touch.getDelta();
				    
// 				    // var node = event.getCurrentTarget();//.getChildByTag(TAG_TILE_MAP);
// 				    // var diff = cc.pAdd(delta, node.getPosition());
// 				    // node.setPosition(diff);
// 			    }
// 		    }, this);

// 		    */


// 	        // this.sprite = null;

//         // }

    	

//         return true;
//     },

//     update: function(){
//     	// if(this.bullet){
    		
// 			if (cc.rectContainsPoint(this.alien.getBoundingBox(), this.bullet.getLocation())){
// 				cc.log("Hit!");
// 			}else{
// 				cc.log("Not Hit!");
// 			}
//     	// }

//     }

//   //   init: function(){
// 		// this._super();

// 		// if( 'touches' in sys.capabilities ){
// 		// 	this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
// 		// 	this.setTouchEnabled(true);
// 		// }
//   //   },
// /*
// 	update: function(dt){
// 		this.checkCollide();
// 	},

// 	checkCollide: function(){
// 		var i, selChild, player = this.alien;
// 		for (var i = 0; i < this.bullet.length; i++) {
// 			selChild = this.bullet[i];
// 			if(this.collide(selChild, player)){
// 				cc.log("Hit!");
// 			}
// 		}
// 	},

// 	collide: function(a, b){
// 		var a2 = a.getParent().convertToWorldSpace(a.getPosition());
// 		var b2 = b.getParent().convertToWorldSpace(b.getPosition());

// 		var ax = a2.x, ay = a2.y, bx = b2.x, by = b2.y;

// 		var aRect = a.collideRect(ax, ay);
// 		var bRect = b.collideRect(bx, by);

// 		return cc.rectIntersectsRect(aRect, bRect);
// 	}
// 	*/

// });


var InfoLayer = cc.Layer.extend({
	sprite 		: null,
	dirty 		: false,
	gameDirt 	: false,
	titleText 	: "",
	subText 	: "",
	ctor		: function(){
		
		this._super();
		var size = cc.winSize;
		var self = this;

		if(!this.gameDirt){
			this.gameDirt = true;
			this.titleText = "Invade the Space";
			this.subText = "\n \n IMP: Use one bullet per kill \n \n (Note: This Game is under construction) \n \n Click to Play ";
		} else {
			this.gameDirt = false;
			this.dirty = false;
			this.titleText = "Game Over";
			this.subText = "\n Play Again";
		}

		this.sprite = new cc.Sprite(null);
		this.sprite.setPosition(size.width / 2, size.height/2 + 50);
		this.sprite.setScale(1);
		this.addChild(this.sprite, 0);

		var label = cc.LabelTTF.create(this.titleText, "Courier New", 50, cc.TEXT_ALIGNMENT_CENTER);
		label.setPosition(0, 60);
		this.sprite.addChild(label, 1); 
		
		var play_text = cc.LabelTTF.create(this.subText, "Courier New", 20, cc.TEXT_ALIGNMENT_CENTER);
		play_text.setPosition(0, -10);
		this.sprite.addChild(play_text, 1); 

		// this.sprite.runAction(cc.MoveTo.create(2, cc.p( size.width/2, size.height/2 + 50 )));
		self.sprite.runAction(
	    	new cc.Sequence(
				cc.scaleTo(0.1, 1.05),
				cc.scaleTo(0.1, 1)
			)
		);

		var infoListener = cc.EventListener.create({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
		    	swallowTouches: true,
		    	onTouchBegan: function (touch, event) {
		    		if(!self.dirty){
			    		self.dirty = true;
			    		// cc.log("DIRTY :: ", self.dirty);
						self.sprite.runAction(
				    		new cc.Sequence(
				    			cc.scaleTo(0.1, 0.95),
								cc.scaleTo(0.1, 1),
								cc.MoveTo.create(7, cc.p( size.width/2, -size.height/2 ) )
							)
						);
		    		}
		    	},
		    	onTouchMoved: function (touch, event) {
		    		// body...
		    	},
		    	onTouchEnded: function (touch, event) {
		    		// body...
		    	}
		    });

		cc.eventManager.addListener(infoListener.clone(), play_text);

		return true;
	}

});