---
layout: default
title: "Recherche"
---

# Recherche

<form id="search-form">
  <input type="text" id="search-input" placeholder="Rechercher...">
  <ul id="search-results"></ul>
</form>

<!-- Include Lunr.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js"></script>

<!-- Your custom script -->
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>