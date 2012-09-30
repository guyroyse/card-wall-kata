describe("Card", function() {
  var card;
  
  beforeEach(function() {
    card = createCard("name", "desc", 1);
  });

  when("created", function() {

    it("has a name", function(){
      expect(card.name).toBe("name");
    });

    it("has a description", function(){
      expect(card.description).toBe("desc");
    });

    it("has a priority", function(){
      expect(card.priority).toBe(1);
    });

    it("has a complexity", function() {
      expect(card.complexity).toBeDefined();
    });

    it("is not done", function(){
      expect(card.done()).toBeFalsy();
    });

    it("is not blocked",function(){
      expect(card).not.toBeBlocked();
    });

    it("has no start date",function(){
      expect(card.startDate).toBe(null);
    });
  
    it("has no end date",function(){
      expect(card.endDate).toBe(null);
    });

    it("has no assignees", function() {
      expect(card.assignees).toEqual([])
    });

  });

  when("started", function() {

    it("has a start date when started", function() {
      var before = Date.now();
      card.start();
      var after = Date.now();

      expect(card.startDate.getTime()).toBeBetween(before, after);
    });

  });

  when("completed", function() {

    it("is marked as done", function() {
      card.complete();
      expect(card.done()).toBeTruthy();
    });

    it("has an end date when completed", function() {
      var before = Date.now();
      card.complete();
      var after = Date.now();

      expect(card.endDate.getTime()).toBeBetween(before, after);
    });

  });

  when("adding assignees", function() {

    it("accepts assignees", function() {
      card.addPerson("name");
      expect(card.assignees.length).toBe(1);
    });

    it("accepts multiple assignees", function(){
      card.addPerson("name");
      card.addPerson("name2");
      expect(card.assignees.length).toBe(2);
    });

    it("accepts only unique assignees", function(){
      card.addPerson("name");
      card.addPerson("name2");
      card.addPerson("name2");
      expect(card.assignees.length).toBe(2);
    });

  });

  when("blocked", function() {

    beforeEach(function() {
      card.block();
    });

    it("is blocked",function(){
      expect(card).toBeBlocked();
    });

    it("can be unblocked",function(){
      card.unblock();
      expect(card).not.toBeBlocked();
    });

  });

});
