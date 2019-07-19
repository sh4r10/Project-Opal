if(localStorage.getItem("list") === null){
  precode= `<li class="item">Buy Milk! <div class="remove-container"><i class="material-icons remove">delete</i></div></li>
  <li class="item">Still haven't bought milk <div class="remove-container"><i class="material-icons remove">delete</i></div></li>
  <li class="item checked">Do Math Homework! <div class="remove-container"><i class="material-icons remove">delete</i></div></li>`;
  localStorage.setItem("list", precode);
}

document.querySelector(".list").innerHTML = localStorage.getItem("list");

window.onload = function(){
  var form = document.getElementById("input-form");
  form.onsubmit = function(e){
    e.preventDefault();
    newItem();
}

  var listItems = document.querySelector("ul");
  listItems.addEventListener("click", function(ev){
    if(ev.target.tagName === "LI"){
      ev.target.classList.toggle("checked");
      save();
    }
  });

  var removeBtns = document.getElementsByClassName("remove");
  for(var i=0; i<removeBtns.length; i++){
    removeBtns[i].onclick = function(){
      var toRemove = this.parentElement;
      toRemove = toRemove.parentElement;
      toRemove.remove();
      save();
    }
  }

  function newItem(e){
    var ul = document.querySelector(".list");
    var task = document.querySelector(".input").value;
    document.querySelector(".input").value = "";
    document.querySelector(".input").focus();

    var listItem = document.createElement("LI");
    var textnode = document.createTextNode(task);
    listItem.appendChild(textnode);
    listItem.className = "item";
    ul.appendChild(listItem);

    var removeContainer = document.createElement("div");
    removeContainer.className = "remove-container";
    listItem.appendChild(removeContainer);
    var removeTag = document.createElement("I");
    removeTag.className = "material-icons remove";
    removeTag.innerHTML = "delete";
    removeContainer.appendChild(removeTag);
    save();
    //add remvoe functionality
    var removeBtns = document.getElementsByClassName("remove");
    for(var i=0; i<removeBtns.length; i++){
      removeBtns[i].onclick = function(){
        var toRemove = this.parentElement;
        toRemove = toRemove.parentElement;
        toRemove.remove();
        save();
      }
    }
  }

  function save(){
    var data = $(".list").html();
    localStorage.setItem("list", data);
  }
}
