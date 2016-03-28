if (Meteor.isClient) {
  var url = document.URL;
  url = url.replace("www.", "");
  window.location.href = url;
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
