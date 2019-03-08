// toggle state of buttons that contain radio inputs
export default function radioButtons() {

  // compile-time vars
  //#set _RADINPT = 'input[type="radio"]'
  //#set _BTNSEL = _SEL[":--button"]
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

};
