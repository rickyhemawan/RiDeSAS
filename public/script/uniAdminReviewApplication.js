//jshint esversion: 6

const areYouSure = "Are you sure you want to modify this review? Once the review is submitted, it cannot be changed, and it will automatically send a generated email to the applicant";
const universityID = $("#universityID").val();
const programmeID = $("#programmeID").val();
const applicationID = $("#applicationID").val();
const redirectLink = "/programmes/" + universityID + "/show-applicants/" + programmeID;
const postUrl = redirectLink + "/applicant/" + applicationID;

$('#reject-button').click(function(){
  let res = confirm(areYouSure);
  if(res){
    $.ajax({
      url: postUrl,
      type: 'POST',
      data: {
        id: universityID,
        programmeID: programmeID,
        applicationID: applicationID,
        isApproved: 0,
        redirectUrl: redirectLink,
      },
      success: function(data){
        window.location.href = redirectLink;
      }
    });
  }
});

$('#approve-button').click(function(){
  let res = confirm(areYouSure);
  if(res){
    $.ajax({
      url: postUrl,
      type: 'POST',
      data: {
        id: universityID,
        programmeID: programmeID,
        applicationID: applicationID,
        isApproved: 1,
        redirectUrl: redirectLink,
      },
      success: function(data){
        window.location.href = redirectLink;
      }
    });
  }
});
