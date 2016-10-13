function reloadFootage(_displayNewFrames){  
        
        var layers = app.project.activeItem.selectedLayers;
        if( layers.length == 0){
                writeLn("select a layer");
               return;
            }
        
        for( var i=0; i < layers.length; i++){
            
            //$.writeln(layers[0].source.footageMissing);
            if(layers[i].source != undefined){
                if(layers[i].source.mainSource.reload == undefined){
                    clearOutput();
                    writeLn("not a footage layer");
                   
                }else{
                
                    layers[i].source.mainSource.reload();
                    clearOutput();
                    writeLn(_displayNewFrames);
                    //writeLn(layers[i].source.duration);
                    //writeLn(layers[i].source.mainSource);
                    if(_displayNewFrames  == true){
                        layers[i].outPoint = layers[i].inPoint + layers[i].source.duration;
                    }
                }
            }
        }
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



function string_of_enum(enumVal,value) 
{
  for (var k in enumVal) if (enumVal[k] == value) return k;
  return null;
}        



function freezeTransforms(){


        //writeLn(app.project.ActiveItem);
        if(app.project.activeItem == undefined){
                clearOutput();
                writeLn("select a layer");
                return null;
        }
        var sel = app.project.activeItem.selectedLayers
        
        if(sel.length != 1){
                writeLn( "select one layer only");
                
                
                return;
        }
        var posProp = sel[0].position;
        

        
        var keys = [];
        
        
        $.writeln(posProp.numKeys);
        for(var i=1; i<posProp.numKeys+1; i++){
                
                var keyObject = {
                        frame : timeToCurrentFormat( posProp.keyTime(i),25 ) ,
                        keyInInterpolationType : posProp.keyInInterpolationType(i),
                        keyOutSpatialTangent : posProp.keyOutSpatialTangent(i)
                    };
                
                keys.push(keyObject);
                $.writeln("----------------------------");
                for(item in keyObject){
                       $.writeln( item.toString() + " : " + keyObject[item].toString());
                        //string_of_enum(KeyframeInterpolationType,keyObject[item])
                }
        }
    
        
}


function elastic(){
    
        function parse(str) {
            var args = [].slice.call(arguments, 1),
                i = 0;

            return str.replace(/%s/g, function() {
                return args[i++];
            });
        }        
        
        if(app.project.activeItem == undefined){
                clearOutput();
                writeLn("No active item");
                return null;
        }
        var sel = app.project.activeItem.selectedLayers
        
        if(sel.length == 0){
                clearOutput();
                writeLn("Select at layer");
                return null;
        }
      
        app.beginUndoGroup("AddElasticExpression");
        for(var i=0; i<sel.length; i++){
                currentLayer = sel[i];
               selectedProps= currentLayer.selectedProperties;
                $.writeln("---------------------");
                for(var n=0; n<selectedProps.length; n++){
                        var prop = selectedProps[n];
//~                         $.writeln(prop.name);
//~                         $.writeln(prop.propertyType == PropertyType.PROPERTY);
                        var ampSlider = currentLayer.Effects.addProperty("ADBE Slider Control");
                        ampSlider.name = prop.name+"_elasticAmplitude";
                        var ampSliderName = ampSlider.name;
                        ampSlider.property(1).setValue(0.2);
                        
                        
                        var freqSlider = currentLayer.Effects.addProperty("ADBE Slider Control");
                        freqSlider.name =  prop.name+"_elasticFreqency";
                        var freqSliderName = freqSlider.name;
                        freqSlider.property(1).setValue(4.0);       
                        
                        var decaySlider = currentLayer.Effects.addProperty("ADBE Slider Control");
                        decaySlider.name =  prop.name+"_elasticDecay";
                        var decaySliderName = decaySlider.name;
                        decaySlider.property(1).setValue(9.0);                            
                        expressionString = 'n = 0;\
                        if (numKeys > 0){\
                        n = nearestKey(time).index;\
                        if (key(n).time > time){\
                        n--;\
                        }\
                        }\
                        if (n == 0){\
                        t = 0;\
                        }else{\
                        t = time - key(n).time;\
                        }\
                        if (n > 0){\
                        v = velocityAtTime(key(n).time - thisComp.frameDuration);\
                        amp = effect("AMP_SLIDER")("Slider");\
                        freq = effect("FREQ_SLIDER")("Slider");\
                        decay =  effect("DECAY_SLIDER")("Slider");\
                        value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);\
                        }else{\
                        value;\
                        }'
                        ;
                        
//~                         var posName = ampSlider.name;
                        
                       expressionString = expressionString.replace("AMP_SLIDER",ampSliderName);
                       expressionString = expressionString.replace("FREQ_SLIDER",freqSliderName);
                       expressionString = expressionString.replace("DECAY_SLIDER",decaySliderName);
                        //expressionString.replace("ELASTIC_SLIDER", elasticSlider.name);
                        prop.expression = expressionString;

                        
                }
                
        }
    
        app.endUndoGroup();
        //app.project.item(index).layer(index).propertySpec.expression
        
}

function bounceBack(){
    
        function parse(str) {
            var args = [].slice.call(arguments, 1),
                i = 0;

            return str.replace(/%s/g, function() {
                return args[i++];
            });
        }        
        
        if(app.project.activeItem == undefined){
                clearOutput();
                writeLn("No active item");
                return null;
        }
        var sel = app.project.activeItem.selectedLayers
        
        if(sel.length == 0){
                clearOutput();
                writeLn("Select at layer");
                return null;
        }
      
        app.beginUndoGroup("AddBounceBackExpression");
        for(var i=0; i<sel.length; i++){
                currentLayer = sel[i];
               selectedProps= currentLayer.selectedProperties;
                $.writeln("---------------------");
                for(var n=0; n<selectedProps.length; n++){
                        var prop = selectedProps[n];
//~                         $.writeln(prop.name);
//~                         $.writeln(prop.propertyType == PropertyType.PROPERTY);
                        var bounceSlider = currentLayer.Effects.addProperty("ADBE Slider Control");
                        bounceSlider.name = prop.name+"_bounceAmplitude";
                        var bounceSliderName = bounceSlider.name;
                        bounceSlider.property(1).setValue(0.7);
                        
                        
                        var gravitySlider = currentLayer.Effects.addProperty("ADBE Slider Control");
                        gravitySlider.name =  prop.name+"_bounceGravity";
                        var gravitySliderName = gravitySlider.name;
                        gravitySlider.property(1).setValue(5000);       
                        
                        var maxBounceSlider = currentLayer.Effects.addProperty("ADBE Slider Control");
                        maxBounceSlider.name =  prop.name+"_bounceMaxBounce";
                        var maxBounceSliderName = maxBounceSlider.name;
                        maxBounceSlider.property(1).setValue(9.0);                            
                        expressionString = 'e = effect("BOUNCE_SLIDER")("Slider");\
g = effect("GRAVITY_SLIDER")("Slider");\
nMax = effect("MAX_BOUNCE_SLIDER")("Slider");\
n = 0;\
if (numKeys > 0){\
n = nearestKey(time).index;\
if (key(n).time > time) n--;\
}\
if (n > 0){\
  t = time - key(n).time;\
  v = -velocityAtTime(key(n).time - .001)*e;\
  vl = length(v);\
  if (value instanceof Array){\
    vu = (vl > 0) ? normalize(v) : [0,0,0];\
  }else{\
    vu = (v < 0) ? -1 : 1;\
}\
tCur = 0;\
segDur = 2*vl/g;\
tNext = segDur;\
nb = 1; // number of bounces\
while (tNext < t && nb <= nMax){\
vl *= e;\
segDur *= e;\
tCur = tNext;\
tNext += segDur;\
nb++\
}\
if(nb <= nMax){\
delta = t - tCur;\
value +  vu*delta*(vl - g*delta/2);\
}else{\
value\
}\
}else\
value'
  ;
                        
//~                         var posName = ampSlider.name;
                        
                       expressionString = expressionString.replace("BOUNCE_SLIDER",bounceSliderName);
                       expressionString = expressionString.replace("GRAVITY_SLIDER",gravitySliderName);
                       expressionString = expressionString.replace("MAX_BOUNCE_SLIDER",maxBounceSliderName);
                        //expressionString.replace("ELASTIC_SLIDER", elasticSlider.name);
                        prop.expression = expressionString;

                        
                }
                
        }
    
        app.endUndoGroup();
        //app.project.item(index).layer(index).propertySpec.expression
        
}
function createUI(thisObj) {
    var myPanel = thisObj;
    
    var uiX = 10.0;
    var uiY  = 10.0;
    myPanel.add("statictext",[uiX, uiY,200,50],"gui2one utils");

    uiY += 40.0;
    var reloadButton = myPanel.add("button",[uiX,uiY,100,uiY+30] ,"Reload Footage");    
    var checkboxDisplayNewFrames = myPanel.add("checkbox",[uiX ,uiY + 30,uiX+200,uiY+60]);    
    reloadButton.onClick = function(){
             reloadFootage(checkboxDisplayNewFrames.value);
    }

    //toggle display new frames
    
     
     checkboxDisplayNewFrames.text = "display new frames";
     checkboxDisplayNewFrames.value = true;
        checkboxDisplayNewFrames.onClick = function(){
                //$.writeln(this.value);
            }
    
    uiY += 70.0;
    var trimInButton= myPanel.add("button",[uiX,uiY,50,uiY+30] ,"trim IN");    
    trimInButton.onClick = function(){
             trimToCursor('in');
    }
    var trimOutButton= myPanel.add("button",[uiX+50,uiY,uiX+100,uiY+30] ,"Trim OUT");    
    trimOutButton.onClick = function(){
             trimToCursor('out');
    }
    uiY += 40.0;
    var freezeButtton= myPanel.add("button",[uiX,uiY,uiX+100,uiY+30] ,"Freeze Xform");    
    freezeButtton.onClick = function(){
             freezeTransforms();
    }

    uiY += 40.0;
    var elasticButton= myPanel.add("button",[uiX,uiY,uiX+100,uiY+30] ,"Elastic");    
    elasticButton.onClick = function(){
             elastic();
    }

    uiY += 40.0;
    var bounceBackButton= myPanel.add("button",[uiX,uiY,uiX+100,uiY+30] ,"Bounce");    
    bounceBackButton.onClick = function(){
             bounceBack();
    }





    return myPanel;

}



var utilsPanel = createUI(this);