// Ease and Wizz 2.1 : Curvaceous : outBounce : start and end keyframes
// Ian Haigh (http://ianternet.net/ease-and-wizz/)
// Last built: 2015-08-07T15:45:18+10:00

// some defaults
var p = 0.81;		// period for elastic
var a = 50;		// amplitude for elastic
var s = 1.70158;	// overshoot amount for "back"

function easeandwizz_outBounce(t, b, c, d) {
	if ((t/=d) < (1/2.75)) { return c*(7.5625*t*t) + b }
	else if (t < (2/2.75)) { return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b }
	else if (t < (2.5/2.75)) { return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b } 
	else { return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b }
}



function easeAndWizz() {
	try {
		var key1 = key(1);
		var key2 = key(numKeys);
	} catch(e) {
		return null;
	}
	
	t = time - key1.time;
	d = key2.time - key1.time;

	sX = key1.time;
	eX = key2.time - key1.time;


	if ((time < key1.time) || (time > key2.time)) {
		return null;
	} else {
		return valueAtTime(easeandwizz_outBounce(t, sX, eX, d));
	}
}

(easeAndWizz() || value);

