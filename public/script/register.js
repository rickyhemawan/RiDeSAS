//jshint esversion: 6

$("#register-new-user").on("submit", function(e) {

  e.preventDefault();

  let method = $(this).attr('method');
  let action = $(this).attr('action');



  if($("#password").val() !== $("#confirmPassword").val()){
    alert("Please input the same password!");
  }else{
    $.ajax({
      type: method,
      url: action,
      data: {
        username: $("#username").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        email: $("#email").val(),
      },
      success: function(data){
        window.location = "/register";
      }
    });
  }

  return false;

});
