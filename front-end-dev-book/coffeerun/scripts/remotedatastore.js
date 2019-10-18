(function (window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = function (key, val) {
    // Code will go here
    $.post(this.serverUrl, val, function (serverResponse) {
      //console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverUrl, function (serverResponse) {
      //console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + "/" + key, function (serverResponse) {
      //console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    var url = this.serverUrl;
    $.ajax(this.serverUrl,
      {
        contentType: "application/javascript",
        //type: 'DELETE'
        type: "GET",
        success: function(serverResponse)
        {
          serverResponse.forEach(function(info)
          {
            //console.log(info.id);
            if(info.emailAddress === key)
            {
              $.ajax(url + "/" + info.id,
                {
                  type: "DELETE"
                });
            }
          });
        }
      });
  };


  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
