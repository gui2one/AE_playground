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


function createUI(thisObj) {
    var myPanel = thisObj;

    populateBtn =  myPanel.add("button",[10,10,100,30] ,"populate");
    myPanel.add("button",[10,50,100,70] ,"btn2");
    
    populateBtn.onClick = function(){
        var  workComp = findCompByName("nulls_02");
        var cubeComp = findCompByName("cube_1");
            for(var i=1; i<28   ; i++){
                    $.writeln(i);
                    var nullLayer = workComp.layers.byName("null"+i);
                    var cubeLayer = workComp.layers.add(cubeComp);
                   
                    cubeLayer.threeDLayer = true;

                    var nullX = nullLayer.property("Position").value[0];
                    $.writeln(nullX);
                    var nullY = nullLayer.property("Position").value[1];
                    var nullZ = nullLayer.property("Position").value[2];
                    
                    var scale = 100.0 / 5.12;
                    cubeLayer.parent = nullLayer;
                    cubeLayer.setParentWithJump(nullLayer);                  
                    cubeLayer.property("Position").setValue([0,0,0]);
                    cubeLayer.property("Scale").setValue([scale,scale,scale]);
                    cubeLayer.collapseTransformation = true;
                }
           
           
            
    }
    return myPanel;
}

$.writeln(this);

var myToolsPanel = createUI(this);