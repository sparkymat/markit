// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap"
import { Modal } from "bootstrap"

Rails.start()
ActiveStorage.start()

require("../stylesheets/main.scss")

$(document).ready(() => {
  $('#addModal').on('show.bs.modal', () => {
    var linkInput = document.querySelector('#link');
    linkInput.focus();
    document.execCommand('Paste');
  });

  $('.js-remote-modal-link').on('click', (e) => {
    e.preventDefault();
    var link = $(e.target).attr('href');
    $.ajax(link).done((data) => {
      $('#remoteModal .modal-content').html(data); 

      var remoteModalEl = document.getElementById('remoteModal')
      var remoteModal = new Modal(remoteModalEl);
      remoteModal.show();
    });
  });
});
