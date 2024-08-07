(function() {
  function displayResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      searchResults.innerHTML = '';

      results.forEach(function(item) { // Iterate over the results
        var ref = item.ref;
        var title = store[ref].title;
        var url = store[ref].url;
        
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = url;
        a.textContent = title;
        li.appendChild(a);
        searchResults.appendChild(li);
      });
    } else {
      searchResults.innerHTML = '<li>Aucun résultat trouvé</li>';
    }
  }

  function getSearchIndex() {
    return fetch('/mycheatsheet/search.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var idx = lunr(function () {
          this.field('title');
          this.field('content');
          this.ref('id');
          
          // Ajout des documents à l'index
          data.forEach(function(doc) {
            this.add(doc);
          }, this);
        });

        return { idx: idx, store: data };
      });
  }

  var searchInput = document.getElementById('search-input');
  if (searchInput) {
    getSearchIndex().then(function(data) {
      var idx = data.idx;
      var store = data.store;

      searchInput.addEventListener('input', function() {
        var query = searchInput.value;
        var results = idx.search(query);
        displayResults(results, store);
      });
    });
  }
})();