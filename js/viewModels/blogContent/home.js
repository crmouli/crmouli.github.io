define(['ojs/ojcore', 'knockout', 'jquery', 'app'], // add additional JET component modules as needed
  function(oj, ko, $, app) // this callback gets executed when all required modules are loaded
  {
   return {
     app: app,
     postRouter: oj.Router.rootInstance.getChildRouter('postid'),
     
   };  
  }
);

