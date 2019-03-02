(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	var selectors = {
		customSelectors: {
			':--button': '.button',
			':--button-primary': '&[data-action="primary"]',
			':--button-group': '.button-group'
		}
	};

	function buttons() {
	  console.log(selectors);
	}

	function dropdowns() {
	  console.log('dropdowns');
	}

	buttons();
	dropdowns();

}));
