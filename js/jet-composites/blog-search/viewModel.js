define(['knockout'],
        function (ko) {
          function model(context) {
            this.selection = function (event, ui) {
              if (ui.option !== "value") {
                return;
              }
              context.element.dispatchEvent(new CustomEvent('blogSelection', {detail:{value:ui.value}, bubbles:true} ));
            };
          }
          return model;
        });
