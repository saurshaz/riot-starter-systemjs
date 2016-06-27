
import {moreFun} from './inner.js';
export function fun(name) {
	debugger;
	const meToo = () => {
	    console.log(' invoked me ... ',name)
		moreFun(name)
	}

	meToo(name)
	
}