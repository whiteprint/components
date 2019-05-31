// compile-time vars
//#set _BTNSEL = _SEL[":--button-js"]
//#set _RADINPT = 'input[type="radio"]'
//#set _CHKINPT = 'input[type="checkbox"]'
// check whether there are multiple selectors
//#if  _BTNSEL.includes(_SEP)
//#set _BTNSELMULTI = true
//#set _BTNARR = _BTNSEL.split(_SEP)
// create array of selectors
var buttonSelectors = $_BTNARR;
//#endif

// toggle state of buttons that contain radio inputs
export function radioButtons() {
  // reusable function in case of multiple selectors
  function queryRadioButtons(s) {
    // for all radio inputs inside buttons
    for (var i = 0; i < s.length; i++) {
      // listen for click on parent (button)
      s[i].parentNode.addEventListener('click', function() {
        // set all with same name to false
        var radioName = this.querySelector('$_RADINPT').getAttribute('name');

        for (var j = 0; j < s.length; j++) {
          if (s[j].name == radioName) {
            s[j].parentNode.setAttribute("aria-checked", "false");
          }
        }
        // set clicked to true
        this.setAttribute("aria-checked", "true");
        return false;
      });
    }
  }
  //#if _BTNSELMULTI
  for (var i = 0; i < buttonSelectors.length; i++) {
    queryRadioButtons(document.querySelectorAll(buttonSelectors[i] + ' $_RADINPT'));
  }
  //#else
  queryRadioButtons(document.querySelectorAll('$_BTNSEL $_RADINPT'));
  //#endif
}

// toggle state of buttons that contain checkbox inputs
export function checkboxButtons() {
  // reusable function in case of multiple selectors
  function queryCheckboxButtons(s) {
    // for all checkbox inputs inside buttons
    for (var i = 0; i < s.length; i++) {
      // listen for click on parent (button)
      s[i].parentNode.addEventListener('click', function() {
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
  //#if _BTNSELMULTI
  for (var i = 0; i < buttonSelectors.length; i++) {
    queryCheckboxButtons(document.querySelectorAll(buttonSelectors[i] + ' $_CHKINPT'));
  }
  //#else
  queryCheckboxButtons(document.querySelectorAll('$_BTNSEL $_CHKINPT'));
  //#endif
}
