import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="user"
export default class extends Controller {
  connect() {
    $(document).ready(function() {
      $("#new_user").validate({
        rules: {
          "user[name]": {
            required: true,
            minlength: 3
          },
          "user[my_coin]": {
            required: true
          },
          "user[share_type]": {
            required: true,
          }
        },
        messages: {
          "user[name]": {
            required: "Please enter your name",
            minlength: "Your name must consist of at least 3 characters"
          },
          "user[my_coin]": {
            required: "Please enter coin amount"
          },
          "user[share_type]": {
            required: "Please enter share type",
          }
        }
      });
    });
  }
}
