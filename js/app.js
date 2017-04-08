define(['ojs/ojcore', 'knockout', 'jquery', 'blogIndexer', 'ojs/ojknockout', 'ojs/ojbutton','ojs/ojmodule'], function(oj, ko, $, blogIndexer){
  var app = function(){
    var self = this;
    this.blogHeaderText = oj.Translations.getTranslatedString("blogTitle");
    this.blogCategoriesTitle = oj.Translations.getTranslatedString("blogCategoriesTitle");;
    this.blogSearchTitle = oj.Translations.getTranslatedString("blogSearchTitle");;
    this.copyright = oj.Translations.getTranslatedString("copyright");
//    this.readMoreTitle = oj.Translations.getTranslatedString("readMoreTitle");
    
    this.categoryTitle = "";
    this.categoryCaption = "";
    this.widgets = [];
//            [{
//       title: "Side Widget Wall",
//       path: "aboutme"
//    },
//    {
//      title: "Contact",
//      path: "contact"
//      
//    }];

    this.initialize = function(){
      var resolvePromise, rejectPromise, promise;
      promise = new Promise(function(resolve, reject){
          resolvePromise = resolve;
          rejectPromise = reject;
      });
      
      $.get('/js/config/posts.json',function(data){
        self.posts = data.posts;
        self.blogCategories = data.categories;
        self.blogIndexer = new blogIndexer(self.posts, self.blogCategories);
        resolvePromise();
      });
      this.search = function (event) {
        oj.Router.rootInstance.go('/home/' + event.detail.value);
      };
      this.gotoCategory = function(event) {
        window.location.href = 'index.html?page=home&postid=search&q='+event.detail.value; 
      };
      this.getParameterByName = function(name, url) {
          if (!url) {
            url = window.location.href;
          }
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
      };
      this.suggestions = function (context) {
        return new Promise(function (fulfill, reject) {
          var options = [];
          var term = context.term;
          if (term) {
            options = self.blogIndexer.search(term);
            fulfill(options);
          } else {
            fulfill(options);
          }
        });
      };
      return promise;
    }
  };
  return new app();
});

