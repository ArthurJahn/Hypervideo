if(typeof MochaWeb !== 'undefined') {

  MochaWeb.testOnly(function(){

    describe("Hypervideo", function(){
      beforeEach(function(done) {
        Hypervideo.find().fetch().forEach(function(hypervideo) {
          hypervideo.remove();
        });
        done();
      });

      it("should create a hypervideo", function() {
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });

        chai.assert.isTrue(hypervideo._isNew);
        chai.assert.isTrue(hypervideo.validate());

        hypervideo.save();

        chai.assert.isFalse(hypervideo._isNew);
      });

      it("should find no hypervideos", function() {
        var length = Hypervideo.find({owner:'1'}).fetch().length;
        chai.assert.equal(length, 0);
      });

      it("should set hypervideo name", function() {
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });
        hypervideo.setName("new name");
        chai.assert.equal(hypervideo.name, "new name");
      });

      it("should move hypervideo", function() {
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });
        hypervideo.move(2,3);

        chai.assert.equal(hypervideo.col, 2);
        chai.assert.equal(hypervideo.row, 3);
      });

      it("should add a connection to hypervideo", function() {
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });
        var conn = {first:'1', second: '2'};

        chai.assert.isTrue(hypervideo.addConnection(conn));
      });

      it("should fail to add a connection to hypervideo", function() {
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });
        var conn = {first:'1', second: '2'};
        hypervideo.addConnection(conn);
        chai.assert.isFalse(hypervideo.addConnection(conn));
      });

      it("should remove a connection from hypervideo", function() {
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });
        var conn = {first:'1', second: '2'};
        hypervideo.addConnection(conn);
        chai.assert.isTrue(hypervideo.removeConnection(conn));
      });

      it("should fail to remove a connection from hypervideo", function() {
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });
        var conn = {first:'1', second: '2'};
        chai.assert.isFalse(hypervideo.removeConnection(conn));
      });

      it("should remove all connections with specified subvideo id", function() {
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });

        var conn = {first:'1', second: '2'};
        var conn2 = {first:'1', second: '4'};
        var conn3 = {first:'2', second: '4'};

        hypervideo.addConnection(conn);
        hypervideo.addConnection(conn2);
        hypervideo.addConnection(conn3);

        hypervideo.removeConnections('1');

        chai.assert.deepEqual(hypervideo.connections[0], conn3);
      });

      it("should return subvideos list", function(){
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });
        hypervideo.save();
        var subvideo = new Subvideo({
          owner: '1',
          hypervideoId: hypervideo._id,
          mediaId: '1',
          x: 1,
          y: 1
        });
        subvideo.save();
        chai.assert.deepEqual(hypervideo.subvideos()[0], subvideo);
      });

      it("should return questions list", function(){
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: '1',
          col: 1,
          row: 1
        });
        hypervideo.save();
        var question = new Question({
          owner: '1',
          hypervideoId: hypervideo._id,
          x: 1,
          y: 1
        });
        question.save();
        chai.assert.deepEqual(hypervideo.questions()[0], question);
      });
    });
  });
}
