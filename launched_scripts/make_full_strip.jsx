var selection = app.project.selection;
var imgWidth, imgHeight;
var numStrips;
if(selection.length > 0){

    if(selection[0] instanceof FootageItem)
    {
    
        imgWidth = selection[0].width;
        imgHeight = selection[0].height;

        numStrips = parseInt(prompt("Enter the number of strips.", "4"));
        if(numStrips){

            alert (numStrips);
        }else{
            alert ("not a number... \nenter a Number");
        }
    }else{
    
        alert("this is not a footage");
    }
}else{

    alert("nothing selected, \n select a footage in the project panel");
}





