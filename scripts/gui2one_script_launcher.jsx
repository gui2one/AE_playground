var SCRIPTS_FOLDER = new Folder("D:/CODE/AE_playground/launched_scripts/");
var FILE_PATHS = [];
var DDL;
var setScriptsFolder = function(){

    var folder = Folder.selectDialog("select folder containing scripts" ,"D:/CODE/AE_playground/launched_scripts/");
    var files;
    
    SCRIPTS_FOLDER = folder;
    $.writeln(SCRIPTS_FOLDER);
    if(folder)
    {
        files = folder.getFiles();
        if(files){
            $.writeln(files);
        }


        // f = new File(myFile);
        // f.open('r');
        // var data = f.read();
        // f.close();        
    }
}

var loadFolderContent = function(){

    var files = SCRIPTS_FOLDER.getFiles("*.jsx");
    
    FILE_PATHS = files;
    //writeLn(FILE_PATHS);

    // for (var i = 0; i < files.length; i++) {
    //     var file = new File(files[i]);
    //     $.writeln(file.name);
    //     file.open("r")
    //     var content = file.read();
    //     file.close();

    //     $.writeln(content);
    //    // eval(content);

    // }

}

var feedDropDownList = function(){
    
    // for(var prop in DDL){
    //     $.writeln(prop + " -->")
    //     $.writeln(DDL[prop]);
    // }

    for (var i = 0; i < DDL.items.length; i++) {        
        DDL.remove(0);
    }
    for (var i = 0; i < FILE_PATHS.length; i++) {
        var file = new File(FILE_PATHS[i]);

        DDL.add("item", file.name.replace(/%20/g, " "));
        
    }
    DDL.selection = 0;

    
}

function createUI(thisObj) {
    var myPanel = thisObj;

    var uiX = 0;
    var uiY = 0;

    var setPathBtn = myPanel.add("button",[uiX,uiY,uiX+200,uiY+20],"set scripts folder")
    uiY +=20;
    var reloadBtn = myPanel.add("button", [uiX,uiY,uiX+200,uiY+20],"reload scripts folder");
    uiY +=20;
    DDL = myPanel.add("dropdownlist",[uiX,uiY,uiX+200,uiY+20],"drop down list");
    
    uiY +=20;

    setPathBtn.onClick = function(){

        $.writeln("hello");
        setScriptsFolder();
    }

    reloadBtn.onClick = function(){
        loadFolderContent();
        feedDropDownList();
    }
    
    loadFolderContent();
    feedDropDownList();
}

var panel = createUI(this);