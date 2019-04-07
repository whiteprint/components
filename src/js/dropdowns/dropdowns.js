import Popper from 'popper.js';

// compile-time vars
//#set _DRPSEL = _SEL[":--dropdown-toggle"]
// check whether there are multiple selectors
//#if _DRPSEL.includes(_SEP)
//#set _DRPSELMULTI = true
//#set _DRPARR = _DRPSEL.split(_SEP)
// create array of selectors
var dropdownSelectors = $_DRPARR;
//#endif

export default function dropdowns() {

  // reusable function in case of multiple selectors
  function queryDropdowns(s) {
    // for all dropdowns
    for (var i = 0; i < s.length; i++) {
      let reference = s[i];
      let refID = s[i].id;
      let popper = document.querySelector('[aria-labelledby="' + refID + '"]');
      let popperInstance = new Popper(reference, popper, {
        // popper options
        placement: 'bottom-start'
      });

      reference.addEventListener('click', function(event) {
        event.preventDefault();

        // if closed
        if (popper.getAttribute("aria-hidden") == "true") {
          // open it
          popper.setAttribute("aria-hidden", "false");
        } else {
          // close it
          popper.setAttribute("aria-hidden", "true");
        }
      });

    }

  }

  //#if _DRPSELMULTI
  for (var i = 0; i < dropdownSelectors.length; i++) {
    queryDropdowns(document.querySelectorAll(dropdownSelectors[i]));
  }
  //#else
  queryDropdowns(document.querySelectorAll('$_DRPSEL'));
  //#endif

};
