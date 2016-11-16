// export camera animation

function cameraAnim(){
        this.name = "camera default",
        this.duration = 250,
        this.fps = 25,
        this.positions = [],
        this.targetPositions  = [],
        this.orientations = [],
        this.rotations = []
        
        return this;
}



var myFile = File.saveDialog("Please select output file.","cam pos files:*.cam");
var filename = String(myFile).replace(/^.*[\\\/]/, '');

var comp;


if(myFile != null){
    
    comp = app.project.activeItem;
    
    
    if(comp){
        
        
        selectedLayer = comp.selectedLayers[0];
        if(selectedLayer){
            
            if(selectedLayer instanceof CameraLayer){
                    
                    var cam = selectedLayer;
                    //$.writeln(selectedLayer.name);
                    var fileOK = myFile.open("w");

                    if (fileOK){
                            $.writeln(filename);
                            
                            var camData = new cameraAnim();
                            camData.name =cam.name;
                            //alert(camData.name);
                            var start = cam.inPoint;
                            var end = cam.outPoint;
                            var duration = (end - start);
                            camData.duration = duration * camData.fps;
                            var DATA= "";
                            

 
                            
                            
                            for(var i=0; i< duration; i += 1.0/25.0){
                                    var pos = []
                                    pos.push(cam.position.valueAtTime(i+start,0)[0]);
                                    pos.push(cam.position.valueAtTime(i+start,0)[1]);
                                    pos.push(cam.position.valueAtTime(i+start,0)[2]);
                                    camData.positions.push(pos);
                                    
                                    var orientation = []
                                    orientation.push(cam.orientation.valueAtTime(i+start,0)[0]);
                                    orientation.push(cam.orientation.valueAtTime(i+start,0)[1]);
                                    orientation.push(cam.orientation.valueAtTime(i+start,0)[2]);
                                    camData.orientations.push(orientation);                                    
                           }
                            
         
                            myFile.write(JSON.stringify(camData,null,"\t"));
        
                    }

                    myFile.close();
            }else{
                    alert("not a camera");
            }
        }else{
            alert("select a camera layer in the timeline panel");
        }
    }else{        
        alert("select a comp in project view");
    }

}