// Ease and Wizz 2.1 : inOutBounce : Start and End keyframes
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

function easeandwizz_inBounce(t, b, c, d) {
	return c - easeandwizz_outBounce (d-t, 0, c, d) + b;
}

function easeandwizz_inOutBounce(t, b, c, d) {
	if (t < d/2) return easeandwizz_inBounce (t*2, 0, c, d) * .5 + b;
	else return easeandwizz_outBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
}



function easeAndWizz() {
	var n = 0;
	if (numKeys > 0) {
		n = nearestKey(time).index;
		if (key(n).time > time)	{ n-- }
	}

	// after the first two keys, yet before the last two, just do nothing
	if (n > 1 && n < numKeys -1 ) {
		return null;
	}

	try {
		var key1 = key(n);
		var key2 = key(n+1);
	} catch(e) {
		return null;
	}
	
	// determine how many dimensions the keyframes need
	var dim = 1; // It's gotta have at least ONE dimension
	try {
		key(1)[1];
		dim = 2;
		key(1)[2];
		dim = 3;
	} catch(e) {}

	t = time - key1.time;
	d = key2.time - key1.time;

	sX = key1[0];
	eX = key2[0] - key1[0];

	if (dim >= 2) {
		sY = key1[1];
		eY = key2[1] - key1[1];

		if (dim >= 3) {
			sZ = key1[2];
			eZ = key2[2] - key1[2];
		}
	}

	if ((time < key1.time) || (time > key2.time)) {
		return value;
	} else {
		val1 = easeandwizz_inOutBounce(t, sX, eX, d, a, p, s);
		switch (dim) {
			case 1:
			     return val1;
			     break;
			case 2:
			     val2 = easeandwizz_inOutBounce(t, sY, eY, d, a, p, s);
			     return [val1, val2];
			     break;
			case 3:
			     val2 = easeandwizz_inOutBounce(t, sY, eY, d, a, p, s);
			     val3 = easeandwizz_inOutBounce(t, sZ, eZ, d, a, p, s);
			     return [val1, val2, val3];
			     break;
			default:
			     return null;
		}
	}
}

(easeAndWizz() || value);

