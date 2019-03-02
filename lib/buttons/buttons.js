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

export default buttons;
