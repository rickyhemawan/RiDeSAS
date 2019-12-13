//jshint esversion: 6

let gradeList = [];

$('#qualification-type-form').on('submit', function(e){

  e.preventDefault();

  let method = $(this).attr('method');
  let action = $(this).attr('action');

  $.ajax({
    type: method,
    url: action,
    data:{
      qualificationName: $.trim($("#qualificationName"). val()),
      maxScore: $("#maxScore").val(),
      minScore: $("#minScore").val(),
      calcDescription: $.trim($("#resultCalcDescription option:selected"). val()),
      calcDescriptionScore: $("#resultCalcScore").val(),
      gradeList: gradeList,
    },
    success: function(data){
      console.log(data);
      window.location = "/qualifications";
    }

 });

 return false;

});

$('#add-grade-button').click(function() {
  let comment = $.trim($("#add-grade-textarea"). val());

  for(let i = 0; i < gradeList.length; i++){
    if ( gradeList[i] === comment) {
      gradeList.splice(i, 1);
      alert('Grade value must be unique!');
      return;
    }
  }

  let e = '<button type="button"class="badge badge-pill badge-secondary">'+ comment +'</button>';

  $('#add-grade-list').append(e);
  gradeList.push(comment);

  $('#add-grade-textarea').val('');

  console.log("new chip added " + comment);

  $('#add-grade-list').on('click', 'button.badge-pill', function(events){

    console.log($(this).text());
    console.log(gradeList);
    $(this).eq(0).remove();

    for( let i = 0; i < gradeList.length; i++){
       if ( gradeList[i] === $(this).text()) {
         gradeList.splice(i, 1);
       }
    }
    console.log("length: " + gradeList.length);

  });
});
