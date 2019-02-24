//Create a "one by one" touch event listener (processes one touch at a time)
    var free_touch_listener = cc.EventListener.create({
	    event: cc.EventListener.TOUCH_ONE_BY_ONE,
		// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
	    swallowTouches: true,
		//onTouchBegan event callback function						
	    onTouchBegan: function (touch, event) {	
			// event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.	
		    var target = event.getCurrentTarget();	
		    
			//Get the position of the current point relative to the button
		    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
		    var s = target.getContentSize();
		    var rect = cc.rect(0, 0, s.width, s.height);
		    
			//Check the click area
		    if (cc.rectContainsPoint(rect, locationInNode)) {		
			    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
			    target.opacity = 180;
			    return true;
		    }
		    return false;
	    },
		//Trigger when moving touch
	    onTouchMoved: function (touch, event) {			
		    //Move the position of current button sprite
			var target = event.getCurrentTarget();
		    var delta = touch.getDelta();
		    target.x += delta.x;
		    target.y += delta.y;
	    },
		//Process the touch end event
	    onTouchEnded: function (touch, event) {			
		    var target = event.getCurrentTarget();
		    cc.log("sprite onTouchesEnded.. ");
		    target.setOpacity(255);
			//Reset zOrder and the display sequence will change
		    // if (target == sprite2) {					
		    // 	sprite1.setLocalZOrder(100);
		    // } else if (target == sprite1) {
		    // 	sprite1.setLocalZOrder(0);
		    // }
	    }
    });


    var gun_movement = cc.EventListener.create({
	    event: cc.EventListener.TOUCH_ONE_BY_ONE,
		// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
	    swallowTouches: true,
		//onTouchBegan event callback function						
	    onTouchBegan: function (touch, event) {	
			// event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.	
		    var target = event.getCurrentTarget();	
			//Get the position of the current point relative to the button
		    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
		    var s = target.getContentSize();
		    var rect = cc.rect(0, 0, s.width, s.height);
		    
			//Check the click area
		    if (cc.rectContainsPoint(rect, locationInNode)) {		
			    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
			    target.setScale(0.4);
			    // target.opacity = 180;
			    return true;
		    }
		    return false;
	    },
		//Trigger when moving touch
	    onTouchMoved: function (touch, event) {			
		    //Move the position of current button sprite
		    var size = cc.winSize;
			var target = event.getCurrentTarget();
			target.setScale(0.4);
		    var delta = touch.getDelta();
		    target.x += delta.x;
		    if(target.x>size.width){
		    	target.x = size.width-10;
		    } else if(target.x < 0){
		    	target.x = 10;
		    }
		    launch_position_x = target.x;
		    // new GamePlayLayer().launchBullet(touch, event);
	    	// cc.log("GUN MOVED");
		    // target.y += delta.y;
	    },
		//Process the touch end event
	    onTouchEnded: function (touch, event) {			
		    var target = event.getCurrentTarget();
		    cc.log("sprite onTouchesEnded.. ");
		    target.setOpacity(255);
		    target.setScale(0.3);
		    launch_position_x = target.x;
	    }
    });


    
    var launch_event_listener = cc.EventListener.create({
    	event: cc.EventListener.TOUCH_ONE_BY_ONE,
    	swallowTouches: true,
    	sprite: null,
    	layer: MainMenuLayer,
    	onTouchBegan: function (touch, event) {	
    		var target = event.getCurrentTarget();	
			//Get the position of the current point relative to the button
		    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
		    var s = target.getContentSize();
		    var rect = cc.rect(0, 0, s.width, s.height);
		    
			//Check the click area
		    if (cc.rectContainsPoint(rect, locationInNode)) {		
			    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
			    target.setScale(0.6);

			    this.sprite = new cc.Sprite.create(sniper_points[i]);
			    this.layer.addNew(this.sprite);
			    // target.opacity = 180;
			    return true;
		    }
		    return false;
	    },
	    onTouchMoved: function (touch, event) {			

	    },
    	onTouchEnded: function (touch, event) {
    		var target = event.getCurrentTarget();				
    		target.setScale(0.4);

	    }
    });

    var hoverHandler = cc.EventListener.create({
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