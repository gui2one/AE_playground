{
function myScript(thisObj){
        function myScript_buildUI(thisObj){
                var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette","My Window Name",undefined);
                
                res = "panel{}";
                myPanel.add("button", undefined,"Button");
                myPanel.grp  = myPanel.add(res);
                
                return myPanel;
        }
    
        var myScriptPal = myScript_buildUI(thisObj);
        
        if((myScriptPal != null) && (myScriptPal instanceof Window)) {
                myScriptPal.center();
                myScriptPal.show();
        }
        
}
    
myScript(this);
}