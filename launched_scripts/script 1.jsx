//alert("what ???!");

var findAllShapes = function(_shapeLayer){
    // $.writeln(_shapeLayer["ADBE Vector Shape - Group"]);

    var shapesArray = [];
    // $.writeln(_shapeLayer["ADBE Root Vectors Group"]);
    var numProperties = _shapeLayer["ADBE Root Vectors Group"].numProperties
    // $.writeln(numProperties);

    for (var i = 0; i < numProperties; i++) {
        if( _shapeLayer["ADBE Root Vectors Group"](i+1).matchName == "ADBE Vector Shape - Group") {
            shapesArray.push(_shapeLayer["ADBE Root Vectors Group"](i+1));

        }
    }
    return shapesArray;
}

var findAllSelectedShapes = function(_shapeLayer){

    $.writeln("-------------------"+_shapeLayer.selectedProperties[0].name);

    var shapesArray = [];
    // $.writeln(_shapeLayer["ADBE Root Vectors Group"]);
    var numProperties = _shapeLayer["ADBE Root Vectors Group"].numProperties;
    // $.writeln(numProperties);

    for (var i = 0; i < numProperties; i++){
        $.writeln(":::::::::::::::::::::::"+_shapeLayer["ADBE Root Vectors Group"](i+1).name);
        if( _shapeLayer["ADBE Root Vectors Group"](i+1).matchName == "ADBE Vector Shape - Group" && _shapeLayer["ADBE Root Vectors Group"](i+1).selected) {
            shapesArray.push(_shapeLayer["ADBE Root Vectors Group"](i+1).index);

        }
    }
    return shapesArray;
}

var curComp = app.project.activeItem;
var paths = [];
var selectedShapes = [];
var dupli;
app.beginUndoGroup("extract shapes");
$.writeln("!!!!!!!!!!!!!!!!");
if(curComp){


    var curLayer = curComp.selectedLayers[0];

    if(curLayer)
    {
        $.writeln(" hhhaaaa --->"+curLayer.selectedProperties[0].matchName);
        var shapes = findAllSelectedShapes(curLayer);
        for (var i = shapes.length-1; i >=0 ; i--) {
            $.writeln(shapes[i]);
            //shapes[i].remove()
        }

        // dupli = curLayer.duplicate();
        // dupli.name = curLayer.name +"__extract_shape";
        // $.writeln(" First off ");
        // $.writeln(curLayer.selectedProperties[0].matchName);

        // for(var i=0; i<curLayer.selectedProperties.length; i++){

        // 	if(curLayer.selectedProperties[i].matchName == "ADBE Vector Shape - Group"){

        // 		$.writeln("shape name :" + curLayer.selectedProperties[i].name);
        // 		selectedShapes.push( curLayer.selectedProperties[i].name);
        // 	}
        // }
        
        // $.writeln(":::::::::::::::::::::::::::::::::::::::::");
        

        
        
        


        
    }
}






app.endUndoGroup();



