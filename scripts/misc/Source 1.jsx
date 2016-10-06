Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};



comp = app.project.activeItem;

shapeLayer = comp.layers.addShape()
var shapeLayerContents = shapeLayer.property("Contents");




//$.writeln(shapeGroup.vertices);

  var myFile = File.openDialog("Please select input text file.");
  if (myFile != null){

        
    var fileOK = myFile.open("r");
    if (fileOK){        
        
        var osmData = myFile.read()
        myFile.close();
        
       var jsonObject = JSON.parse(osmData);
       // Get the size of an object
       var size = Object.size(jsonObject);
       //size= 1
       //$.writeln(size);
       for(var i=0; i<size;i++){
           var primStr = "prim"+String(i);
           var array1 = Array(jsonObject[primStr]);
//~             $.writeln(array1.length + ":" + size + ":" + i);
//~            for(var j=0; j < array1[0].length; j++){
//~                 var coords =array1[0][j];
//~                 $.writeln(coords);
//~          }
//~            var lon = JSON.parse(jsonObject[primStr])[0][1];
           //$.writeln("lat:"+ lat);
//~            //$.writeln("lon:"+ lon);
            var group = shapeLayerContents.addProperty("ADBE Vector Shape - Group");
            var shapeGroup = group.property("ADBE Vector Shape");           
            var shapePathData = new Shape();
            shapePathData.vertices = array1[0];
            shapePathData.closed = false;
            shapeGroup.setValue(shapePathData);         
            group.name = primStr;
            
    
       }
       
    }
  }




