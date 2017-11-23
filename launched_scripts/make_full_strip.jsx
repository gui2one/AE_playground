var selection = app.project.selection;
var imgWidth, imgHeight;
var numStrips;
if(selection.length > 0){

    if(selection[0] instanceof FootageItem)
    {
    
        app.beginUndoGroup("create strip comp");

        imgWidth = selection[0].width;
        imgHeight = selection[0].height;

        numStrips = parseInt(prompt("Enter the number of strips.", "4"));

        stripWidth = imgWidth * numStrips;
        stripHeight = imgHeight / numStrips;

        if(numStrips){

            var myComp = app.project.items.addComp("000_new_comp", stripWidth,  stripHeight, 1.0, 10.0, 25.0);
            
            for(var i=0; i< numStrips; i++){
                
                var layer1 = myComp.layers.add(selection[0]);
                
                layer1.property('anchorPoint').setValue([0,i * stripHeight]);
                layer1.property('position').setValue([i * stripWidth / numStrips,0]);

            }

            myComp.openInViewer();
            //alert (numStrips);


            app.endUndoGroup();
        }else{
            alert ("not a number... \nenter a Number");
        }
    }else{
    
        alert("this is not a footage");
    }
}else{

    alert("nothing selected, \n select a footage in the project panel");
}





