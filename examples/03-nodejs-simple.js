TicToc = require("./../TicToc.js");

timer = new TicToc.TicToc();
timer.after(0, function() {
	console.log("Timer started!");
});
timer.after(1500, function() {
	timer.after(2000, function() {
		console.log("asd");
	});
	console.log("This is executed after 1.5 seconds");
});
timer.after(3000, function() {
	console.log("This is never executed because the timer stopped. Use timer.start() to resume execution.");
});
timer.start();