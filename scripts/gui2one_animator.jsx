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

    addKeysBtn =  myPanel.add("button",[10,10,100,30] ,"Add Keys");
    myPanel.add("button",[10,50,100,70] ,"btn2");

    addKeysBtn.onClick = function(){
        var layer = app.project.activeItem.selectedLayers[0]
        var posProp = layer.property("Position");
        var startPos = posProp.value;
        $.writeln(startPos[0]);
        var posK1 = posProp.addKey(layer.time);
        $.writeln(posK1 + " : posK1");
        posProp.setInterpolationTypeAtKey(posK1,KeyframeInterpolationType.BEZIER); 
        
        var easeIn = new KeyframeEase(0.0,100.0);
        var easeOut = new KeyframeEase(0.75, 85);
        posProp.setTemporalEaseAtKey(posK1,[easeIn] ,[easeOut]);  
        
        var posK2 = posProp.addKey(layer.time - 0.5);
        $.writeln(posK2 + " : posK2");
        posProp.setValueAtTime(layer.time - 0.5, [startPos[0]-20,startPos[1]]);
        posProp.setInterpolationTypeAtKey(posK2,KeyframeInterpolationType.BEZIER);        
        var easeIn2 = new KeyframeEase(0.0,100.0);
        var easeOut2 = new KeyframeEase(0, 0.1);
        posProp.setTemporalEaseAtKey(posK1,[easeIn2] ,[easeOut2]);        
        
        var opacityProp = layer.property("Opacity");
        var startOpac = opacityProp.value;
        var opacK1 = opacityProp.addKey(layer.time);
        var opacK2 =opacityProp.addKey(layer.time - 0.5);
        opacityProp.setValueAtTime(layer.time - 0.5, 0.0);        
       
       
        for( o in app.project.activeItem){
            
//                $.writeln( app.project.activeItem[o] );
        }
    }
    

    return myPanel;

}

var animatorPanel = createUI(this);