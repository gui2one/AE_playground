// cut image in squares
function findCompByName(name){
    var myCompName = name;
    var myComp = null;
    for (var i = 1; i <= app.project.numItems; i ++){
      if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name == myCompName)){
        myComp = app.project.item(i);
        return myComp;
      }
    }
    if (myComp == null){
      alert("no luck");
    }else{
       alert ("got it");
    }  

}

function findFolderByName(name){
    var myFolderName = name;
    var myFolder = "";
    for (var i = 1; i <= app.project.numItems; i ++){
      if ((app.project.item(i) instanceof FolderItem) && (app.project.item(i).name == myFolderName)){
        myFolder = app.project.item(i);
        return myFolder;
      }
    }

    if (myFolder == ""){
        return 0
        }
}

function validTime(givenTime){

    var validTime = currentFormatToTime(  timeToCurrentFormat(givenTime ,25.0,false)  , 25.0 , false);    
    return validTime;
}


function loadRandValues(_filePath){

        var file =new File(_filePath);  
        file.open("r");

        data = file.read();

        file.close();

        data = data.replace("[","");
        data = data.replace("]","");

        values = data.split(",");

        return values;

}

function getRandValue(_index, _min, _max){
        

		if(_min == undefined) _min = 0.0;
		if(_max == undefined) _max = 1.0;
		var length = randValues.length
		var index = ((_index + 1) % length) -1;

		var delta = _max - _min;

        return (randValues[index] * delta)+_min;
           
}


function cutFootage(){
	
	
	var selectedFootage = app.project.activeItem;
	
	var width = selectedFootage.width;
	var height = selectedFootage.height;

	var comp = app.project.items.addComp(selectedFootage.name + "_SQUARES",width, height, 1.0, 5.0, 25.0);

	var ratio = height/width;
	var numSquaresWidth = 8;

	var animLength = 0.5;
	var startTime = 0.0;
	var numSquaresHeight = Math.floor(numSquaresWidth * ratio);


	var xOffset = 0.0;
	var yOffset = 0.0;
	var squareWidth = width / numSquaresWidth;
	var squareHeight = height / numSquaresHeight;

	var inc = 0;
	for (var i = 0; i < numSquaresWidth; i++) {

		
		for (var j = 0; j < numSquaresHeight; j++) {

			var randTime = getRandValue(inc,startTime,startTime + animLength);

			var randRotation = getRandValue(inc+222,-90.0,+90.0);

			var layer = comp.layers.add(selectedFootage,5.0);
			layer.threeDLayer = true;
			var newMask = layer.Masks.addProperty("Mask");
			newMask.inverted = false;
			newMask.property("Mask Expansion").setValue(1.0);
			var myMaskShape = newMask.property("maskShape");
			var myShape = myMaskShape.value;
			myShape.vertices = [
									[(squareWidth * i),(squareHeight * j)] ,
									[(squareWidth * i)+squareWidth,(squareHeight * j)],
									[(squareWidth * i)+squareWidth,(squareHeight * j) + squareHeight],
									[(squareWidth * i),(squareHeight * j) + squareHeight]
								];
			myShape.closed = true;
			myMaskShape.setValue(myShape);


			var pos = layer.property("Position");
			var keyIndex = pos.addKey(validTime(randTime));
			var easeIn = new KeyframeEase(0.5, 50);
			var easeOut = new KeyframeEase(0.0, 100);			
			pos.setTemporalEaseAtKey(keyIndex, [easeIn], [easeOut]);

			var posValue = [(squareWidth*i) + (squareWidth/2.0), (squareHeight*j) + (squareHeight/2.0) ,0.0];
			pos.setValueAtKey(keyIndex, posValue);
			layer.property("Anchor Point").setValue(posValue);

			keyIndex = pos.addKey(validTime(randTime+animLength));
			easeIn = new KeyframeEase(0.1, 0.1);
			easeOut = new KeyframeEase(0.0, 100);			
			pos.setTemporalEaseAtKey(keyIndex, [easeIn], [easeOut]);

			pos.setValueAtKey(keyIndex,[posValue[0], posValue[1], posValue[2] - 500.0]);
			


			var rotationValue = layer.property("Y Rotation");
			keyIndex = rotationValue.addKey(validTime(randTime));
			easeIn = new KeyframeEase(0.5, 50);
			easeOut = new KeyframeEase(0.0, 50);			
			rotationValue.setTemporalEaseAtKey(keyIndex, [easeIn], [easeOut]);			
			rotationValue.setValueAtKey(keyIndex, 0.0);

			keyIndex = rotationValue.addKey(validTime(randTime+animLength));
			easeIn = new KeyframeEase(0.1, 0.1);
			easeOut = new KeyframeEase(0.0, 100);			
			rotationValue.setTemporalEaseAtKey(keyIndex, [easeIn], [easeOut]);

			rotationValue.setValueAtKey(keyIndex,randRotation);			

			var opac = layer.property("Opacity");
			keyIndex = opac.addKey(validTime(randTime+(animLength*0.8)));			
			opac.setValueAtKey(keyIndex,100.0)	;

			keyIndex = opac.addKey(validTime(randTime+animLength));			
			opac.setValueAtKey(keyIndex,0.0)	;

			inc += 1;
						

		};
	};

	// alert( "Width : "+ numSquaresWidth+ " -- Height : "+ numSquaresHeight);
	




}

var randValues = loadRandValues("F:/TEMP/randomValues.txt");


cutFootage();