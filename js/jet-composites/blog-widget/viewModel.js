define(['knockout'],
  function (ko) {
    function model (context) {
      this.getModulePath = function(path){
        return 'customWidgets/'+path;
      };
    }

    return model;
  }
)
