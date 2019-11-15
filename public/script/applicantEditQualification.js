//jshint esversion: 6

const subjectResults = JSON.parse($("#subjectResults").val());
console.log("test");
if(subjectResults.length !== 0 ) console.log(subjectResults[0].subjectName);

$('#subject-list').on('click', '.thumbnail .caption button.btn', function(events){
  const subjectId = $(this).attr("id");
  console.log(subjectId);
  let deleteUrl = '/qualifications/'+$("#qualificationId").val()+'/delete-subject/'+subjectId;
  console.log(deleteUrl);

  let res = confirm("Are you sure you want to delete this qualification?");
  if(res){
    $.ajax({
      url: deleteUrl,
      type: 'DELETE',
      success: function(data){
        window.location.href = "/qualifications/"+$("#qualificationId").val();
      }
    });
  }
});

$('#btn_delete').click(function(){
  console.log("button clicked");
  let deleteUrl = '/qualifications/'+$("#qualificationId").val();
  console.log(deleteUrl);
  let res = confirm("Are you sure you want to delete this qualification?");
  if(res){
    $.ajax({
      url: deleteUrl,
      type: 'DELETE',
      success: function(data){
        window.location.href = "/qualifications";
      }
    });
  }
});
