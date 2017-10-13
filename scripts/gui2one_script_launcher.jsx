var defaultPath = "D:/CODE/AE_playground/launched_scripts";

var SCRIPTS_FOLDER = new Folder("D:/CODE/AE_playground/launched_scripts");
var FILE_PATHS = [];
var DDL;
var CURRENT_SCRIPT = "";
var setScriptsFolder = function(){

    var folder = Folder.selectDialog("select folder containing scripts" ,defaultPath);
    if(folder){
    
        defaultPath = folder;
        var files;
    
        SCRIPTS_FOLDER = folder;
        // $.writeln(SCRIPTS_FOLDER);

        loadFolderContent();
    }

}

var loadFolderContent = function(){

    var files = SCRIPTS_FOLDER.getFiles("*.jsx");
    if(files){
        
        FILE_PATHS = files;

        feedDropDownList();
    }
}

var clearDropDownList = function(){
    //$.writeln("items num :" +DDL.items.length);
    DDL.selection = 0;
    for (var i = DDL.items.length-1 ; i >= 0 ; i--) {    
        DDL.remove(i)
        
     }

    //DDL.rawValue = null;
}
var feedDropDownList = function(){    

    clearDropDownList();
    for (var i = 0; i < FILE_PATHS.length; i++) {
        var file = new File(FILE_PATHS[i]);
        DDL.add("item", file.name.replace(/%20/g, " "));        
    }
    DDL.selection = 0;    
}

var loadScriptContent = function(index){

        var file = new File(FILE_PATHS[parseFloat(index)]);
        // $.writeln(file.name);
        file.open("r")
        var content = file.read();
        file.close();
        CURRENT_SCRIPT = content;

        //$.writeln(content);    

}

function createUI(thisObj) {
    var myPanel = thisObj;

    var uiX = 0;
    var uiY = 0;

    var setPathBtn = myPanel.add("button",[uiX,uiY,uiX+200,uiY+20],"Set Scripts Folder")
    uiY +=20;
    var reloadBtn = myPanel.add("button", [uiX,uiY,uiX+200,uiY+20],"Reload Scripts Folder");
    uiY +=20;
    DDL = myPanel.add("dropdownlist",[uiX,uiY,uiX+200,uiY+20],"drop down list");    
    uiY +=20;

    var executeBtn = myPanel.add("button",[uiX,uiY,uiX+200,uiY+20],"Execute")
    uiY +=20;

    var clearBtn = myPanel.add("button",[uiX,uiY,uiX+200,uiY+20],"Clear")
    uiY +=20;

    setPathBtn.onClick = function(){

        // $.writeln("hello");
        setScriptsFolder();
    }

    reloadBtn.onClick = function(){
        loadFolderContent();
        
    }
    

    DDL.onChange = function(){
        // $.writeln(FILE_PATHS[this.selection.index]);
        if(this.selection){

            loadScriptContent(this.selection.index);
            // $.writeln("------------------------------------");
            // $.writeln("THIS --> " +this.toString());
            // $.writeln(this.selection);
            // $.writeln("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        }
    }
    executeBtn.onClick = function(){
        eval(CURRENT_SCRIPT);
    }

    clearBtn.onClick = function(){
        clearDropDownList();
    }

    loadFolderContent();
    
}

var panel = createUI(this);