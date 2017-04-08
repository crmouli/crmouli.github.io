define(['knockout'],
  function (ko) {
    function model (context) {
      var self = this;
      this.readMoreTitle = oj.Translations.getTranslatedString("readMoreTitle");
      this.goToPost = function(postid){
//        window.location.href = '/index.html?postid='+postid;
        oj.Router.rootInstance.go('/home/'+postid);
      };
      this.context = context;
       // The props field on context is a Promise. Once that resolves,
      // we can access the properties that were defined in the composite metadata
      // and were initially set on the composite DOM element.
      context.props.then(function(properties) {
        self.props = properties;
      });
      
      this.getModuleSettings = function(postid){
        return {
                viewName: 'posts/'+postid+'/index',
                viewModelFactory:{
                  createViewModel: function(params, valueAccessor)
                  {
                    return Promise.resolve({});
                  }
                }
              };
      }
    }

    return model;
  }
)
