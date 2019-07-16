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
