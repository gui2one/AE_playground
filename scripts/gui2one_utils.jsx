function reloadFootage(){  
        
        var layers = app.project.activeItem.selectedLayers;
        if( layers.length != 1){
                writeLn("select one layer only");
               return;
            }
        //$.writeln(layers[0].source.footageMissing);
        if(layers[0].source.mainSource.reload == undefined){
            clearOutput();
            writeLn("not a footage layer");
            return;    
        }
        
        layers[0].source.mainSource.reload();
        clearOutput();
        writeLn("reloaded footage :");
        writeLn(layers[0].source);
    }


function trimToCursor( trimSide){

        
        var selectedLayers = app.project.activeItem.selectedLayers;
        var cursorTime =  app.project.activeItem.time;  
        if(selectedLayers.length == 0){
                clearOutput();
                writeLn("select at least one layer");
                return;
        }else{
            clearOutput();
            writeLn("trim to cursor function");
            writeLn(trimSide);     
            
            for(var i=0; i< selectedLayers.length; i++){
                    //$.write(selectedLayers[i].name+"  ");
                    //$.writeln(selectedLayers[i].inPoint + " ");
                    if( trimSide == 'in'){                        
                        var outSave = selectedLayers[i].outPoint;
                        selectedLayers[i].inPoint = cursorTime;
                        selectedLayers[i].outPoint = outSave;
                    }else if(trimSide == 'out'){
                        selectedLayers[i].outPoint = cursorTime + (1.0 / app.project.activeItem.frameRate);
                    }
                                     
            }
        }
    
        
}

function createUI(thisObj) {
    var myPanel = thisObj;
    
    var uiX = 10.0;
    var uiY  = 10.0;
    myPanel.add("statictext",[uiX, uiY,200,50],"gui2one utils");
    
    uiY += 30.0;
    var reloadButton = myPanel.add("button",[uiX,uiY,100,uiY+30] ,"reloadFootage");    
    reloadButton.onClick = function(){
             reloadFootage();
    }

    uiY += 30.0;
    var trimInButton= myPanel.add("button",[uiX,uiY,50,uiY+30] ,"trim IN");    
    trimInButton.onClick = function(){
             trimToCursor('in');
    }
    var trimOutButton= myPanel.add("button",[uiX+50,uiY,uiX+100,uiY+30] ,"trim OUT");    
    trimOutButton.onClick = function(){
             trimToCursor('out');
    }





    return myPanel;

}



var utilsPanel = createUI(this);