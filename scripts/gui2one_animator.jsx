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

function offsetLayersTime(frames){
    app.beginUndoGroup("Offset Layers Time");
    var inc = 0.0;    
    var numSelected = app.project.activeItem.selectedLayers.length;
    for (var i=0; i < numSelected; i++ ){
            var layer = app.project.activeItem.selectedLayers[i];            

//~             $.writeln(layer.startTime);
            layer.startTime = validTime(layer.startTime + inc);
            
            inc += frames / 25.0;
    }

    app.endUndoGroup();
}

function alignLayers(){    
    app.beginUndoGroup("Align Layers");
        var numSelected = app.project.activeItem.selectedLayers.length;
        for (var i=0; i < numSelected; i++ ){
            var layer = app.project.activeItem.selectedLayers[i];

            var minTime = 1000.0;            
            if(layer.startTime < minTime){
                    minTime = layer.startTime;
            }
            
    }

    for (var i=0; i < numSelected; i++ ){
        var layer = app.project.activeItem.selectedLayers[i];
        if(layer.name != "anonymous"){            
            layer.startTime = minTime;            
            $.writeln(layer.time * 25.0);
        }
    }
        
    app.endUndoGroup();        
}


function validTime(givenTime){

    var validTime = currentFormatToTime(  timeToCurrentFormat(givenTime ,25.0,false)  , 25.0 , false);    
    return validTime;
}

function distance(x1, x2, y1, y2){
    return (Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) ));
}

function ease2keys(_power){

        EASE_POWER = _power;
        app.beginUndoGroup("ease 2 keys");
        var numSelected = app.project.activeItem.selectedLayers.length;
        for (var i=0; i < numSelected; i++ ){
            var layer = app.project.activeItem.selectedLayers[i];

            var easeIn = new KeyframeEase(0.0,EASE_POWER);
            var easeOut = new KeyframeEase(0.0, EASE_POWER);
             

            for ( var j=0 ; j < layer.selectedProperties.length; j++){
                prop = layer.selectedProperties[j];
                isGroup = prop.propertyType == PropertyType.NAMED_GROUP;
                isPropertyGroup = prop.property != undefined // tries to find "property" function, if it does find it, then it's property group
                
                
                if(isPropertyGroup)
               {
                    for(var i=0; i< prop.numProperties; i++){
                            if(prop.property(i+1).selected){
                                prop = prop.property(i+1);
                                break;
                                }
                    }
               }

                switch (prop.propertyValueType)
                {
                    
                        case PropertyValueType.OneD:
                            writeLn("-->  PropertyValueType.OneD");
                            
                            for( var i=0; i < prop.selectedKeys.length; i++){
                                    var easeIn = new KeyframeEase(0.0,EASE_POWER);
                                    var easeOut = new KeyframeEase(0.0, EASE_POWER);

                                    if(i == 0) { 
                                        prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeIn] ,[easeOut]); 

                                                  
                                    }
                                    if(i == 1) { 
                                        prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeOut] ,[easeIn]);
                                        // prop.setInterpolationTypeAtKey(prop.selectedKeys[i],KeyframeInterpolationType.LINEAR);
                                                  
                                    }

                            }
                                 
                            break;
                            
                            
                        case PropertyValueType.TwoD:

                            break;
                            
                            
                        case PropertyValueType.ThreeD:

                            var easeIn = new KeyframeEase(0.0,EASE_POWER);
                            var easeOut = new KeyframeEase(0.0, EASE_POWER);                            
                            for( var i=0; i < prop.selectedKeys.length; i++){

                                    if(i == 0) { 
                                        prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeIn, easeIn, easeIn] ,[easeOut, easeOut, easeOut]); 
                                        // prop.setInterpolationTypeAtKey(prop.selectedKeys[i],KeyframeInterpolationType.LINEAR);

                                    }
                                    if(i == 1) { 
                                        prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeOut, easeOut, easeOut] ,[easeIn, easeIn, easeIn]);
                                        // prop.setInterpolationTypeAtKey(prop.selectedKeys[i],KeyframeInterpolationType.LINEAR);

                                    }

                            }

                            break;
                            
                            
                        case PropertyValueType.TwoD_SPATIAL:
                            writeLn( "-->  PropertyValueType.TwoD_SPATIAL");      
                            for( var i=0; i < prop.selectedKeys.length; i++){
                                    var easeIn = new KeyframeEase(0.0,EASE_POWER);
                                    var easeOut = new KeyframeEase(0.0, EASE_POWER);

                                    if(i == 0) { 
                                        prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeIn] ,[easeOut]); 
                                        
                                        prop.setSpatialContinuousAtKey(prop.selectedKeys[i],false);                            
                                    }
                                    if(i == 1) { 
                                        prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeOut] ,[easeIn]);
                                
                                        prop.setSpatialContinuousAtKey(prop.selectedKeys[i],false);                            
                                    }

                            }                            
                            break;
                            
                            
                        case PropertyValueType.ThreeD_SPATIAL:
                            // writeLn("WHAT ???-->  PropertyValueType.ThreeD_SPATIAL");   
                            writeLn(prop.selectedKeys.length);     
                            for( var i=0; i < prop.selectedKeys.length; i++){
                                    var easeIn = new KeyframeEase(0.0,EASE_POWER);
                                    var easeOut = new KeyframeEase(0.0, EASE_POWER);

                                    if(i == 0) { 
                                        prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeIn] ,[easeOut]); 

                                        prop.setSpatialContinuousAtKey(prop.selectedKeys[i],false);                            
                                    }
                                    if(i == 1) { 
                                        prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeOut] ,[easeIn]);

                                        prop.setSpatialContinuousAtKey(prop.selectedKeys[i],false);                            
                                    }

                            }
                            break;

                                                    

                        case PropertyValueType.COLOR:
                           writeLn( "-->  PropertyValueType.COLOR");         
                            break;
                        case PropertyValueType.MARKER:
                            writeLn( "-->  PropertyValueType.MARKER");                             
                            break;
                        case PropertyValueType.LAYER_INDEX:
                            writeLn("-->  PropertyValueType.LAYER_INDEX");                             
                            break;
                        case PropertyValueType.MASK_INDEX:
                            writeLn("-->  PropertyValueType.MASK_INDEX");                             
                            break;
                        case PropertyValueType.SHAPE:
                            writeLn( "-->  PropertyValueType.SHAPE");                             
                            break;
                        case PropertyValueType.TEXT_DOCUMENT:         
                            writeLn( "-->  PropertyValueType.TEXT_DOCUMENT");                             
                            break;                        
                    }


        }

            
    }

    app.endUndoGroup();
}

function ease2keysBack(){


app.beginUndoGroup("ease 2 keys back");
    // $.writeln(" ease2keysBack()------------------------------------");   
    var numSelected = app.project.activeItem.selectedLayers.length;
    for (var i=0; i < numSelected; i++ ){
            var layer = app.project.activeItem.selectedLayers[i];

            var easeIn = new KeyframeEase(0.0,100.0);
            var easeOut = new KeyframeEase(0.0, 100.0);
             
            for (item in layer.selectedProperties){

                prop = layer.selectedProperties[item];


                



                if ( prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL ){


                    for( var i=0; i < prop.selectedKeys.length; i++){
                            // $.writeln(prop.keyTime(prop.selectedKeys[i]) + "<--------");
                            if(i == 0) { 
                                prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeIn] ,[easeOut]); 
                                // prop.setInterpolationTypeAtKey(prop.selectedKeys[i],KeyframeInterpolationType.LINEAR);
                                prop.setSpatialContinuousAtKey(prop.selectedKeys[i],false);
                            }
                            if(i == 1) { 
                                prop.setTemporalEaseAtKey(prop.selectedKeys[i],[new KeyframeEase(0.0,30.0)] ,[easeIn]); 
                                // prop.setInterpolationTypeAtKey(prop.selectedKeys[i],KeyframeInterpolationType.LINEAR);
                                prop.setSpatialContinuousAtKey(prop.selectedKeys[i],false);
                            }
            
                    }


                    
                    var x1 = prop.valueAtTime(  validTime(prop.keyTime(prop.selectedKeys[0]))   ,true)[0];
                    // $.writeln(x1 + " : X1");
                    var y1 = prop.valueAtTime(  validTime(prop.keyTime(prop.selectedKeys[0]))   ,true)[1];

                    var x2 = prop.valueAtTime(  validTime(prop.keyTime(prop.selectedKeys[1]))   ,true)[0];
                    var y2 = prop.valueAtTime(  validTime(prop.keyTime(prop.selectedKeys[1]))   ,true)[1];

                    var dist = distance(x1 , x2, y1, y2);


                        ////////////////////// ----------
                    var spanTime = prop.keyTime(prop.selectedKeys[1]) - prop.keyTime(prop.selectedKeys[0]);

                    var newKey = prop.addKey( validTime(prop.keyTime(prop.selectedKeys[1]) - spanTime/2.0)); ///////////////////
                     
                    prop.setTemporalEaseAtKey(newKey,[new KeyframeEase(dist*3.0,30.0)] ,[new KeyframeEase(dist*3.0,30.0)]);
                    prop.setTemporalContinuousAtKey(newKey, true);  
                    // prop.setSpatialAutoBezierAtKey(newKey, true);
                    var newPos = [0,0];
                    newPos[0] = x2 + (x2-x1) / 10.0;
                    newPos[1] = y2 + (y2-y1) / 10.0;
                    prop.setValueAtKey(newKey, newPos);
                }

                if ( prop.propertyValueType == PropertyValueType.ThreeD ){


                    
                    var x1 = prop.valueAtTime(  validTime(prop.keyTime(prop.selectedKeys[0]))   ,true)[0];
    


                    var x2 = prop.valueAtTime(  validTime(prop.keyTime(prop.selectedKeys[1]))   ,true)[0];


                    var dist = x2 - x1;


                    var spanTime = prop.keyTime(prop.selectedKeys[1]) - prop.keyTime(prop.selectedKeys[0]);

                    var newKey = prop.addKey( validTime(prop.keyTime(prop.selectedKeys[1]) - spanTime/4.0)); ///////////////////
                     

                    prop.setTemporalContinuousAtKey(newKey, true);  
                    var newPos = [0,0];
                    newPos[0] = x2 + (x2-x1) / 2.0;
                    newPos[1] = newPos[0];
                    prop.setValueAtKey(newKey, newPos);
                }

                     
            }
            
    }

app.endUndoGroup();
}

function createUI(thisObj) {
    var myPanel = thisObj;
    
    var uiX = 10.0;
    var uiY  = 10.0;

    //myPanel.add("button",[10,50,100,70] ,"btn2");
    
//  ANIMATE IN
    myPanel.add("statictext",[uiX,uiY,uiX+200,uiY+20],"Spatial offset");
    uiY += 20.0;
    var spatialOffsetSliderIn = myPanel.add("slider", [uiX,uiY,uiX+200,uiY+20],-250,-500,500);
    var spatialOffsetSliderInText = myPanel.add("EditText",[uiX+205,uiY,uiX+250,uiY+20], spatialOffsetSliderIn.value);
    
    uiY += 20.0;
    myPanel.add("statictext",[uiX,uiY,uiX+200,uiY+20],"Time offset ( in frames )");
    uiY += 20.0;
    var timeOffsetSliderIn = myPanel.add("slider",  [uiX,uiY,uiX+200,uiY+20],10,0,20);
    var timeOffsetSliderInText = myPanel.add("EditText",[uiX+205,uiY,uiX+250,uiY+20], timeOffsetSliderIn.value);
    
    uiY += 30;
    var chkboxXIn = myPanel.add("checkbox",[uiX,uiY,uiX+200,uiY+20],"X");
    chkboxXIn.value = true;
    var chkboxYIn = myPanel.add("checkbox",[uiX+ 50,uiY,uiX+200,uiY+20],"Y");
    
    uiY += 30;    
    var chkboxScaleIn = myPanel.add("checkbox",[uiX,uiY,uiX+200,uiY+20],"Scale");
    var chkboxRotateIn = myPanel.add("checkbox",[uiX+ 50,uiY,uiX+200,uiY+20],"Rotate");
    var chkboxOpacityIn = myPanel.add("checkbox",[uiX+ 100,uiY,uiX+200,uiY+20],"Opacity");      
    uiY += 30.0;
    var addKeysBtnIn =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Animate In");    

//~      $.writeln(spatialOffsetSliderInText);
    spatialOffsetSliderIn.onChanging = function(){
            //$.writeln(this.value);
            spatialOffsetSliderInText.text =  Math.floor(this.value);
    }
    spatialOffsetSliderIn.onChange = function(){
            this.value = Math.floor(this.value);
            spatialOffsetSliderInText.text = this.value;
    }

    spatialOffsetSliderInText.onChange = function(){
            spatialOffsetSliderIn.value = this.text;
        
    }
    timeOffsetSliderIn.onChanging = function(){
            //$.writeln(this.value);
            timeOffsetSliderInText.text =  Math.floor(this.value);
    }
    timeOffsetSliderIn.onChange = function(){
            this.value = Math.floor(this.value);
            timeOffsetSliderInText.text = this.value;
    }

    timeOffsetSliderInText.onChange = function(){
            timeOffsetSliderIn.value = this.text;        
    }
    addKeysBtnIn.onClick = function(){
        
        app.beginUndoGroup("Animate In");        

        var numSelected = app.project.activeItem.selectedLayers.length;
        for (var i=0; i < numSelected; i++ ){
                var layer = app.project.activeItem.selectedLayers[i];
                //$.writeln(layer.time);
                //$.writeln(parseFloat(timeOffsetSliderInText.text) + 2);
                
                floatVal = layer.time  - (Math.floor(parseFloat(timeOffsetSliderInText.text))/25.0)
//~                 $.writeln(floatVal + "---------------");
                // properley converts time to frame number and back to time, to avoid "in between" keyframes keys
                var offsetTime = currentFormatToTime(  timeToCurrentFormat(floatVal,25.0,false)  , 25.0 , false);
                
                if (chkboxXIn.value == true || chkboxYIn.value == true){

                        
                        var posProp = layer.property("Position");
                        var startPos = posProp.value;       
                        
                        if(chkboxXIn.value == true){
                                    xVal = startPos[0]+ Math.floor(spatialOffsetSliderInText.text);
                        }else{
                                    xVal = startPos[0];
                        }
                    
                        if(chkboxYIn.value == true){
                                    yVal = startPos[1]+ Math.floor(spatialOffsetSliderInText.text);
                        }else{
                                    yVal = startPos[1];
                        }                    
                        var posK1 = posProp.addKey(layer.time);
                        posProp.setInterpolationTypeAtKey(posK1,KeyframeInterpolationType.LINEAR); 
                        
                        var easeIn = new KeyframeEase(0.0,100.0);
                        var easeOut = new KeyframeEase(100, 0.1);
                        posProp.setTemporalEaseAtKey(posK1,[easeIn] ,[easeOut]);  

                        var posK2 = posProp.addKey(offsetTime);
   
                        posProp.setValueAtTime(offsetTime, [xVal,  yVal]); // Math.floor to convert string to int ( weird I know ....)
                        posProp.setInterpolationTypeAtKey(posK2,KeyframeInterpolationType.LINEAR);        
                        var easeIn2 = new KeyframeEase(0.0,100.0);
                        var easeOut2 = new KeyframeEase(0, 0.1);
                        posProp.setTemporalEaseAtKey(posK1,[easeIn2] ,[easeOut2]);        
               }
           
            if(chkboxOpacityIn.value == true){
                var opacityProp = layer.property("Opacity");

                var opacK1 = opacityProp.addKey(layer.time);
                var opacK2 =opacityProp.addKey(offsetTime);
                opacityProp.setValueAtTime(layer.time, 100.0);                
                opacityProp.setValueAtTime(offsetTime, 0.0);   

             }
         
            if(chkboxScaleIn.value == true){
                var scaleProp = layer.property("Scale");

                
                var scaleK1 = scaleProp.addKey(layer.time);
                var scaleK2 = scaleProp.addKey(offsetTime);
                scaleProp.setValueAtTime(layer.time, [150,150]);                
                scaleProp.setValueAtTime(offsetTime, [100,100]);   
 
                 var easeIn2 = new KeyframeEase(0.1,0.1);
                var easeOut2 = new KeyframeEase(100.0, 0.1);
                scaleProp.setInterpolationTypeAtKey(scaleK1,KeyframeInterpolationType.LINEAR);   
                scaleProp.setTemporalEaseAtKey(scaleK1,[easeIn2, easeIn2, easeIn2] ,[easeOut2, easeOut2, easeOut2]);               
                
                var easeIn = new KeyframeEase(0.0,0.1);
                var easeOut = new KeyframeEase(0.0, 0.1);
                scaleProp.setInterpolationTypeAtKey(scaleK2,KeyframeInterpolationType.LINEAR);
                scaleProp.setTemporalEaseAtKey(scaleK2,[easeIn,easeIn,easeIn] ,[easeOut, easeOut, easeOut]);              
                
                     
         

             }         
       }
    app.endUndoGroup();
    }
// ANIMATE OUT
    uiX += 270;
    uiY = 10.0;
    
    myPanel.add("statictext",[uiX,uiY,uiX+200,uiY+20],"Spatial offset");
    uiY += 20.0;
    var spatialOffsetSliderOut = myPanel.add("slider", [uiX,uiY,uiX+200,uiY+20], 250.0,-500,500);
    var spatialOffsetSliderOutText = myPanel.add("EditText",[uiX+205,uiY,uiX+250,uiY+20], spatialOffsetSliderOut.value);
    
    uiY += 20.0;
    myPanel.add("statictext",[uiX,uiY,uiX+200,uiY+20],"Time offset ( in frames )");
    uiY += 20.0;
    var timeOffsetSliderOut = myPanel.add("slider",  [uiX,uiY,uiX+200,uiY+20],10,0,20);
    var timeOffsetSliderOutText = myPanel.add("EditText",[uiX+205,uiY,uiX+250,uiY+20], timeOffsetSliderOut.value);
    
    uiY += 30.0;
    var addKeysBtnOut =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Animate Out");    


    spatialOffsetSliderOut.onChanging = function(){
            //$.writeln(this.value);
            spatialOffsetSliderOutText.text =  Math.floor(this.value);
    }
    spatialOffsetSliderOut.onChange = function(){
            this.value = Math.floor(this.value);
            spatialOffsetSliderOutText.text = this.value;
    }

    spatialOffsetSliderOutText.onChange = function(){
            spatialOffsetSliderOut.value = this.text;
        
    }
    timeOffsetSliderOut.onChanging = function(){
            //$.writeln(this.value);
            timeOffsetSliderOutText.text =  Math.floor(this.value);
    }
    timeOffsetSliderOut.onChange = function(){
            this.value = Math.floor(this.value);
            timeOffsetSliderOutText.text = this.value;
    }

    timeOffsetSliderOutText.onChange = function(){
            timeOffsetSliderOut.value = this.text;        
    }
    addKeysBtnOut.onClick = function(){
//~         var layer = app.project.activeItem.selectedLayers[0]
             app.beginUndoGroup("Animate Out");
            var numSelected = app.project.activeItem.selectedLayers.length;
            for (var i=0; i < numSelected; i++ ){
                    var layer = app.project.activeItem.selectedLayers[i];
                    var posProp = layer.property("Position");
                    var startPos = posProp.value;
//~                     $.writeln(startPos[0]);
                    var posK1 = posProp.addKey(layer.time);
//~                     $.writeln(posK1 + " : posK1");
                    posProp.setInterpolationTypeAtKey(posK1,KeyframeInterpolationType.LINEAR); 
                    
                    var easeIn = new KeyframeEase(0.0,0.1);
                    var easeOut = new KeyframeEase(0, 100.0);
                
                    posProp.setTemporalEaseAtKey(posK1,[easeIn] ,[easeOut]);  

                    // properley converts time to frame number and back to time, to avoid "in between" keyframes keys
                    var offsetTime = currentFormatToTime(  timeToCurrentFormat(layer.time  + (Math.floor(timeOffsetSliderOutText.text)/25.0) ,25.0,false)  , 25.0 , false);
                    
                    var posK2 = posProp.addKey(offsetTime);
//~                     $.writeln(posK2 + " : posK2");
                    posProp.setValueAtTime(offsetTime, [startPos[0]+ Math.floor(spatialOffsetSliderOutText.text),  startPos[1]]); // Math.floor to convert string to int ( weird I know ....)
                    posProp.setInterpolationTypeAtKey(posK2,KeyframeInterpolationType.LINEAR);        

                    posProp.setTemporalEaseAtKey(posK1,[easeIn] ,[easeOut]);        
                    
                    var opacityProp = layer.property("Opacity");

                    var opacK1 = opacityProp.addKey(layer.time);
                    opacityProp.setTemporalEaseAtKey(opacK1,[easeIn] ,[easeOut]);
                    
                    var opacK2 =opacityProp.addKey(offsetTime);
                    opacityProp.setTemporalEaseAtKey(opacK1,[easeIn] ,[easeOut]);
                    
                    opacityProp.setValueAtTime(layer.time, 100.0);  
                    opacityProp.setValueAtTime(offsetTime, 0.0);        
           }
    
            app.endUndoGroup();
       

    }
    
    uiX = 10.0;
    uiY = 200.0;
    
    var offsetLayersBtn =  myPanel.add("button",[uiX,uiY,uiX+100, uiY +20] ,"Offset Layers");    
    var offsetLayersTimeText = myPanel.add("EditText",[uiX+160,uiY,uiX+200, uiY +20], 1.0);
    offsetLayersBtn.onClick = function(){
            offsetLayersTime(offsetLayersTimeText.text);
    }


    uiY = 230.0;
    
    var alignLayersBtn =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Align Layers");    
    
    alignLayersBtn.onClick = function(){
            alignLayers();
    }

    uiY += 30.0;
    var ease2keysBtn =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Ease 2 keys");    
    var ease2keysPower =  myPanel.add("Edittext",[uiX+210,uiY,uiX+300, uiY +20] ,60.0);    
    ease2keysBtn.onClick = function(){
            ease2keys(ease2keysPower.text);

    }


    uiY += 30.0;
    var ease2keysBackBtn =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Ease 2 keys Back");    
    ease2keysBackBtn.onClick = function(){
            
            ease2keysBack();


    }

    uiY += 30.0;
    var arghButton =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Argghhhh !!!");    
    arghButton.onClick = function(){
            
//~             $.writeln(app.project.activeItem.selectedLayers[0].time);


    }

    return myPanel;

}

var animatorPanel = createUI(this);