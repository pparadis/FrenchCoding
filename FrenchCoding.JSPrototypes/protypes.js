var p1 = function(){
	console.log('Log');
};

var x = new p1();

p1.prototype.test = function(){
	console.log('Test');
}

var y = new p1();

//////////////////////////////////////

//constructeur
var x = function func(){
	//rien, juste pour l'exemple
}

x.prototype.log = function() {
	console.log("2");
}

var a = new x();
a.log(); //retourne "2"

x.prototype.foo = function() {
	console.log("3");
}

a.foo();

var b = new x();
b.log();
b.foo();


//fails
b.prototype.baz = function() {
	console.log(4);
}
