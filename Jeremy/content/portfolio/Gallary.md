+++
title = 'Gallery'
date = 2024-09-12T23:02:56Z
draft = false
+++

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}
</style>
</head>
<body>

<h2>Proposal Pictures</h2>

<p>Click on button to open section</p>
<button type="button" class="collapsible">Proposal</button>
<div class="content" style="display: none;">
  <img src="/img/Proposal.png" alt="Proposal1">
  <img src="/img/Proposal2.png" alt="Proposal2">
</div>
<h2>Car Pictures</h2>

<p>Click on button to open section</p>
<button type="button" class="collapsible">Cars</button>
<div class="content" style="display: none;">
  <img src="/img/car1.png" alt="Car1">
  <img src="/img/Car2.png" alt="Car2">
  <img src="/img/Car3.png" alt="Car3">
</div>

<h2>Animals Pictures</h2>
<p>Click on button to open section</p>
<button type="button" class="collapsible">Animals Pictures</button>
<div class="content" style="display: none;">
  <img src="/img/an1.png" alt="Animals1">
  <img src="/img/an2.png" alt="Animals2">
</div>

<script>
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
</script>

</body>

</html>
