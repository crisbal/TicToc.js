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

		this.running = false;

		this.events = []; // events will be ordered in descending order

		this.elapsedTime = 0;
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
			this.tick();
		}
	}

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
		if(this.redoSort){
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

		if (!this.ticking){
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
