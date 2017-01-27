# TicToc.js

Simple JavaScript module to schedule events via a timer, with the ability to start and stop the timer. It works both in the browser and in Node.js.

## Sample Usage

```javascript
timer = new TicToc.TicToc();
timer.after(0, function() {
	console.log("This is executed on timer start");
});
timer.after(1500, function() {
	console.log("This is executed after 1.5 seconds");
	   
    timer.afterFromNow(500, function() {
        console.log("This is executed after 500ms of the current time: 2 seconds.");
        timer.stop(); // stops the timer
    });
});
timer.after(3000, function() {
	console.log("This is never executed because the timer stopped. Use timer.start() to resume execution.");
});
timer.start(); // starts the time
```
## Installation

### Browser

**For development**:

```html
<script src="https://rawgit.com/crisbal/TicToc.js/master/TicToc.js"></script>
```

**For production**:

* `git clone https://github.com/crisbal/TicToc.js`
* `<script src="TicToc.js/TicToc.js"></script>`

### Node.js

TODO

## Examples

Check out the [`examples` folder](https://github.com/crisbal/TicToc.js/tree/master/examples).

## Documentation
 
Check out the [documentation](https://github.com/crisbal/TicToc.js/tree/master/docs/tictoc.md) to see the available methods of the `TicToc` class.

If you are curious on how the library works just open [TicToc.js](https://github.com/crisbal/TicToc.js/tree/master/TicToc.js) and read all the comments. 

## Contributing

Feel free to open issues and submit pull requests! 

## License

GPL 3.0

