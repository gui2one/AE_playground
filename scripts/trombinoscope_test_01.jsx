var comp = this.app.project.activeItem;

$.writeln("-------------------------------------------");
$.writeln("-------------------------------------------");
$.writeln("-------------------------------------------");
$.writeln("-------------------------------------------");

$.writeln(comp.name);
$.writeln(comp.items);

var obj = this.app.project;
for (item in obj) {
        $.writeln(item + "----------------------");
        //$.writeln(comp[item]);
        
}

$.writeln("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
$.writeln("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
$.writeln("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
$.writeln("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

$.writeln(obj.items[3].name);
$.writeln(obj.items[3].typeName);
