import Popper from 'popper.js';

export default function dropdowns() {

  // reusable function in case of multiple selectors
  function queryDropdowns(s) {
    // for all dropdowns
    for (var i = 0; i < s.length; i++) {
      let reference = s[i];
      let refID = s[i].id;
      let popper = document.querySelector('[aria-labelledby="' + refID + '"]');
      let popperInstance = new Popper(reference, popper, {
        // popper options here
      });

      reference.addEventListener('click', function(event) {
        event.preventDefault();
        console.log("clicked " + refID);
        popper.setAttribute("aria-hidden", "false");
      });
    }
  }

  queryDropdowns(document.querySelectorAll('.menu_submenu-toggle'));

};
