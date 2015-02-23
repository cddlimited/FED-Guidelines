// Script loader

(function($, window, document, undefined) {
  
    // Initialise app 
    var myApp = new namespace.MyApp({ 'something' : 'here' });

    // Use functionality from module b
    myApp.moduleB.talk('Looking for a city');
  
})(jQuery, window, document);