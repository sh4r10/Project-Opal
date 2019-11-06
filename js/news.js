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
    else if(a.split("").length > 32){
      return "unknown";
    }
    else{
      return a;
    }
  })

  Handlebars.registerHelper("lengthCheck", function(d){
    if(d.split(" ").length > 20){
      return d.split(" ").splice(0,20).join(" ") + "...";
    }
    else{
      return d;
    }
  });

  Handlebars.registerHelper("headingCheck", function(h){

    if(h.split(" ").length > 12){
      to = h.split(" ").splice(0, 12).join(" ") + "...";
      split = to.split("-");
      splitted = split[0];
      return split[0];
    }
    else{
      split = h.split("-");
      splitted = split[0];
      return splitted;
    }
  });

  var rawTemplate = document.getElementById("news-template").innerHTML;
  var compiledTemplate = Handlebars.compile(rawTemplate);
  var generatedHTML = compiledTemplate(data);
  var container = document.querySelector(".news");
  container.innerHTML = generatedHTML;
}
