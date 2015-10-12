Router.configure({
  layoutTemplate: 'mainMenu',
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'loadingPanel',
});

if (Meteor.isClient) {
  Router.onBeforeAction('loading');
}

Router.map(function() {

  this.route('subjectPanel', {
    path:"/subjectPanel/:_id",
    template: "newSubjectPanel",
    onBeforeAction: function (pause) {
      if (!Meteor.user()) {
        this.render('login');
      } else {
        if(this.params._id === 'new') {
          this.params._id = Random.id();
        }
        this.subscribe("fullSubject", this.params._id);
        this.next();
      }
    },
    action: function () {
      this.render();
    }
  });
  this.route('subjects', {
    template: "subjectsPanel",
    onBeforeAction: function (pause) {
      if (!Meteor.user()) {
        this.render('login');
      } else {
        this.subscribe("userSubjects",Meteor.userId());
        this.next();
      }
    },
    action: function () {
      this.render();
    }
  });
  this.route('profile', {
    template: "profilePanel",
    onBeforeAction: function (pause) {
      if (!Meteor.user()) {
        this.render('login');
      } else {
        this.next();
      }
    },
    action: function () {
      this.render();
    }
  });
  this.route('home', {
    path: "/",
    template: "explorePanel",
    action: function() {
      this.render();
    }
  });
  this.route('watchSubject', {
    path: '/subject/:_id',
    data: function() {
      Subjects.findOne(this.params._id);
    },
    onBeforeAction: function (pause) {
      if (!Meteor.user()) {
        this.render('login');
      } else {
        this.next();
      }
    },
    action: function() {
      this.render();
    }
  });
});
