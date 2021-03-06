import Popper from 'popper.js';

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
  queryDropdowns(document.querySelectorAll('[aria-haspopup="true"]'));
}

export default dropdowns;
