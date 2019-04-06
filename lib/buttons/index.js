//#set _BTNSEL = _SEL[":--button"]
//#set _RADINPT = 'input[type="radio"]'
//#set _CHKINPT = 'input[type="checkbox"]'
//#if  _BTNSEL.includes(_SEP)
//#set _BTNSELMULTI = true
//#set _BTNARR = _BTNSEL.split(_SEP)
var buttonSelectors = $_BTNARR;
//#endif
function radioButtons() {
  function queryRadioButtons(s) {
    for (var i = 0; i < s.length; i++) {
      s[i].parentNode.addEventListener('click', function() {
        var radioName = this.querySelector('$_RADINPT').getAttribute('name');
        for (var j = 0; j < s.length; j++) {
          if (s[j].name == radioName) {
            s[j].parentNode.setAttribute("aria-checked", "false");
          }
        }
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
function checkboxButtons() {
  function queryCheckboxButtons(s) {
    for (var i = 0; i < s.length; i++) {
      s[i].parentNode.addEventListener('click', function() {
        var checked = this.querySelector('$_CHKINPT').checked;
        if (checked) {
          this.setAttribute("aria-pressed", "true");
        } else {
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

export { radioButtons, checkboxButtons };
