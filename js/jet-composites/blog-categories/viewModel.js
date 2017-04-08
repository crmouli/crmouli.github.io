define(['knockout'],
  function (ko) {
    function model (context) {
      this.gotoCategory = function(categoryid){
        context.element.dispatchEvent(new CustomEvent('categorySelection', {detail:{value:categoryid}, bubbles:true} ));
      };
    }

    return model;
  }
)
