/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/


export class Component {
	constructor	(){
		this.eventHandler = {};
		this.options = {};
	}

	option(key, value) {
		if (arguments.length >= 2) {
			this.options[key] = value;
			return this;
		}

		if (typeof key === "string") {
			return this.options[key];
		}

		if (arguments.length === 0) {
			return this.options;
		}

		for (var i in key) {
			this.options[i] = key[i];
		}

		return this;
	}

	trigger(eventName, customEvent) {
		customEvent = customEvent || {};
		var handlerList = this.eventHandler[eventName] || [];
		var hasHandlerList = handlerList.length > 0;

		if (!hasHandlerList) {
			return true;
		}

		// If detach method call in handler in first time then handeler list calls.
		handlerList = handlerList.concat();

		customEvent.eventType = eventName;

		var isCanceled = false;
		var arg = [customEvent];
		var i;
		var len;
		var handler;

		customEvent.stop = function() {
			isCanceled = true;
		};

		if ((len = arguments.length) > 2) {
			arg = arg.concat(Array.prototype.slice.call(arguments, 2, len));
		}

		for (i = 0; handler = handlerList[i]; i++) {
			handler.apply(this, arg);
		}

		return !isCanceled;
	}

	hasOn(eventName) {
		return !!this.eventHandler[eventName];
	}

	on(eventName, handlerToAttach) {
		if (typeof eventName === "object" &&
		typeof handlerToAttach === "undefined") {
			var eventHash = eventName;
			var i;
			for (i in eventHash) {
				this.on(i, eventHash[i]);
			}
			return this;
		} else if (typeof eventName === "string" &&
			typeof handlerToAttach === "function") {
			var handlerList = this.eventHandler[eventName];

			if (typeof handlerList === "undefined") {
				handlerList = this.eventHandler[eventName] = [];
			}

			handlerList.push(handlerToAttach);
		}

		return this;
	}

	off(eventName, handlerToDetach) {
		// All event detach.
		if (arguments.length === 0) {
			this.eventHandler = {};
			return this;
		}

		// All handler of specific event detach.
		if (typeof handlerToDetach === "undefined") {
			if (typeof eventName === "string") {
				this.eventHandler[eventName] = undefined;
				return this;
			} else {
				var eventHash = eventName;
				for (var i in eventHash) {
					this.off(i, eventHash[i]);
				}
				return this;
			}
		}

		// The handler of specific event detach.
		var handlerList = this.eventHandler[eventName];
		if (handlerList) {
			var k;
			var handlerFunction;
			for (k = 0, handlerFunction; handlerFunction = handlerList[k]; k++) {
				if (handlerFunction === handlerToDetach) {
					handlerList = handlerList.splice(k, 1);
					break;
				}
			}
		}

		return this;
	}
}
