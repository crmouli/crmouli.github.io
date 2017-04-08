define(['knockout', 'elunr'],
        function (ko, elunr) {
          function blogIndexer(posts, categories) {
            var self = this;
            var index = elunr(function () {
              this.addField('title');
              this.addField('content');
              this.addField('category');
              this.setRef('id');
            });
            index.saveDocument(false);
            
              posts.forEach(function (value) {
                index.addDoc({
                  "id": value.id,
                  "title": value.title
                });
              });
            this._mapResults = function(results){
              var options = [];
              results.forEach(function (result) {
                options = options.concat(posts.filter(function (value) {
                  return value.id === result.ref;
                }));
              });
              return options;
            };
            
            this.search = function (term) {
                var posts = [];
                var term = term;
                if (term) {
                  var results = index.search(term);
                  posts = self._mapResults(results);
                } 
                return posts;
            };
            this.findPostsByCategory = function(categoryId){
              var posts = [];
              var results = index.search({
                category: categoryId
              });
              posts = self._mapResults(results);
              return posts;
            }
          }

          return blogIndexer;
        });
