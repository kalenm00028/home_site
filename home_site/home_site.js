if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('page', 'property');

  Meteor.startup(function() {
    console.log("Load Maps");
    GoogleMaps.load();
  });

  UI.body.helpers({
      isPage: function(page){//sets up page function
          return Session.equals('page', page)
      }
  });

  UI.body.events({
      'click .clickChangesPage': function(event, template){//on event change template
          Session.set('page', event.currentTarget.getAttribute('data-page'))//to whatever is in data-page
      }
  });

  Template.contact.events({
    'submit form#contactForm':function(e){
      var contactForm = $(e.currentTarget),
        fname = contactForm.find('#firstName').val(),
        lname = contactForm.find('#lastName').val(),
        email = contactForm.find('#email').val(),
        phone = contactForm.find('#phone').val(),
        message = contactForm.find("#message").val();

      //isFilled and isEmail are my helper methods, which checks if variable exists or is email address valid
      if(isFilled(fname) && isFilled(lname) && isFilled(email) && isFilled(phone) && isFilled(message) && isEmail(email)){
        var dataText = "Message from: " + fname + " " + lname + "\rEmail: " + email + "\rPhone: " + phone + "\rContent:" + message;

        Meteor.call('sendEmail', dataText);
        //throwAlert is my helper method which creates popup with message
        throwAlert('Email send.', 'success');
      }else{
        throwAlert('An error occurred. Sorry', 'error');
        return false;
      }
    }
  });

  Template.mapLoc.helpers ({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          /*center: new google.maps.LatLng(46.922386, -122.667181),*/
          center: new google.maps.LatLng(46.921250, -122.667481),
          zoom: 14
        };
      }
    }
  });

  Template.mapLoc.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      marker = new google.maps.Marker({
        /*position: new google.maps.LatLng(46.922386, -122.667181),*/
        position: new google.maps.LatLng(46.921250, -122.667481),
        map: map.instance
      });
      console.log("Map ready");
    });
  });

  Markers=new Mongo.Collection('markers');


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
