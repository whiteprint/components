// get selectors defined in CSS
import customSelectors from '../selectors.js';

// toggle state of buttons that contain radio inputs
export default function radioButtons() {

  var buttonSelector = customSelectors.customSelectors[":--button"];
  var buttonGroupSelector = customSelectors.customSelectors[":--button-group"];
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

  console.log(customSelectors);
};
