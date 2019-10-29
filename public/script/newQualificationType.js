//jshint esversion: 6

var gradeList = [];

$('#submit-new-qualification-type').click(function(){
  $.ajax({
    type: 'post',
    data:{
      qualificationName: $.trim($("#qualificationName"). val()),
      maxScore: $.trim($("#maxScore"). val()),
      minScore: $.trim($("#minScore"). val()),
      calcDescription: $.trim($("#calcDescription"). val()),
      gradeList: gradeList,
    },
    url: '/',
 });
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
