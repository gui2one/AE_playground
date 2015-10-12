// Ease and Wizz 2.1 : Curvaceous : outCirc : start and end keyframes
// Ian Haigh (http://ianternet.net/ease-and-wizz/)
// Last built: 2015-08-07T15:45:18+10:00

// some defaults
var p = 0.81;		// period for elastic
var a = 50;		// amplitude for elastic
var s = 1.70158;	// overshoot amount for "back"

function easeandwizz_outCirc(t, b, c, d) {
	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
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
		return valueAtTime(easeandwizz_outCirc(t, sX, eX, d));
	}
}

(easeAndWizz() || value);

