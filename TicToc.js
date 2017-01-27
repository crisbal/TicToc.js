"use strict";

(function(exports){
	/**
	 * Represents a TicToc (aka timer) object.
	 * @class TicToc
	 * @constructor
	 * @param {Object} [options]
	 * @param {Number} [options.tickrate=150] The default tickrate for the timer, or how often {@link TicToc#tick tick()} will be called.
	 */
	var TicToc = function(options){
		this.options = options || {};

		this.running = false; // is the timer running?

		this.events = []; // events will be ordered in descending order
		/* Why sort the array? 
		We sort the array because this way we avoid looping all the array every time inside `tick()`.
		And since we `tick()` very very often we want to avoid wasting CPU. Does it really matter? Not if you have 5 events to check, probably it does if you 50000 of them.
		Other solutions could be implemented, such as having a variable that keeps track of the earliest event.
		I think this solution looks cleaner, even if we have some additional conditions to keep track of (see below). 
		*/

		this.elapsedTime = 0; // how many ms have passed since `start()`

		this.ticking = false; // this variable will indicate  if we are curently in the tick() function
		this.redoSort = false; // this variable will indicate if, at the end of tick() we need to re-sort the array of events
		/* Why do `ticking` and `redoSort` exist?
		   Consider the case of this code:
		   ```
		   timer.after(1500, function() {
		   	timer.after(2000, function() {
			 console.log("This is executed after 2000");
			});
		   });
		   ```
		   When firing the 1500ms event we add another event to our `events` array.
		   Adding an event also requires the array to be sorted (see consideration about sorting above). 
		   If we are in the middle of the looping, suppose at index `i`, we execute `events[i].callback()`, 
		   the callback adds an event and that event is placed at index `i` after the sorting. 
		   Since we remove the event after firing the callback we would remove the `i`th event:
		   here is the problem: we would remove the newly added event and not the one that was executed. 	     
		   With these two variables we enable the sorting of the array only if we are not ticking.
		*/

	};

	/**
	 * Start the timer.
	 * A {@link TicToc#tick tick()} will be executed.
	 */
	TicToc.prototype.start =function(){
		if (!this.running) {
			this.running = true;

			this.lastTicktime = Date.now();
			this.tick();
			this.ticker = setInterval(this.tick.bind(this), this.getTickrate());
		}
	}

	/**
	 * Stop the timer.
	 * A {@link TicToc#tick tick()} will be executed.
	 */
	TicToc.prototype.stop =function(){
		if (this.running) {
			this.running = false;

			clearInterval(this.ticker);
			
			if(!this.ticking) // don't `tick()` if we are alreay ticking: avoid problems when a callback calls stop();
				this.tick();
		}
	}
1
	/**
	 * {@link TicToc#start Start} or {@link TicToc#stop stop} the timer.
	 * @returns {Boolean} the state of the timer after starting/stopping (`true` if running, `false` otherwise)
	 */
	TicToc.prototype.toggle = function(){
		if (this.running) {
			this.stop();
		} else {
			this.start();
		}
		return this.running;
	}

	TicToc.prototype.updateElapsedTime = function() {
		var now = Date.now();
		var timeSinceLastTick = (now - this.lastTicktime);
		this.lastTicktime = now;
		this.elapsedTime += timeSinceLastTick;
	}

	/**
	 * Fire the events that needs to be fired.
	 */
	TicToc.prototype.tick = function(){
		this.ticking = true;
		this.updateElapsedTime();

		for (var i = this.events.length - 1; i >= 0; i--) { // use the backward for loop because we need to be able to splice/remove elements from our array
			if(this.elapsedTime >= this.events[i].delay){
				this.events[i].callback(); // fire the event
				this.events.splice(i, 1); // remove the event: lost, forever.
			} else {
				break; //since they are ordered in descending order we can break without missing anything
			}
		}

		if (this.redoSort) { // an event was added in a callback
			this.events.sort(function(e1, e2) { // this comparator will sort in descending order, latest event first
				if(e1.delay < e2.delay)
					return 1;
				if(e1.delay > e2.delay)
					return -1;
				return 0;
			});
			this.redoSort = false;
		}
		this.ticking = false;
	}

	/**
	 * Schedule an event to execute `callback` after `milliseconds` from the start of the timer.
	 *	@param {Number} milliseconds Milliseconds after which `callback` will be called (couting from the starting time of the timer)
	 * @param {Function} callback Callback to execute once `milliseconds` ms passed.
	 */
	TicToc.prototype.after = function(milliseconds, callback){
		this.events.push({
			"delay": milliseconds,
			"callback": callback
		});

		if (!this.ticking) {
			this.events.sort(function(e1, e2) { // this comparator will sort in descending order, latest event first
				if(e1.delay < e2.delay)
					return 1;
				if(e1.delay > e2.delay)
					return -1;
				return 0;
			});
		} else {
			this.redoSort = true;
		}
	};

	/**
	 * Schedule an event to execute `callback` after `milliseconds` from the moment the function is called.
	 *	@param {Number} milliseconds Milliseconds after which `callback` will be called (couting from the moment the function is called)
	 * @param {Function} callback Callback to execute once `milliseconds` ms passed.
	 */
	TicToc.prototype.afterFromNow = function(milliseconds, callback){
		this.after(this.getElapsedTime() + milliseconds, callback);
	}

	/**
	 * Clear any scheduled event from the timer.
	 * @param {Boolean} [stopTimer=true] Also stops the timer.
	 */
	TicToc.prototype.clear = function(stopTimer){
		stopTimer = typeof stopTimer !== 'undefined' ? stopTimer : true;
		
		this.events = [];
		if (stopTimer) this.stop();
	}

	/**
	 * Get the elapsed time from the start of the timer.
	 * @returns {Number} elapsed time in milliseconds
	 */
	TicToc.prototype.getElapsedTime = function(){
		return this.elapsedTime;
	}

	/**
	 * Get the scheduled events.
	 * @returns {Array} array of `event` objects
	 */
	TicToc.prototype.getEvents = function(){
		return this.events;
	}

	/**
	 * Get the tickrate of the timer.
	 * @returns {Number} tickrate (in milliseconds) of the timer
	 */
	TicToc.prototype.getTickrate = function(){
		return this.options.tickrate || 150;
	}

	exports.TicToc = TicToc;

})(typeof exports === 'undefined'? this['TicToc']={}: exports);
