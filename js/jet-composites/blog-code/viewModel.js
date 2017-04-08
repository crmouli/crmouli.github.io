/* global Prism */

define(['knockout','jquery'],
  function (ko, $) {
    function model (context) {
      var self = this;
      this.context = context;
       context.props.then(function(properties) {
         self.properties = properties;
         self.start = -1;
         self.end = -1;
         if(properties.startLine > 0) {
            self.start = properties.startLine - 1;
           if(properties.count > 0)
            self.end = self.start + properties.count;
         }
       });
      this.getPosition = function(string, subString, index) {
        return string.split(subString, index).join(subString).length;
      } 
      this.attached = function(){
        $.get(self.properties.url, function(data){
          var snippet = context.element.querySelector('code');
          var startingPos, endPos;
          if(self.start > -1) {
             startingPos = self.getPosition(data, '\n', self.start)+1;
             if(self.end > 0) {
               endPos = self.getPosition(data, '\n', self.end)+1;
             }
          }
          var ndata = data.substring(startingPos, endPos);
          $(snippet).text(ndata);
          Prism.highlightElement(snippet);
        });
      };
      
    }

    return model;
  }
)
