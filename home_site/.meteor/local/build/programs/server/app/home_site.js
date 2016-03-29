(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// home_site.js                                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isClient) {                                                 // 1
  // counter starts at 0                                               //
  Session.setDefault('page', 'property');                              // 3
                                                                       //
  Meteor.startup(function () {                                         // 5
    console.log("Load Maps");                                          // 6
    GoogleMaps.load();                                                 // 7
  });                                                                  //
                                                                       //
  UI.body.helpers({                                                    // 10
    isPage: function (page) {                                          // 11
      //sets up page function                                          //
      return Session.equals('page', page);                             // 12
    }                                                                  //
  });                                                                  //
                                                                       //
  UI.body.events({                                                     // 16
    'click .clickChangesPage': function (event, template) {            // 17
      //on event change template                                       //
      Session.set('page', event.currentTarget.getAttribute('data-page')); //to whatever is in data-page
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.contact.events({                                            // 22
    'submit form#contactForm': function (e) {                          // 23
      var contactForm = $(e.currentTarget),                            // 24
          fname = contactForm.find('#firstName').val(),                //
          lname = contactForm.find('#lastName').val(),                 //
          email = contactForm.find('#email').val(),                    //
          phone = contactForm.find('#phone').val(),                    //
          message = contactForm.find("#message").val();                //
                                                                       //
      //isFilled and isEmail are my helper methods, which checks if variable exists or is email address valid
      if (isFilled(fname) && isFilled(lname) && isFilled(email) && isFilled(phone) && isFilled(message) && isEmail(email)) {
        var dataText = "Message from: " + fname + " " + lname + "\rEmail: " + email + "\rPhone: " + phone + "\rContent:" + message;
                                                                       //
        Meteor.call('sendEmail', dataText);                            // 35
        //throwAlert is my helper method which creates popup with message
        throwAlert('Email send.', 'success');                          // 37
      } else {                                                         //
        throwAlert('An error occurred. Sorry', 'error');               // 39
        return false;                                                  // 40
      }                                                                //
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.mapLoc.helpers({                                            // 45
    mapOptions: function () {                                          // 46
      if (GoogleMaps.loaded()) {                                       // 47
        return {                                                       // 48
          /*center: new google.maps.LatLng(46.922386, -122.667181),*/  //
          center: new google.maps.LatLng(46.921250, -122.667481),      // 50
          zoom: 14                                                     // 51
        };                                                             //
      }                                                                //
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.mapLoc.onCreated(function () {                              // 57
    GoogleMaps.ready('map', function (map) {                           // 58
      marker = new google.maps.Marker({                                // 59
        /*position: new google.maps.LatLng(46.922386, -122.667181),*/  //
        position: new google.maps.LatLng(46.921250, -122.667481),      // 61
        map: map.instance                                              // 62
      });                                                              //
      console.log("Map ready");                                        // 64
    });                                                                //
  });                                                                  //
                                                                       //
  Markers = new Mongo.Collection('markers');                           // 68
}                                                                      //
                                                                       //
if (Meteor.isServer) {                                                 // 73
  Meteor.startup(function () {                                         // 74
    // code to run on server at startup                                //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=home_site.js.map
