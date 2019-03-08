// compile-time vars
//#set _BTNSEL = _SEL[":--button"]
//#set _RADINPT = 'input[type="radio"]'
//#set _CHKINPT = 'input[type="checkbox"]'


// toggle state of buttons that contain radio inputs
export function radioButtons() {

  // run-time vars
  var buttonRadios = document.querySelectorAll('$_BTNSEL $_RADINPT');

  // for all radio inputs inside buttons
  for (var i = 0; i < buttonRadios.length; i++) {
    // listen for click on parent (button)
    buttonRadios[i].parentNode.addEventListener('click', function() {
      // set all with same name to false
      var radioName = this.querySelector('$_RADINPT').getAttribute('name');

      for (var j = 0; j < buttonRadios.length; j++) {
        if (buttonRadios[j].name == radioName) {
          buttonRadios[j].parentNode.setAttribute("aria-checked", "false");
        }
      }
      // set clicked to true
      this.setAttribute("aria-checked", "true");
      return false;
    });
  }
}

// toggle state of buttons that contain checkbox inputs
export function checkboxButtons() {

  // run-time vars
  var buttonCheckboxes = document.querySelectorAll('$_BTNSEL $_CHKINPT');

  // for all checkbox inputs inside buttons
  for (var i = 0; i < buttonCheckboxes.length; i++) {
    // listen for click on parent (button)
    buttonCheckboxes[i].parentNode.addEventListener('click', function() {
      // checkbox status
      var checked = this.querySelector('$_CHKINPT').checked;
      // if checked
      if (checked) {
        // set to true
        this.setAttribute("aria-pressed", "true");
      } else {
        // set to false
        this.setAttribute("aria-pressed", "false");
      }
      return false;
    });
  }
}
