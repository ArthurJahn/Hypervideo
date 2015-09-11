Subjects = new Mongo.Collection('subjects');
Subjects.defaultName = 'Novo Curso';

Hypervideos = new Mongo.Collection('hypervideos');
Hypervideos.defaultName = 'Novo Hypervideo';

Subvideos = new Mongo.Collection('subvideos');
Subvideos.defaultName = 'Novo subvideo';

Questions = new Mongo.Collection('questions');
Questions.defaultName = 'Nova Questão';

var videosStore = new FS.Store.GridFS("videos");
FS.config.uploadChunkSize = 100000; // 100 KB
Videos = new FS.Collection("videos", {
 stores: [videosStore],
 filter: {
   maxSize: 100000000, // 100 MB
   onInvalid: function(msg) {
     console.log(msg);
   }
 }
});
