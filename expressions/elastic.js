// Inertial Bounce (moves settle into place after bouncing around a little)
n = 0;
if (numKeys > 0){
	n = nearestKey(time).index;
	if (key(n).time > time){
	n--;
	}
}
if (n == 0){
	t = 0;
}else{
	t = time - key(n).time;
}

if (n > 0){
	v = velocityAtTime(key(n).time - thisComp.frameDuration);

	amp = .05;
	freq = 4.0;
	decay = 9.0;
	value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
}else{
		value;
}