Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var myFile = File.openDialog("Please select input JSON file.");
var filename = String(myFile).replace(/^.*[\\\/]/, '');
 if (myFile != null){
        comp = app.project.activeItem;
 
        if(comp == null){
                comp = app.project.items.addComp(filename,1920,1080,1.0,10.0,25.0);
        }
        nullLayer = comp.layers.addNull()

        shapeLayer_primary = comp.layers.addShape();
        shapeLayer_primary.parent = nullLayer;
        shapeLayer_primary.name = "ways_primary"; 
        var contents_primary = shapeLayer_primary.property("Contents");

        shapeLayer_secondary = comp.layers.addShape();
        shapeLayer_secondary.parent = nullLayer;
        shapeLayer_secondary.name = "ways_secondary";
        var contents_secondary = shapeLayer_secondary.property("Contents");

        shapeLayer_tertiary = comp.layers.addShape();
        shapeLayer_tertiary.parent = nullLayer;
        shapeLayer_tertiary.name = "ways_tertiary";
        var contents_tertiary = shapeLayer_tertiary.property("Contents");

        shapeLayer_buildings = comp.layers.addShape();
        shapeLayer_buildings.parent = nullLayer;
        shapeLayer_buildings.name = "buildings";
        var contents_buildings = shapeLayer_buildings.property("Contents");

        shapeLayer_misc = comp.layers.addShape();
        shapeLayer_misc.parent = nullLayer;
        shapeLayer_misc.name = "misc";
        var contents_misc = shapeLayer_misc.property("Contents");





        
    var fileOK = myFile.open("r");
    if (fileOK){        
        
        var osmData = myFile.read()
        myFile.close();
        
       var jsonObject = JSON.parse(osmData);
       // Get the size of an object
       var size = Object.size(jsonObject);

       $.writeln(size);
        for(var i=0; i<size;i++){
            var primStr = "polygon_"+String(i);
            var type = jsonObject[primStr].type;
            var coords = jsonObject[primStr].coordinates;


            if( type == "primary"){
                var group = contents_primary.addProperty("ADBE Vector Shape - Group"); 
            }else if( type == "secondary"){
                 var group = contents_secondary.addProperty("ADBE Vector Shape - Group");
            }else if( type == "tertiary"){
                 var group = contents_tertiary.addProperty("ADBE Vector Shape - Group");
            }else if( type == "building"){
                 var group = contents_buildings.addProperty("ADBE Vector Shape - Group");
            }else{
                 var group = contents_misc.addProperty("ADBE Vector Shape - Group");
            }
        
                group.name = primStr;
                var shapeGroup = group.property("ADBE Vector Shape");           
                var shapePathData = new Shape();
                shapePathData.vertices = coords;
                if(type == "building"){
                    shapePathData.closed = true;
                }else{
                    shapePathData.closed = false;
                }
                shapeGroup.setValue(shapePathData);       
//~     
        }
       //END FOR
       

       var stroke_primary  = contents_primary.addProperty("ADBE Vector Graphic - Stroke");
       stroke_primary.property("Stroke Width").setValue(0.1);
       
       var stroke_secondary  = contents_secondary.addProperty("ADBE Vector Graphic - Stroke");
       stroke_secondary.property("Stroke Width").setValue(0.06);       
       
       var stroke_tertiary  = contents_tertiary.addProperty("ADBE Vector Graphic - Stroke");
       stroke_tertiary.property("Stroke Width").setValue(0.03);         
       
       var stroke_misc  = contents_misc.addProperty("ADBE Vector Graphic - Stroke");
       stroke_misc.property("Stroke Width").setValue(0.03);  
       var trim_misc  = contents_misc.addProperty("ADBE Vector Filter - Trim");
       trim_misc.property("Start").setValue(10.0);
       trim_misc.property("Offset").expression = "time * 100.0";
       $.writeln(trim_misc.property("Offset").value);          
       
       var stroke_buildings = contents_buildings.addProperty("ADBE Vector Graphic - Stroke");
       stroke_buildings.property("Color").setValue([0.6, 0.6, 0.6]);
       stroke_buildings.property("Stroke Width").setValue(0.03);   
       
       var fill_buildings = contents_buildings.addProperty("ADBE Vector Graphic - Fill");
       fill_buildings.property("Color").setValue([0.3,.3,.3]);

    }


  // END IF(fileOK)
  }
// ENF IF (myFile != null)




