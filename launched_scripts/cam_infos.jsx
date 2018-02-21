function getProperties(obj) {

    var properties = [];

    for(var key in obj) {

        if(obj.hasOwnProperty(key)) {

            properties.push(key);

        }

    }

return properties;

}

comp = app.project.activeItem;
if(comp !== null){
    
    // alert("test"); 
    
    for(var i=0; i< comp.selectedLayers.length; i++){
        var bIsCam = comp.selectedLayers[i] instanceof CameraLayer;
        if(bIsCam){            
            //alert('selected layer #'+ i +' is a camera layer');    
            var cam = comp.selectedLayers[i];
            
            var camProps = getProperties(cam)
            for(var item in camProps){

                //$.writeln(camProps[item]);
                if(camProps[item] === "property"){
                    var zoom = cam.property('zoom').value;
                    var aperture = cam.property('aperture').value;
                    var compWidth = comp.width;

                    var angle = Math.atan( (compWidth * 0.5) / zoom );
                    var filmWidth = (aperture*0.5) / Math.tan(angle);
                    alert(filmWidth);
                    alert("Zoom : " + zoom +"\ncompWidth : "+compWidth +"\n angle :" +(angle*2 / Math.PI) * 180.0);

                }
            }
            
            ///alert();
        }
        
    }
    
}