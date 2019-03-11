(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function radioButtons() {
    function queryRadioButtons(s) {
      for (var i = 0; i < s.length; i++) {
        s[i].parentNode.addEventListener('click', function() {
          var radioName = this.querySelector('input[type="radio"]').getAttribute('name');
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
    queryRadioButtons(document.querySelectorAll('.button input[type="radio"]'));
  }
  function checkboxButtons() {
    function queryCheckboxButtons(s) {
      for (var i = 0; i < s.length; i++) {
        s[i].parentNode.addEventListener('click', function() {
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
    queryCheckboxButtons(document.querySelectorAll('.button input[type="checkbox"]'));
  }

  function dropdowns() {
    console.log('dropdowns');
  }

  radioButtons();
  checkboxButtons();
  dropdowns();

}));
