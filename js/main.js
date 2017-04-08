/**
 * Example of Require.js boostrap javascript
 */

requirejs.config({
  // Path mappings for the logical module names
  paths: {
    'knockout': 'libs/knockout/knockout-3.4.0',
    'jquery': 'libs/jquery/jquery-3.1.1.min',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0.min',
    'ojs': 'libs/oj/v3.0.0/min',
    'ojL10n': 'libs/oj/v3.0.0/ojL10n',
    'ojtranslations': 'libs/oj/v3.0.0/resources',
    'text': 'libs/require/text',
    'promise': 'libs/es6-promise/es6-promise.min',
    'hammerjs': 'libs/hammer/hammer-2.0.8.min',
    'signals': 'libs/js-signals/signals.min',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
    'css': 'libs/require-css/css.min',
    'customElements': 'libs/webcomponents/CustomElements.min',
    'proj4': 'libs/proj4js/dist/proj4',
    'app': 'app',
    'elunr':'libs/elasticlunr/elasticlunr.min'
  },
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jquery': {
      exports: ['jQuery', '$']
    }
  },

  // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
  // resources with a custom translation file.
  // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
  // a path that is relative to the location of this main.js file.
  config: {
    ojL10n: {
      merge: {
        'ojtranslations/nls/ojtranslations': 'resources/nls/blog'
      }
    },
    text: {
      // Override for the requirejs text plugin XHR call for loading text resources on CORS configured servers
      useXhr: function (url, protocol, hostname, port) {
        // Override function for determining if XHR should be used.
        // url: the URL being requested
        // protocol: protocol of page text.js is running on
        // hostname: hostname of page text.js is running on
        // port: port of page text.js is running on
        // Use protocol, hostname, and port to compare against the url being requested.
        // Return true or false. true means "use xhr", false means "fetch the .js version of this resource".
        return true;
      }
    }
  }
});


/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback.
 *
 * For a listing of which JET component modules are required for each component, see the specific component
 * demo pages in the JET cookbook.
 */
require(['ojs/ojcore', 'knockout', 'jquery', 'app','ojs/ojrouter','ojs/ojcomposite','ojs/ojnavigationlist',
  'jet-composites/blog-post/loader',
  'jet-composites/blog-search/loader',
  'jet-composites/blog-categories/loader',
  'jet-composites/blog-widget/loader',
  'jet-composites/blog-code/loader',
  'jet-composites/blog-posts/loader'], // add additional JET component modules as needed
  function(oj, ko, $, app) // this callback gets executed when all required modules are loaded
  {
      function viewModel() {
        var self = this;
        
        // Media Queries for repsonsive header and navigation
        // Create small screen media query to update button menu display
        var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        
        // Fix header on phone sizes and adjust content top margin when screen size changes.
        self.smScreen.subscribe(function() {
          adjustContentPadding();
        });
        self.app = app;
        // Retrieve the router static instance and configure the states
          self.router = oj.Router.rootInstance;
          oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
          oj.Router.defaults['rootInstanceName'] = 'page';
          self.router.configure({
            'home': { label: 'Home', value:'home',isDefault: true },
            'about': { label: 'About',value:'about' },
            'contact':   { label: 'Contact',value:'contact'}
          });
          self.gotoPage = function(page){
            oj.Router.rootInstance.go(page);
          };
          self.postRouter = self.router.createChildRouter('postid')
                  .configure(function(stateid){
            if (stateid === "all" || !stateid) {
              return new oj.RouterState('all',{
                isDefault: true,
                value: {posts: app.posts}
              }, self.router);
            } else if(stateid === 'search') {
              var queryStr = app.getParameterByName('q');
              var currentPost = app.posts.filter(function(item){
                if(item.category.indexOf(queryStr) > -1){
                  return true;
                }
                return false;
              });
              
              return new oj.RouterState(stateid, { value:{posts:currentPost,category:{title:queryStr}}},self.router);
            } else {
              var currentPost = app.posts.filter(function(item){
                if(item.id === stateid){
                  return true;
                }
                return false;
              });
              
              return new oj.RouterState(stateid, { value:{posts:currentPost}},self.router);
            }
          });

      }
      
        
      // Method for adjusting the content area top/bottom paddings to avoid overlap with any fixed regions. 
      // This method should be called whenever your fixed region height may change.  The application
      // can also adjust content paddings with css classes if the fixed region height is not changing between 
      // views.
      function adjustContentPadding() {
        var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
        var contentElem = document.getElementsByClassName('oj-web-applayout-content')[0];
        var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

        if (topElem) {
          contentElem.style.paddingTop = topElem.offsetHeight+'px';
        }
        if (bottomElem) {
          contentElem.style.paddingBottom = bottomElem.offsetHeight+'px';
        }
      }

      $(function() {
        oj.ModuleBinding.defaults.modelPath = 'viewModels/';
        oj.ModuleBinding.defaults.viewPath = 'text!views/';
        var vm = new viewModel();
        var promise = vm.app.initialize();
        promise.then(function(){
          document.getElementsByTagName('title')[0].innerHTML = app.blogHeaderText;
          document.querySelector("meta[name=apple-mobile-web-app-title]").setAttribute('content',app.blogHeaderText);
          oj.Router.sync();
          ko.applyBindings(vm, document.getElementById('page'));
          adjustContentPadding();
        });
      });
    }
);

