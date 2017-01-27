TicToc = require("./../TicToc.js");

timer = new TicToc.TicToc();
timer.after(0, function() {
	console.log("Timer started!");
});
timer.after(1500, function() {
	timer.afterFromNow(500, function() {
		console.log("This is executed after 2000ms");
	});
	console.log("This is executed after 1500 seconds");
});
timer.after(3000, function() {
	timer.stop();
});
timer.start();