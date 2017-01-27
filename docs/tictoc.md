<a name="TicToc"></a>

## TicToc
TicToc

**Kind**: global class  

* [TicToc](#TicToc)
    * [new TicToc([options])](#new_TicToc_new)
    * [.start()](#TicToc+start)
    * [.stop()](#TicToc+stop)
    * [.toggle()](#TicToc+toggle) ⇒ <code>Boolean</code>
    * [.tick()](#TicToc+tick)
    * [.after(milliseconds, callback)](#TicToc+after)
    * [.afterFromNow(milliseconds, callback)](#TicToc+afterFromNow)
    * [.clear([stopTimer])](#TicToc+clear)
    * [.getElapsedTime()](#TicToc+getElapsedTime) ⇒ <code>Number</code>
    * [.getEvents()](#TicToc+getEvents) ⇒ <code>Array</code>
    * [.getTickrate()](#TicToc+getTickrate) ⇒ <code>Number</code>

<a name="new_TicToc_new"></a>

### new TicToc([options])
Represents a TicToc (aka timer) object.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.tickrate] | <code>Number</code> | <code>150</code> | The default tickrate for the timer, or how often [tick()](#TicToc+tick) will be called. |

<a name="TicToc+start"></a>

### ticToc.start()
Start the timer.
A [tick()](#TicToc+tick) will be executed.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  
<a name="TicToc+stop"></a>

### ticToc.stop()
Stop the timer.
A [tick()](#TicToc+tick) will be executed.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  
<a name="TicToc+toggle"></a>

### ticToc.toggle() ⇒ <code>Boolean</code>
[Start](#TicToc+start) or [stop](#TicToc+stop) the timer.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  
**Returns**: <code>Boolean</code> - the state of the timer after starting/stopping (`true` if running, `false` otherwise)  
<a name="TicToc+tick"></a>

### ticToc.tick()
Fire the events that needs to be fired.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  
<a name="TicToc+after"></a>

### ticToc.after(milliseconds, callback)
Schedule an event to execute `callback` after `milliseconds` from the start of the timer.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  

| Param | Type | Description |
| --- | --- | --- |
| milliseconds | <code>Number</code> | Milliseconds after which `callback` will be called (couting from the starting time of the timer) |
| callback | <code>function</code> | Callback to execute once `milliseconds` ms passed. |

<a name="TicToc+afterFromNow"></a>

### ticToc.afterFromNow(milliseconds, callback)
Schedule an event to execute `callback` after `milliseconds` from the moment the function is called.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  

| Param | Type | Description |
| --- | --- | --- |
| milliseconds | <code>Number</code> | Milliseconds after which `callback` will be called (couting from the moment the function is called) |
| callback | <code>function</code> | Callback to execute once `milliseconds` ms passed. |

<a name="TicToc+clear"></a>

### ticToc.clear([stopTimer])
Clear any scheduled event from the timer.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stopTimer] | <code>Boolean</code> | <code>true</code> | Also stops the timer. |

<a name="TicToc+getElapsedTime"></a>

### ticToc.getElapsedTime() ⇒ <code>Number</code>
Get the elapsed time from the start of the timer.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  
**Returns**: <code>Number</code> - elapsed time in milliseconds  
<a name="TicToc+getEvents"></a>

### ticToc.getEvents() ⇒ <code>Array</code>
Get the scheduled events.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  
**Returns**: <code>Array</code> - array of `event` objects  
<a name="TicToc+getTickrate"></a>

### ticToc.getTickrate() ⇒ <code>Number</code>
Get the tickrate of the timer.

**Kind**: instance method of <code>[TicToc](#TicToc)</code>  
**Returns**: <code>Number</code> - tickrate (in milliseconds) of the timer  
