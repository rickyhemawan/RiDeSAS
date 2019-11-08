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
        idType: $("#idType").val(),
        idNumber: $("#idNumber").val(),
        mobileNo: $("#mobileNo").val(),
        dateOfBirth: $("#dateOfBirth").val(),
      },
      success: function(data){
        window.location = "/login";
      }
    });
  }

  return false;

});
