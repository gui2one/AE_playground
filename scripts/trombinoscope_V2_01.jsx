function min(val1, val2){
        if(val1 < val2){
                return val1;
        }else if(val2< val1){
                return val2;
        }else{
                return val1;
        }
}

function max(val1,val2){
        if(val1 > val2){
                return val1;
        }else if(val2 > val1){
                return val2;
        }else{
                return val1;
        }
}


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

function findFolderByName(name){
    var myFolderName = name;
    var myFolder = "";
    for (var i = 1; i <= app.project.numItems; i ++){
      if ((app.project.item(i) instanceof FolderItem) && (app.project.item(i).name == myFolderName)){
        myFolder = app.project.item(i);
        return myFolder;
      }
    }

    if (myFolder == ""){
        return 0
        }
}


//project = this.app.project;



root = findFolderByName("000_SELFIES");
$.writeln(root.name);
$.writeln(root.items);
folder = findFolderByName("CRC Cites Normandes");
$.writeln(collectivites.name);
$.writeln(collectivites.items);
$.writeln("--------------------------------------------------");

itemsArray = [];
for(var i=0; i<folder.numItems; i++){
        itemsArray[i] = folder.item(i + 1);
}

//$.writeln(itemsArray);

for(var i=0; i<itemsArray.length; i++){
        $.writeln("------------------------------")
        var item = itemsArray[i];
        
        if(item instanceof FootageItem){
            var imgWidth = item.width;
            var imgName = item.name
            var imgHeight = item.height;
            var ratio = imgWidth / imgHeight;
            
            $.writeln(ratio);
            comp = folder.items.addComp(item.name, 500.0, 500.0, 1.0, 5.0, 25.0);
            
            layer = comp.layers.add(item,5.0);
            scale = max(imgHeight,imgWidth) / 500.0;
            scale2 = 100.0/ scale;
            $.writeln(scale2);
            layer.property("Scale").setValue([scale2,scale2]);
            $.writeln(item.name);
            $.writeln(item.width);
            $.writeln(item.height);
            
            $.writeln(item.height);        
        }
        
}