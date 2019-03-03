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

	// get selectors defined in CSS

	// toggle state of buttons that contain radio inputs
	function radioButtons() {

	  var buttonSelector = selectors.customSelectors[":--button"];
	  var buttonGroupSelector = selectors.customSelectors[":--button-group"];
	  var radioInput = 'input[type="radio"]';
	  var buttonRadios = document.querySelectorAll(buttonSelector + ' ' + radioInput);

	  // for all radio inputs inside buttons
	  for (var i = 0; i < buttonRadios.length; i++) {
	    // listen for click on parent (button)
	    buttonRadios[i].parentNode.addEventListener('click', function() {
	      // set all with same name to false
	      var radioName = this.querySelector(radioInput).getAttribute('name');
	      
	      for (var j = 0; j < buttonRadios.length; j++) {
	        if (buttonRadios[j].name == radioName) {
	          buttonRadios[j].parentNode.setAttribute("aria-selected", "false");
	        }
	      }
	      // set clicked to true
	      this.setAttribute("aria-selected", "true");
	      return false;
	    });
	  }

	  console.log(selectors);
	}

	function dropdowns() {
	  console.log('dropdowns');
	}

	radioButtons();
	dropdowns();

}));
