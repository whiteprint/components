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
  function checkboxButtons() {
    var buttonCheckboxes = document.querySelectorAll('.button input[type="checkbox"]');
    for (var i = 0; i < buttonCheckboxes.length; i++) {
      buttonCheckboxes[i].parentNode.addEventListener('click', function() {
        var checked = this.querySelector('input[type="checkbox"]').checked;
        if (checked) {
          this.setAttribute("aria-pressed", "true");
        } else {
          this.setAttribute("aria-pressed", "false");
        }
        return false;
      });
    }
  }

  function dropdowns() {
    console.log('dropdowns');
  }

  radioButtons();
  checkboxButtons();
  dropdowns();

}));
