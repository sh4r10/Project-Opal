//Overlay functionality
var infoBtn = document.querySelector(".info-btn");
infoBtn.addEventListener("click", showOverlay);

function showOverlay(){
  var overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", hideOverlay);
  overlay.style.display = "block";
  document.querySelector(".aword").style.display = "block";
}

function hideOverlay(){
  document.querySelector(".overlay").style.display =  "none";
  document.querySelector(".aword").style.display = "none";
}

//copy text
function copy(str){
  // Create new element
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = str;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   alerter("copy", "successful");
}

function alerter(op, status){
  var success = "#66bb6a";
  var fail = "#e53935";
  if(op == "copy"){
    if(status == "successful"){
      showAlert("Link copied!", success);
    }
  }
}

function showAlert(message, color){
  var alert = document.querySelector(".alert");
  var text = document.querySelector(".text");
  $(".alert").fadeIn();
  alert.style.background = color;
  text.innerHTML = message;

  setTimeout(function(){
    $(".alert").fadeOut();
  }, 2000);

}
