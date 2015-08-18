Template.newSubjectPanel.helpers({
  show: function () {
    return Session.get('activePanel') === "3";
  }
});

Template.newSubjectPanel.events({
  'hypervideo-created hypervideo-node': function(e, template) {
    var hypervideo = new Hypervideo();
    hypervideo.name = Hypervideos.defaultName;
    hypervideo.x = e.target._x;
    hypervideo.y = e.target._y;
    hypervideo.subjectId = e.target._subjectId;
    hypervideo.save();
    e.target._hypervideo = hypervideo;
  },
  'hypervideo-changed hypervideo-node': function(e, template) {
    var hypervideo = e.target._hypervideo;
    hypervideo.save();
  },
  'hypervideo-deleted hypervideo-node': function(e, template) {
    var hypervideo = e.target._hypervideo;
    var subject = Subjects.findOne({_id: hypervideo.subjectId});
    subject.removeHypervideo(hypervideo._id);
    hypervideo.remove();
  },

  'subject-created subject-composer-area': function(e, template) {
    var subject = new Subject();
    subject.name = Subjects.defaultName;
    subject.hypervideos = [];
    subject.connections = [];
    subject.setEditing();
    subject.save();
    e.target.subject = subject;
  },
  'subject-changed subject-composer-area': function(e, template) {
    var subject = e.target.subject;
    subject.save();
  }
});
