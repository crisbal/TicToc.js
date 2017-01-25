# TicToc.js

Simple JavaScript module to schedule events via a timer, with the ability to start and stop the timer.

## Sample Usage

```javascript
timer = new TicToc.TicToc();
timer.after(0, function() {
	console.log("Timer started!");
});
timer.after(1500, function() {
	console.log("This is executed after 1.5 seconds");
	timer.stop(); // stops the timer
});
timer.after(3000, function() {
	console.log("This is never executed because the timer stopped. Use timer.start() to resume execution.");
});
timer.start();
```
## Installation

### Browser

### Node.js
