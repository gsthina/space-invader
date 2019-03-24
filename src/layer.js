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

        this._super();

        var size = cc.winSize;

        var menuItem1 = new cc.MenuItemImage(res.play_button_after, res.play_button_after, this.play);
        var menuItem2 = new cc.MenuItemFont("Feedback", this.feedback);
        var menuItem3 = new cc.MenuItemFont("Share", this.share);
        var menuItem4 = new cc.MenuItemFont("Exit", this.exit);

        menuItem1.setPosition(cc.p(size.width/2, (size.height/6)*5));
        menuItem2.setPosition(cc.p(size.width/2, (size.height/6)*4));
        menuItem3.setPosition(cc.p(size.width/2, (size.height/6)*3));
        menuItem4.setPosition(cc.p(size.width/2, (size.height/6)*2));

        menuItem1.setScale(0.5);

        var menu = new cc.Menu(menuItem1, menuItem2, menuItem3, menuItem4);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu);

        return true;
    },

    play: function(){
    	cc.log("MainMenuLayer :: play()");
    	cc.director.runScene(new GamePlayScene());
    },

    feedback: function(){
    	cc.log("MainMenuLayer :: feedback()");
    	// cc.director.runScene(new MainMenuScene());
    },

    share: function(){
    	cc.log("MainMenuLayer :: share()");
    	// cc.director.runScene(new MainMenuScene());
    },

    exit: function(){
    	cc.log("MainMenuLayer :: exit()");
    	// cc.director.runScene(new MainMenuScene());
    }

});

var FocusLayer = cc.Layer.extend({
	
	sniper 	: null,

	size 	: cc.winSize,

	ctor 	: function(){

		this._super();

		cc.log("FocusLayer :: ctor");

	},

	create: function(){

		cc.log("FocusLayer :: create");

		this.sniper = new cc.Sprite.create(res.sniper_point);

		this.sniper.attr({
			x: this.size.width/2,
			y: this.size.height/2,
			scale: 0.5,
			zIndex: 5
		});

		this.addChild(this.sniper);

		cc.eventManager.addListener(free_focus_listener.clone(), this);

		
	},

	getSniperPosition: function(){
		cc.log(this.sniper);
		return this.sniper.getPosition();
	}
});

var BackGroundLayer = cc.Layer.extend({
	sprite 	: null,
	focus 	: null,
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

var SplashScreenLayer = cc.Layer.extend({
	sprite 	: null,
	focus 	: null,
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

var ControlsLayer = cc.Layer.extend({
	
	button: null,

	size : cc.winSize,
 
	ctor: function(){

		cc.log("ControlsLayer :: ctor");

		this._super();

		// this.button = new cc.Sprite.create(res.launch_button_2);
		// this.button.attr({
		// 	x: this.size.width*0.2, 
		// 	y: this.size.height*0.1,
		// 	zIndex: 5,
		// 	scale: 0.5
		// });
		// this.addChild(this.button);



	},

	load: function(){

	}
})


var GamePlayLayer = cc.Layer.extend({
	gameover: false,
	timeup: false,
	dirty: false,
	gun: null,
	earth: null,
	healthLabel: "",
	controls: null,
	button: null,
	ctor: function(){

		this.bulletCount = BULLET.LIMIT;

		var size = cc.winSize;

		this._super();

		// Reference Variable 

		var self = this;

		// Launch Position 

	    launch_position_x = size.width/2;

	    // EARTH Sprite

	  //   this.earth = new cc.Sprite.create(res.earth_obj_3);
	  //   this.earth.attr({
	  //   	x: size.width/2,
			// y: -500,
			// scale: 1
	  //   });
	  //   this.addChild(this.earth, 0);

	    // EARTH Action

	 //    this.earth.runAction(
		// 	new cc.Sequence(
		// 		cc.MoveTo.create( 1.95, cc.p( launch_position_x, 35 ) ),
		// 		cc.MoveTo.create( 0.05, cc.p( launch_position_x, 30 ) )
		// 	)
		// );


		// GUN Sprite

		this.gun = new cc.Sprite.create(res.missile_obj_2);
		this.gun.attr({
			x: size.width/2,
			y: 10,
			rotation: -90,
			scale: 0.3
		});
	    this.addChild(this.gun);
	    cc.log("GUN : ", this.gun);

	    // GUN Action

	 //    this.gun.runAction(
		// 	new cc.Sequence(
		// 		cc.MoveTo.create( 1.95, cc.p( launch_position_x, 35 ) ),
		// 		cc.MoveTo.create( 0.05, cc.p( launch_position_x, 30 ) )
		// 	)
		// );

	    // GUN Listener

	    cc.eventManager.addListener(gun_movement.clone(), this.gun );

	    // Load Controls

	    // this.controls = new ControlsLayer();

	 //    this.button = new cc.Sprite.create(res.launch_button_2);
		// this.button.attr({
		// 	x: this.size.width*0.2, 
		// 	y: this.size.height*0.1,
		// 	zIndex: 5,
		// 	scale: 0.5
		// });
		// this.addChild(this.button);

		// this.setFocusAtCenter();

		

	    // Shoot Listener for Button

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
	    		}else{
	    			self.unscheduleUpdate(self.launchAlien);
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
		this.scoreLabel.setColor(cc.color(0, 0, 0));
		this.addChild(this.scoreLabel, 1);

		this.time = TIMER;
		this.timeText = cc.LabelTTF.create("Time: " + this.time, "Courier New", "30", cc.TEXT_ALIGNMENT_CENTER);
		this.timeText.setPosition(this.size.width*0.8, this.size.height*0.9);
		this.timeText.setColor(cc.color(0, 0, 0));
		this.addChild(this.timeText, 1);

		this.healthLabel = cc.LabelTTF.create("Health: " + USER.HEALTH_PERCENT, "Courier New", "30", cc.TEXT_ALIGNMENT_CENTER);
		this.healthLabel.setPosition(this.size.width*0.8, this.size.height*0.1);
		this.healthLabel.setColor(cc.color(0, 0, 0));
		this.addChild(this.healthLabel, 1);

		this.bulletCountLabel = cc.LabelTTF.create("Bullets: " + BULLET.LIMIT, "Courier New", "30", cc.TEXT_ALIGNMENT_CENTER);
		this.bulletCountLabel.setPosition(this.size.width*0.2, this.size.height*0.1);
		this.bulletCountLabel.setColor(cc.color(0, 0, 0));
		this.addChild(this.bulletCountLabel, 1);

        var menuItem1 = new cc.MenuItemImage(res.restart_button_after, res.restart_button_after, this.mainmenu);
        var menuItem2 = new cc.MenuItemImage(res.pause_button_after, res.pause_button_after, this.pause);
        var menuItem3 = new cc.MenuItemImage(res.restart_button_after, res.restart_button_after, this.restart);

        menuItem1.setPosition(cc.p((size.width/10)*9, (size.height/20)*15));
        menuItem2.setPosition(cc.p((size.width/10)*9, (size.height/20)*13));
        menuItem3.setPosition(cc.p((size.width/10)*9, (size.height/20)*11));

        menuItem1.setScale(0.3);
        menuItem2.setScale(0.3);
        menuItem3.setScale(0.3);

        var menu = new cc.Menu(menuItem1, menuItem2, menuItem3);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu);

	},

	mainmenu: function(){
		cc.log("GamePlayLayer :: mainmenu()");
		//
	},

	pause: function(){
		cc.log("GamePlayLayer :: pause()");
		//
	},

	restart: function(){
		cc.log("GamePlayLayer :: restart()");
		//
	},

	setFocusAtCenter: function(){
		
		// SHOT FOCUS

		// this.focus = new FocusLayer();
		// this.addChild(this.focus);
		// this.focus.create();

	},

	loadBullets: function(limit){
		for (var i = 0; i < limit; i++) {
			// var ammo[i] = 
		}
	},

	time: "00",
	levelUp: false,

	runTimer: function(endTime){
		// this.timeup = true;
		var self = this;
		this.updateScore(0);
		var incrementTime = function(){
			if(parseInt(self.time)<=0 || self.gameover){
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

	stopTimer: function(){

	},

	info: InfoLayer,

	endGame: function(){
		this.sprite = new cc.Sprite(null);
		this.sprite.setPosition(this.size.width / 2, this.size.height/2 + 50);
		this.sprite.setScale(0);
		this.addChild(this.sprite, 0);

		var label = cc.LabelTTF.create("Thank you!", "Courier New", 50, cc.TEXT_ALIGNMENT_CENTER);
		label.setPosition(0, 60);
		label.setColor(cc.color(0, 0, 0));
		this.sprite.addChild(label, 1); 
		
		var play_text = cc.LabelTTF.create("Please share your score and feedbacks! \n \n Reload to Invade the Space!", "Courier New", 20, cc.TEXT_ALIGNMENT_CENTER);
		play_text.setPosition(0, -10);
		label.setColor(cc.color(0, 0, 0));
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

		this.gameover = true;

	},

	alien: null,
	powerDirt: false,
	scoreDirt: false,

	update: function(dt){

		this.alien 	=   typeof this.alien !== 'undefined' ? this.alien : new cc.Sprite.create(aliens[Math.round(Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN)]);

		this.alien = this.alien!==null ? this.alien : new cc.Sprite.create(aliens[Math.round(Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN)]);

		var bulletPos = this.bullet.getPosition();

		var tempTouch = cc.p(0,0);

		var self = this;

				for (var j = 0; j < this.aliensArray.length; j++) {

					for (var i = 0; i < this.bulletsArray.length; i++){
					
						bulletPos = this.bulletsArray[i].getPosition();

						if (cc.rectContainsPoint(this.aliensArray[j].getBoundingBox(), bulletPos)) {// || cc.rectContainsPoint(this.aliensArray[j].getBoundingBox(), this.earth.getBoundingBox())){
							
							cc.log("Hit!");

							this.bulletHide = true;

							// ALIEN STRENGTH

							if (this.aliensArray[j].strength>1){ 

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
									this.powerDirt = (this.aliensArray[j].strength>0) ? false : true;
								}
							
							} else {

								// IF ALIEN STRENGTH == 0
								
								cc.log("Killing ALIEN Sprite - XXXXXXXXXXXXXXXXXXXXXXXX");
								
								this.aliensArray[j].runAction(
									new cc.Sequence(
										cc.scaleTo(0.05, 0.15),
										cc.scaleTo(0.2, 0)
									)
								);

								this.updateScore(this.aliensArray[j].points);

								// this.aliensArray.splice(j, 1);
								setTimeout(function() {
									if(!self.scoreDirt){
										self.scoreDirt = true;
										// self.updateScore(self.aliensArray[j].points);
										self.killAlienSprite(self.aliensArray[j], j);
									}
								}, 250);

							}

							this.killSprite(this.bullet);
							
							this.bulletsArray = [];

						}else if(!this.bulletHide){
							cc.log("Not Hit!");
						}

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
				if(this.aliensArray[j].y <= -10){
					damage = this.aliensArray[j].strength;
					// cc.log("User health update", damage, this.aliensArray[j].y );
					// cc.log("Sprite pos after intrusion", this.aliensArray[j].y );
					USER.HEALTH_UNITS_GIVEN -= damage;
					this.updateHealthText(USER.HEALTH_UNITS_GIVEN);
					this.killSprite(this.aliensArray[j]);
					this.aliensArray.splice(j, 1);
				} else {
					// if(this.aliensArray[j].points>=ALIEN.LIFE_OBJ){
					// 	USER.HEALTH_UNITS_GIVEN += this.aliensArray[j].points;
					// 	this.updateHealthText(USER.HEALTH_UNITS_GIVEN);
					// 	this.killSprite(this.aliensArray[j]);
					// 	this.aliensArray.splice(j, 1);
					// }
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

		if(score<1){
			this.powerUpUserHealth(score);
		} else {
			this.scoreText += score;

			cc.log("Score: " + this.scoreText);

			this.scoreLabel.setString("Score: " + this.scoreText);

			this.scoreLabel.runAction(
		    	new cc.Sequence(
					cc.scaleTo(0.1, 1.05),
					cc.scaleTo(0.1, 1)
				)
			);
		}
	},
	
	powerUpUserHealth: function(power){
		USER.HEALTH_UNITS_GIVEN += power;
		this.updateHealthText(USER.HEALTH_UNITS_GIVEN);
	},

	bullet: null,
	bulletHide: false,
	renderTex: null,
	touch: null,
	event: null,
	isBulletEmpty: false,
	bulletCount: 0,

	updateBulletCountText: function(count){
		this.bulletCountLabel.setString("Bullets: " + count.toString());
		if(count<=1){
			this.bulletCountLabel.setString("Bullets: 0");
			this.endGame();
		}
	},

	launchBullet: function(touch, event){

		this.touch = touch;
		this.event = event;
		
		cc.log("Touch: ", touch, "Event: ", event);

		this.powerDirt = false;
		this.scoreDirt = false;

		var self = this;

		// Bullet 

		var bullet;

if(!this.gameover && !this.isBulletEmpty){

		if(this.bulletCount>1){
			this.isBulletEmpty = false;
			this.updateBulletCountText(--this.bulletCount);
		} else {
			this.isBulletEmpty = true;
			this.gameover = true;
		}

		cc.log("Bullet Count :: ", this.bulletCount);
		cc.log("Bullet Empty :: ", this.isBulletEmpty);

		if (this.bullet!=null){
			this.bullet = null;
		} else {
			this.bullet = bullet;
		}

		bullet = new cc.Sprite.create(res.bullet_obj);

		// var pos = this.focus.getSniperPosition();

		// cc.log(this.focus.sniper.getPosition());

		// var endPoint = getNextPointFromLine(this.focus.sniper.getPosition(), cc.p(launch_position_x, 0), this.size.height, 1); // USING FOCUS and BUTTON TO LAUNCH BULLET
		

		if(event!=null){

			bullet.attr({
				x 		: launch_position_x,
		    	y 		: 0,
				time 	: BULLET.TRAVEL_TIME,
				scale 	: 0.15
				// strength: 3
			});


			var endPoint = getNextPointFromLine(touch.getLocation(), cc.p(launch_position_x, 0), this.size.height, 1); // USING TOUCH TO LAUNCH BULLET

			this.addChild(bullet, 1);
			// cc.log(bullet, cc.p( this.touch.getLocation().x, this.touch.getLocation().y ));
			var travelTime = bullet.time;// self.touch.getLocation().y / (bullet.time * 1000);
			cc.log("Bullet Travel Time :: ",  travelTime);
			bullet.runAction(
				new cc.Sequence(
					cc.MoveTo.create( 0.05, cc.p( launch_position_x, 60 ) ),
					// cc.MoveTo.create( travelTime, cc.p( self.touch.getLocation().x, self.touch.getLocation().y ) ),
					cc.MoveTo.create( travelTime, endPoint),
					cc.FadeTo.create(0.2, 0)
				)
			);

			this.bulletsArray.push(bullet);
			this.bullet = bullet;


			// this.createShotFocus(touch.getLocation());

			// this.bulletTravel();
			this.scheduleUpdate();
		} else {  // BULLET FROM ALIEN

			bullet.attr({
				x 		: touch.x,
		    	y 		: touch.y-50,
				time 	: BULLET.TRAVEL_TIME,
				scale 	: 0.15
				// strength: 3
			});

			var endPoint = getNextPointFromLine(touch, cc.p(launch_position_x, 0), 0, 1); // USING ALIEN POSITION TO LAUNCH BULLET
			cc.log("ENDPOINT :: ", endPoint);
			this.addChild(bullet, 1);
			// cc.log(bullet, cc.p( this.touch.getLocation().x, this.touch.getLocation().y ));
			var travelTime = bullet.time;//self.touch.y / (bullet.time * 1000);
			cc.log("Bullet Travel Time :: ",  travelTime);
			bullet.runAction(
				new cc.Sequence(
					// cc.MoveTo.create( 0.05, cc.p( launch_position_x, 60 ) ),
					// cc.MoveTo.create( travelTime, cc.p( self.touch.getLocation().x, self.touch.getLocation().y ) ),
					cc.MoveTo.create( travelTime, endPoint),
					cc.FadeTo.create(0.15, 0)
				)
			);

			this.bulletsArray.push(bullet);
			this.bullet = bullet;


			// this.createShotFocus(touch.getLocation());

			// this.bulletTravel();
			this.scheduleUpdate();
		}
				// this.unscheduleUpdate();

		// setTimeout(function(){
		// 	// self.bulletHide = true;
		// 	// self.removeChild(bullet); // remove sprite of layer
		// 	// self.removeChild(self.bullet); // remove sprite of layer
		// 	cc.log("UNSCHEDULE");
		// 	self.unscheduleUpdate();
		// 	// cc.log(self.bullet, bullet);
  //        //layer.removeChildByTag(1); // remove sprite by tag
  //        //layer.removeAllChildren(); // remove all children
  //        //layer.removeFromParent(); // remove from parent
  //       }, BULLET.LIFETIME*1000); // after 20 seconds

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

    alienLinearMovement 		: true,
	alienRandomLinearMovement 	: false,
	alienZigzagMovement 		: false,
	alienAttackMovement 		: false,

	launchAlien: function(touch){
		// cc.log("launchAlien :: ", touch);

		if(this.gameover){
			this.unschedule(this.launchAlien);
		}

		var size = cc.winSize;

		var self = this;

		var xPos =  Math.random() * ((size.width-10) - 10) + 10;
		var number = Math.round(Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN);
		var power = (number==ALIEN.LIFE_OBJ)?1:(1 + Math.round(Math.random() * (ALIEN.MAX_POWER - ALIEN.MIN_POWER) + ALIEN.MIN_POWER));
		var rotate = (number==ALIEN.LIFE_OBJ)?90:0;
		var point = this.getPoints(number);

		this.alien = new cc.Sprite.create(aliens[number]);

		this.alien.attr({
			x: xPos,
			y: size.height,
			rotation: 90,
			scale: power * 0.1,
			time: ALIEN.TRAVEL - power - (Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN),
			strength: power
		});


		this.alien.points = (point==1)?power:point;

		cc.log("POINTS :: ", this.alien.points);

		if(this.alienZigzagMovement || this.alienAttackMovement){ // level 3
			this.alienLinearMovement 	  	= false;
			this.alienRandomLinearMovement	= false;
			if(!this.timeup){
				this.aliensArray.push(this.alien);
			    this.addChild(this.alien, 0);
			    this.alien.runAction(
			    	new cc.Sequence(
						cc.MoveTo.create( this.alien.time/5, cc.p( this.getRandomPosition(xPos), 8 * this.size.height/10 ) ),
						cc.MoveTo.create( this.alien.time/5, cc.p( this.getRandomPosition(xPos), 6 * this.size.height/10 ) ),
						cc.MoveTo.create( this.alien.time/5, cc.p( this.getRandomPosition(xPos), 4 * this.size.height/10 ) ),
						cc.MoveTo.create( this.alien.time/5, cc.p( this.getRandomPosition(xPos), 2 * this.size.height/10 ) ),
						cc.MoveTo.create( this.alien.time/5, cc.p( this.getRandomPosition(xPos), -10 ) ),
						cc.FadeTo.create(0.2, 0)
					)
				);
			}

			if(this.alienAttackMovement){ // level 4
				this.alienLinearMovement 	  	= false;
				this.alienRandomLinearMovement	= false;
				this.alienZigzagMovement 		= false;


				// this.launchBullet(this.alien.getPosition(), null);
			}

		} else if (this.alienRandomLinearMovement) { // level 2

			this.alienLinearMovement 	  	= false;
			this.alienZigzagMovement 		= false;
			this.alienAttackMovement 		= false;

			if(!this.timeup){
				this.aliensArray.push(this.alien);
			    this.addChild(this.alien, 0);
			    this.alien.runAction(
			    	new cc.Sequence(
						cc.MoveTo.create( this.alien.time, cc.p( this.getRandomPosition(xPos), -10 ) ),
						cc.FadeTo.create(0.2, 0)
					)
				);
			}
		} else if (this.alienLinearMovement) { // level 1
			this.alienRandomLinearMovement	= false;
			this.alienZigzagMovement 		= false;
			this.alienAttackMovement 		= false;

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

		} else {
			cc.log("Please check Movement config of aliens");
		}
	
	},

	position: true,

	getRandomPosition(x){
		// this.position = !this.position;
		if(this.position){
			cc.log("New Pos: ", Math.round(Math.random() * (this.size.width - this.size.width/10) + this.size.width/10));
			return Math.round(Math.random() * (this.size.width - this.size.width/10) + this.size.width/10);
		}
	},

	getPoints(n){

		if(n>0&&n<6){
			return 1;
		} else if (n==6){
			return -10;
		} else if (n>6&&n<10){
			return -(n-4);
		} else {
			cc.log("ALIENs mis leaded");
			return 0;
		}

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


		cc.eventManager.addListener(free_touch_listener.clone(), focus);

		// focus.runAction(
		// 	new cc.Sequence(
		// 		cc.RotateBy.create(0.1, 45),
		// 		cc.RotateBy.create(0.2, -45),
		// 		cc.scaleTo(0.4, 0.3),
		// 		cc.FadeTo.create(0.2, 0)
		// 	)
		// );
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
		label.setColor(cc.color(0, 0, 0));
		this.sprite.addChild(label, 1); 
		
		var play_text = cc.LabelTTF.create(this.subText, "Courier New", 20, cc.TEXT_ALIGNMENT_CENTER);
		play_text.setPosition(0, -10);
		play_text.setColor(cc.color(0, 0, 0));
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
								cc.scaleTo(0.2, 0)//,
								// cc.MoveTo.create(7, cc.p( size.width/2, -size.height/2 ) )
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