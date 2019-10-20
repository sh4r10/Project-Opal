$.ajax({
  url: "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=e420fd96fd2548df8726490101eae7fc",
  complete: function(data){
    console.log(data.responseJSON);
    handle(data.responseJSON);
  }
});
function handle(data){
  Handlebars.registerHelper("authorCheck", function(a){
    if(a == null){
      return "unknown";
    }
    else{
      return a;
    }
  })

  var rawTemplate = document.getElementById("news-template").innerHTML;
  var compiledTemplate = Handlebars.compile(rawTemplate);
  var generatedHTML = compiledTemplate(data);
  var container = document.querySelector(".news");
  container.innerHTML = generatedHTML;
}
