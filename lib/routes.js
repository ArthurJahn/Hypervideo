Router.configure({
  layoutTemplate: 'mainMenu',
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'loadingPanel',
});

if (Meteor.isClient) {
  Router.onBeforeAction('loading');
}

Router.map(function() {

  //subject composer route
  this.route('subjectPanel', {
    path:"/subjectPanel/:_id",
    template: "newSubjectPanel",
    waitOn: function() {
      if (Meteor.user()) {
        if(this.params._id === 'new') {
          this.params._id = Random.id();
        }
        return this.subscribe("fullSubject", this.params._id);
      }
    },
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        this.next();
      } else {
        this.render('login');
      }
    },
    action: function () {
      this.render();
    }
  });

  //subjects list route
  this.route('subjects', {
    template: "subjectsPanel",
    waitOn: function() {
      if (Meteor.user()) {
        if(this.params._id === 'new') {
          this.params._id = Random.id();
        }
        return this.subscribe("userSubjects",Meteor.userId());
      }
    },
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        this.next();
      } else {
        this.render('login');
      }
    },
    action: function () {
      this.render();
    }
  });

  //user profile route
  this.route('profile', {
    template: "profilePanel",
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        this.next();
      } else {
        this.render('login');
      }
    },
    action: function () {
      this.render();
    }
  });

  //explore route
  this.route('home', {
    path: "/",
    template: "explorePanel",
    action: function() {
      this.render();
    }
  });

  // watch a subject route
  this.route('watchSubject', {
    path: '/subject/:_id',
    waitOn: function() {
      //change to single hypervideo subscribe
      return this.subscribe("fullSubject", this.params._id);
    },
    action: function() {
      this.render();
    }
  });
});
