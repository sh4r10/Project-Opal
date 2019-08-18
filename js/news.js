function requestData(){
  console.log("run function");
  $.ajax({
    url: "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=e420fd96fd2548df8726490101eae7fc",
    complete: function(data){
      processData(data.responseJSON);
    }
  });
}

function processData(data){

  for(var i=0; i<data.articles.length; i++){
    if(data.articles[i].title.length > 75){
      data.articles.splice(i, 1);
    }
    else if(data.articles[i].author == null){
      data.articles.splice(i,1);
    }
    else if(data.articles[i].description.length > 75){
      var str = data.articles[i].description.split("");
      str = str.slice(0,75);
      if(str[75] == "."){
        str.push("..");
      }
      else{
        str.push("...");
      }
      data.articles[i].description = str.join("");
    }   
  }
  var rawTemplate = document.getElementById("news-template").innerHTML;
  var compiledTemplate = Handlebars.compile(rawTemplate);
  var generatedHTML = compiledTemplate(data);
  var container = document.getElementById("news-container");
  container.innerHTML = generatedHTML;
}
requestData();
