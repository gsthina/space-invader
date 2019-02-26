// Game = {}; 
// Game.scenes = []; 
// Game.scenes[1] = {}; 
// Game.layers = []; 
// Game.layers[1] = {}
var main_menu 			= [res.play_button, res.settings_button, res.credits_button, res.exit_button];
var sniper_points 		= [res.sniper_point];
var launch_position_x 	= 0;
var aliens 				= [res.alien_obj_1, res.alien_obj_2, res.alien_obj_3, res.alien_obj_4, res.alien_obj_5, res.alien_obj_6];


var ALIEN = {
	MIN 		: 0,	// Always 0
	MAX 		: 1,	// Depends up on the number of aliens available
	FREQENCY 	: 3,  	// seconds per object
	TRAVEL 		: 20, 	// value - (Math.random() * (ALIEN.MAX - ALIEN.MIN) + ALIEN.MIN)
	MIN_POWER 	: 1,
	MAX_POWER 	: 5
};

var QUAD = {
	ONE 		: 'Q1',
	TWO 		: 'Q2',
	THREE 		: 'Q3',
	FOUR 		: 'Q4'
}

var TIMER = 300;
var SCORE = 1;

var BULLET = {
	LIFETIME	: 1,
	LAUNCH_POS_X: 0,
	TRAVEL_TIME : 0.75,
	LIMIT 		: 10
}

var USER = {
	HEALTH_UNITS_GIVEN 	: 100,
	HEALTH_PERCENT  	: 100,
	HEALTH 				: 0
}