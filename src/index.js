/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/


export default class Component {
	constructor	(){
		this.eventHandler = {};
		this.options = {};
	}

	option(...args) {
		if (args.length >= 2) {
			const key = args[0];
			const value = args[1];
			this.options[key] = value;
			return this;
		}

		const key = args[0];
		if (typeof key === "string") {
			return this.options[key];
		}

		if (args.length === 0) {
			return this.options;
		}

		const options = key
		this.options = options;

		return this;
	}

	trigger(eventName, customEvent = {}, ...restParam) {
		let handlerList = this.eventHandler[eventName] || [];
		const hasHandlerList = handlerList.length > 0;

		if (!hasHandlerList) {
			return true;
		}

		// If detach method call in handler in first time then handeler list calls.
		handlerList = handlerList.concat();

		customEvent.eventType = eventName;

		let isCanceled = false;
		let arg = [customEvent];
		let i;

		customEvent.stop = () => isCanceled = true;


		if (restParam.length > 1) {
			arg = arg.concat(restParam);
		}

		for (i in handlerList){
			handlerList[i].apply(this, arg);
		}

		return !isCanceled;
	}

	hasOn(eventName) {
		return !!this.eventHandler[eventName];
	}

	on(eventName, handlerToAttach) {
		if (typeof eventName === "object" &&
		typeof handlerToAttach === "undefined") {
			let eventHash = eventName;
			let name;
			for (name in eventHash) {
				this.on(name, eventHash[name]);
			}
			return this;
		} else if (typeof eventName === "string" &&
			typeof handlerToAttach === "function") {
			let handlerList = this.eventHandler[eventName];

			if (typeof handlerList === "undefined") {
				handlerList = this.eventHandler[eventName] = [];
			}

			handlerList.push(handlerToAttach);
		}

		return this;
	}

	off(eventName, handlerToDetach) {
		// All event detach.
		if (typeof eventName === "undefined") {
			this.eventHandler = {};
			return this;
		}

		// All handler of specific event detach.
		if (typeof handlerToDetach === "undefined") {
			if (typeof eventName === "string") {
				this.eventHandler[eventName] = undefined;
				return this;
			} else {
				let eventHash = eventName;
				let name;
				for (name in eventHash) {
					this.off(name, eventHash[name]);
				}
				return this;
			}
		}

		// The handler of specific event detach.
		let handlerList = this.eventHandler[eventName];
		if (handlerList) {
			let k;
			let handlerFunction;
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
