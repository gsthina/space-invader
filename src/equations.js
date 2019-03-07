var x, y, end, start;
function getNextPointFromLine(p2, p1, y, dt) {
	
	// Linear equations - Two point form - https://www.mathportal.org/calculators/analytic-geometry/two-point-form-calculator.php

	/*

	p1 = bulletPoint

	p2 = touchPoint

	*/

		// if(p2.x > p1.x){ // swap p1 and p2 on param as (p1, p2)
		// 	x = p1.x+1;
		// } else {
		// 	x = p1.x-1;
		// }
	
		// var y = (((p2.y - p1.y)/(p2.x - p1.x))*(x - p1.x)) + p1.y;
		
		// for (var i = start.x; i < (start.x-end.x); i++) {

			// if(p2.y > p1.y){ // swap p1 and p2 on param as (p2, p1)
			// 	y = p1.y+dt;
			// } else {
			// 	y = p1.y-dt;
			// }

			x = (((p2.x - p1.x)/(p2.y - p1.y))*(y - p1.y)) + p1.x;

			// cc.log(p2, p1, cc.p(x, y), dt);

		// }

		

		// cc.log(cc.p(x, y));

		return cc.p(x, y);

}

