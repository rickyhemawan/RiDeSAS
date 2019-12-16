//jshint esversion:6
// const getUrl = "/?q=" + $("#search-textfield").val();

$('#search-button').click(function(){
  const q = $("#search-textfield").val().toLowerCase();
  console.log(q);
  window.location.href = "/?q=" + q;
});

$('#clear-button').click(function(){
  window.location.href = "/";
});
