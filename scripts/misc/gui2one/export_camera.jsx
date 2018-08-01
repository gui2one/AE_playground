////@include "json2.jsx"

//alert(" hey fuck you after ");
// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

// export camera animation
function cameraAnim(){
    this.type = "";
    this.name = "camera default",
    this.duration = 250,
    this.angle = 50.0;
    this.aperture = 36.0;

    this.resX = 1920.0;
    this.resY = 1080.0;

    this.fps = 25,
    this.positions = [],
    this.targetPositions  = [],
    this.orientations = [],
    this.rotations = []
    
    return this;
}

function AVLayerAnim(){
    this.type = "";
    this.name = "null default";
    this.duration = 250,
    this.fps = 25,
    this.positions = [],
    this.orientations = []
    return this;
}

dataArray = [];



var myFile = File.saveDialog("Please select output file.","cam pos files:*.cam");
var filename = String(myFile).replace(/^.*[\\\/]/, '');

var comp;


if(myFile != null){
    
    comp = app.project.activeItem;
    
    
    if(comp){
        // alert(comp.inPoint);
        var fileOK = myFile.open("w");
        for(var n= 0; n < comp.selectedLayers.length; n++){
            selectedLayer = comp.selectedLayers[n];

            // alert(n);
            // alert(selectedLayer);
            if(selectedLayer){
            
            if (fileOK){
                if(selectedLayer instanceof CameraLayer){

                    var cam = selectedLayer;


                    var camData = new cameraAnim();

                    camData.type = "camera";
                    camData.name = cam.name;
                    var zoom = cam.zoom.value;
                    var aperture = comp.width / 2.0;
                    
                    camData.angle = (Math.degrees(Math.atan((aperture / zoom))) * 2.0);

                    var start = cam.inPoint;
                    var end = cam.outPoint;
                    // alert(cam.outPoint);
                    var duration = (end - start);
                    camData.duration = duration * camData.fps;

                    camData.resX = comp.width;
                    camData.resY = comp.height;

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

                    dataArray.push(camData)
                        //myFile.write(JSON.stringify(camData,null,"\t"));

                }else if (selectedLayer instanceof AVLayer) {
   
                    var AVLayerData = new AVLayerAnim();
                    AVLayerData.type = "AVLayer";
                    AVLayerData.name = selectedLayer.name;
                    var start = selectedLayer.inPoint;
                    // alert("start : ")
                    // alert(start);
                    var end = selectedLayer.outPoint;
                    // alert(end);
                    var duration = (end - start);
                    AVLayerData.duration = duration * AVLayerData.fps;
                    
                    
                    
                    if (selectedLayer.position.isTimeVarying || selectedLayer.orientation.isTimeVarying){

                        for (var i = 0; i < duration; i += 1.0 / 25.0) {
                            var pos = []
                            pos.push(selectedLayer.position.valueAtTime(i + start, 0)[0]);
                            pos.push(selectedLayer.position.valueAtTime(i + start, 0)[1]);
                            pos.push(selectedLayer.position.valueAtTime(i + start, 0)[2]);
                            AVLayerData.positions.push(pos);

                            var orientation = []
                            orientation.push(selectedLayer.orientation.valueAtTime(i + start, 0)[0]);
                            orientation.push(selectedLayer.orientation.valueAtTime(i + start, 0)[1]);
                            orientation.push(selectedLayer.orientation.valueAtTime(i + start, 0)[2]);
                            AVLayerData.orientations.push(orientation);
                        }
                    }else{
                        var pos = []
                        pos.push(selectedLayer.position.valueAtTime(0,0)[0]);
                        pos.push(selectedLayer.position.valueAtTime(0, 0)[1]);
                        pos.push(selectedLayer.position.valueAtTime(0, 0)[2]);
                        AVLayerData.positions.push(pos);

                        var orientation = []
                        orientation.push(selectedLayer.orientation.valueAtTime(0, 0)[0]);
                        orientation.push(selectedLayer.orientation.valueAtTime(0, 0)[1]);
                        orientation.push(selectedLayer.orientation.valueAtTime(0, 0)[2]);
                        AVLayerData.orientations.push(orientation);
                    }

                    dataArray.push(AVLayerData)
                }


                }
            }else{
                alert("select a camera layer in the timeline panel");
            }
        }
        alert("File Saved")
        myFile.write(JSON.stringify(dataArray, null, "\t"));
        myFile.close();
    }else{        
        alert("select a comp in project view");
    }

}