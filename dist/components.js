(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function radioButtons() {
    var buttonRadios = document.querySelectorAll('.button input[type="radio"]');
    for (var i = 0; i < buttonRadios.length; i++) {
      buttonRadios[i].parentNode.addEventListener('click', function() {
        var radioName = this.querySelector('input[type="radio"]').getAttribute('name');
        for (var j = 0; j < buttonRadios.length; j++) {
          if (buttonRadios[j].name == radioName) {
            buttonRadios[j].parentNode.setAttribute("aria-checked", "false");
          }
        }
        this.setAttribute("aria-checked", "true");
        return false;
      });
    }
  }

  function dropdowns() {
    console.log('dropdowns');
  }

  radioButtons();
  dropdowns();

}));
