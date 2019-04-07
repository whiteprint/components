module.exports = {
	customSelectors: {
		':--alert': '.alert',
		':--alert-icon': '.alert_icon',
		':--alert-heading': '.alert_heading',
		':--alert-body': '.alert_body',
		':--alert-body-section': '.alert_section',
		':--alert-body-section-long-modifier': '[data-type="long"]',
		':--button': '.button',
		':--button-primary-modifier': '[data-action="primary"]',
		':--button-active-modifier': '[aria-pressed="true"]',
		':--button-group': '.button-group',
		':--dropdown-toggle': '.button.submenu-toggle, .menu .submenu-toggle',
		':--dropdown-content': '.button.submenu-toggle + .submenu, .menu .submenu'
	}
};
