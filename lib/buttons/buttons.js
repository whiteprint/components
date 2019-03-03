var selectors = {
	customSelectors: {
		':--button': '.button',
		':--button-primary': '&[data-action="primary"]',
		':--button-group': '.button-group'
	}
};

function radioButtons() {
  var buttonSelector = selectors.customSelectors[":--button"];
  var buttonGroupSelector = selectors.customSelectors[":--button-group"];
  var radioInput = 'input[type="radio"]';
  var buttonRadios = document.querySelectorAll(buttonSelector + ' ' + radioInput);
  for (var i = 0; i < buttonRadios.length; i++) {
    buttonRadios[i].parentNode.addEventListener('click', function() {
      var radioName = this.querySelector(radioInput).getAttribute('name');
      for (var j = 0; j < buttonRadios.length; j++) {
        if (buttonRadios[j].name == radioName) {
          buttonRadios[j].parentNode.setAttribute("aria-selected", "false");
        }
      }
      this.setAttribute("aria-selected", "true");
      return false;
    });
  }
  console.log(selectors);
}

export default radioButtons;
