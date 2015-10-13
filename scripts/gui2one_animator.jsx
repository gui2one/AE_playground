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

function offsetLayersTime(){
    var layers = app.project.activeItem.selectedLayers;
    var inc = 0.0;
    for (item in app.project.activeItem.selectedLayers){
            layer = app.project.activeItem.selectedLayers[item];
            
            var convertedTime = currentFormatToTime(  timeToCurrentFormat(layer.startTime + inc ,25.0,false)  , 25.0 , false);
            layer.startTime = convertedTime;
            
            inc += 0.1;
    }
}

function alignLayers(){
    var layers = app.project.activeItem.selectedLayers;
    var minTime = 1000.0;
    for (item in layers){
            layer = layers[item];   
            if(layer.startTime < minTime){
                    minTime = layer.startTime;
            }
            
    }

    for(item in layers){
            layer = layers[item];   
            
            layer.startTime = minTime;
            
            $.writeln(layer.time * 25.0);
    }
        
}


function ease2keys(){

    for (obj in app.project.activeItem.selectedLayers ){
            var layer = app.project.activeItem.selectedLayers[obj];

            var easeIn = new KeyframeEase(0.0,100.0);
            var easeOut = new KeyframeEase(0.75, 85);
             
            for (item in layer.selectedProperties){

                prop = layer.selectedProperties[item];
                $.writeln(prop.name);
                $.writeln(prop.propertyValueType + "<::::::::::::::::");
                $.writeln(prop.selectedKeys.length);

                

                for( var i=0; i < prop.selectedKeys.length; i++){
                        $.writeln(prop.keyTime(prop.selectedKeys[i]) + "<--------");
                        if(i == 0) { prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeIn] ,[easeOut]); }
                        if(i == 1) { prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeOut] ,[easeIn]); }
                        
                        
                }
                $.writeln("------------------------------------");     
            }
            
    }
}

function ease2keysBack(){

    $.writeln(" ease2keysBack()------------------------------------");   
    for (obj in app.project.activeItem.selectedLayers ){
            var layer = app.project.activeItem.selectedLayers[obj];

            var easeIn = new KeyframeEase(0.0,100.0);
            var easeOut = new KeyframeEase(0.75, 85);
             
            for (item in layer.selectedProperties){

                prop = layer.selectedProperties[item];
                $.writeln(prop.name);
                $.writeln(prop.propertyValueType + "<::::::::::::::::");
                $.writeln(prop.selectedKeys.length);

                

                for( var i=0; i < prop.selectedKeys.length; i++){
                        $.writeln(prop.keyTime(prop.selectedKeys[i]) + "<--------");
                        if(i == 0) { prop.setTemporalEaseAtKey(prop.selectedKeys[i],[easeIn] ,[easeOut]); }
                        if(i == 1) { prop.setTemporalEaseAtKey(prop.selectedKeys[i],[new KeyframeEase(0.0,30.0)] ,[easeIn]); }
                        
                        
                }

                var k1 = prop.addKey(prop.keyTime(prop.selectedKeys[1]) - 0.1);
                prop.setTemporalContinuousAtKey(k1, true);
                $.writeln(" ADDED KEY------------------------------------");     
            }
            
    }
}

function createUI(thisObj) {
    var myPanel = thisObj;
    
    var uiX = 10.0;
    var uiY  = 10.0;

    //myPanel.add("button",[10,50,100,70] ,"btn2");
    
//  ANIMATE IN
    myPanel.add("statictext",[uiX,uiY,uiX+200,uiY+20],"Spatial offset");
    uiY += 20.0;
    var spatialOffsetSliderIn = myPanel.add("slider", [uiX,uiY,uiX+200,uiY+20], 0.0,-100,100);
    var spatialOffsetSliderInText = myPanel.add("EditText",[uiX+205,uiY,uiX+250,uiY+20], spatialOffsetSliderIn.value);
    
    uiY += 20.0;
    myPanel.add("statictext",[uiX,uiY,uiX+200,uiY+20],"Time offset ( in frames )");
    uiY += 20.0;
    var timeOffsetSliderIn = myPanel.add("slider",  [uiX,uiY,uiX+200,uiY+20],-10,0,20);
    var timeOffsetSliderInText = myPanel.add("EditText",[uiX+205,uiY,uiX+250,uiY+20], timeOffsetSliderIn.value);
    
    uiY += 30;
    var chkboxXIn = myPanel.add("checkbox",[uiX,uiY,uiX+200,uiY+20],"X");
    chkboxXIn.value = true;
    var chkboxYIn = myPanel.add("checkbox",[uiX+ 50,uiY,uiX+200,uiY+20],"Y");
    
    uiY += 30;    
    var chkboxScaleIn = myPanel.add("checkbox",[uiX,uiY,uiX+200,uiY+20],"Scale");
    var chkboxRotateIn = myPanel.add("checkbox",[uiX+ 50,uiY,uiX+200,uiY+20],"Rotate");
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
//~         var layer = app.project.activeItem.selectedLayers[0]
        
        for (obj in app.project.activeItem.selectedLayers ){
                var layer = app.project.activeItem.selectedLayers[obj];


                // properley converts time to frame number and back to time, to avoid "in between" keyframes keys
                var offsetTime = currentFormatToTime(  timeToCurrentFormat(layer.time  - (Math.floor(timeOffsetSliderInText.text)/25.0) ,25.0,false)  , 25.0 , false);
                
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
                        posProp.setInterpolationTypeAtKey(posK1,KeyframeInterpolationType.BEZIER); 
                        
                        var easeIn = new KeyframeEase(0.0,100.0);
                        var easeOut = new KeyframeEase(0.75, 85);
                        posProp.setTemporalEaseAtKey(posK1,[easeIn] ,[easeOut]);  

                        var posK2 = posProp.addKey(offsetTime);
   
                        posProp.setValueAtTime(offsetTime, [xVal,  yVal]); // Math.floor to convert string to int ( weird I know ....)
                        posProp.setInterpolationTypeAtKey(posK2,KeyframeInterpolationType.BEZIER);        
                        var easeIn2 = new KeyframeEase(0.0,100.0);
                        var easeOut2 = new KeyframeEase(0, 0.1);
                        posProp.setTemporalEaseAtKey(posK1,[easeIn2] ,[easeOut2]);        
               }
           
                var opacityProp = layer.property("Opacity");

                var opacK1 = opacityProp.addKey(layer.time);
                var opacK2 =opacityProp.addKey(offsetTime);
                opacityProp.setValueAtTime(layer.time, 100.0);                
                opacityProp.setValueAtTime(offsetTime, 0.0);        
       }

    }
// ANIMATE OUT
    uiX += 270;
    uiY = 10.0;
    
    myPanel.add("statictext",[uiX,uiY,uiX+200,uiY+20],"Spatial offset");
    uiY += 20.0;
    var spatialOffsetSliderOut = myPanel.add("slider", [uiX,uiY,uiX+200,uiY+20], 0.0,-100,100);
    var spatialOffsetSliderOutText = myPanel.add("EditText",[uiX+205,uiY,uiX+250,uiY+20], spatialOffsetSliderOut.value);
    
    uiY += 20.0;
    myPanel.add("statictext",[uiX,uiY,uiX+200,uiY+20],"Time offset ( in frames )");
    uiY += 20.0;
    var timeOffsetSliderOut = myPanel.add("slider",  [uiX,uiY,uiX+200,uiY+20],-10,0,20);
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
        
            for (obj in app.project.activeItem.selectedLayers ){
                    var layer = app.project.activeItem.selectedLayers[obj];
                    var posProp = layer.property("Position");
                    var startPos = posProp.value;
                    $.writeln(startPos[0]);
                    var posK1 = posProp.addKey(layer.time);
                    $.writeln(posK1 + " : posK1");
                    posProp.setInterpolationTypeAtKey(posK1,KeyframeInterpolationType.BEZIER); 
                    
                    var easeIn = new KeyframeEase(0.0,0.1);
                    var easeOut = new KeyframeEase(0, 100.0);
                
                    posProp.setTemporalEaseAtKey(posK1,[easeIn] ,[easeOut]);  

                    // properley converts time to frame number and back to time, to avoid "in between" keyframes keys
                    var offsetTime = currentFormatToTime(  timeToCurrentFormat(layer.time  + (Math.floor(timeOffsetSliderOutText.text)/25.0) ,25.0,false)  , 25.0 , false);
                    
                    var posK2 = posProp.addKey(offsetTime);
                    $.writeln(posK2 + " : posK2");
                    posProp.setValueAtTime(offsetTime, [startPos[0]+ Math.floor(spatialOffsetSliderOutText.text),  startPos[1]]); // Math.floor to convert string to int ( weird I know ....)
                    posProp.setInterpolationTypeAtKey(posK2,KeyframeInterpolationType.BEZIER);        

                    posProp.setTemporalEaseAtKey(posK1,[easeIn] ,[easeOut]);        
                    
                    var opacityProp = layer.property("Opacity");

                    var opacK1 = opacityProp.addKey(layer.time);
                    opacityProp.setTemporalEaseAtKey(opacK1,[easeIn] ,[easeOut]);
                    
                    var opacK2 =opacityProp.addKey(offsetTime);
                    opacityProp.setTemporalEaseAtKey(opacK1,[easeIn] ,[easeOut]);
                    
                    opacityProp.setValueAtTime(layer.time, 100.0);  
                    opacityProp.setValueAtTime(offsetTime, 0.0);        
           }
    

       

    }
    
    uiX = 10.0;
    uiY = 200.0;
    
    var offsetLayersBtn =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Offset Layers");    
    
    offsetLayersBtn.onClick = function(){
            offsetLayersTime();
    }


    uiY = 230.0;
    
    var alignLayersBtn =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Align Layers");    
    
    alignLayersBtn.onClick = function(){
            alignLayers();
    }

    uiY += 30.0;
    var ease2keysBtn =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Ease 2 keys");    
    ease2keysBtn.onClick = function(){
            ease2keys();
    }


    uiY += 30.0;
    var ease2keysBackBtn =  myPanel.add("button",[uiX,uiY,uiX+200, uiY +20] ,"Ease 2 keys Back");    
    ease2keysBackBtn.onClick = function(){
            ease2keysBack();
    }

    return myPanel;

}

var animatorPanel = createUI(this);