import Popper from 'popper.js';

//#set _DRPSEL = _SEL[":--dropdown-toggle-js"]
//#if _DRPSEL.includes(_SEP)
//#set _DRPSELMULTI = true
//#set _DRPARR = _DRPSEL.split(_SEP)
var dropdownSelectors = $_DRPARR;
//#endif
function dropdowns() {
  function queryDropdowns(s) {
    for (var i = 0; i < s.length; i++) {
      let reference = s[i];
      let refID = s[i].id;
      let popper = document.querySelector('[aria-labelledby="' + refID + '"]');
      let popperInstance = new Popper(reference, popper, {
        placement: 'bottom-start',
        onCreate: data => {
          popper.style.minWidth = reference.clientWidth + "px";
        },
        onUpdate: data => {
          popper.style.minWidth = reference.clientWidth + "px";
        },
      });
      function closeDropdowns() {
        popper.setAttribute("aria-hidden", "true");
        document.removeEventListener('click', closeDropdowns);
      }
      popper.setAttribute("aria-hidden", "true");
      reference.addEventListener('click', function(event) {
        event.preventDefault();
        if (popper.getAttribute("aria-hidden") == "true") {
          popper.setAttribute("aria-hidden", "false");
          setTimeout(function(){
            document.addEventListener('click', closeDropdowns);
          }, 0);
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
}

export default dropdowns;
