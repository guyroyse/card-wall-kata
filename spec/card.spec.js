describe("Card", function() {
  var card;
  
  beforeEach(function() {
    card = createCard("name", "desc", 1);
  });

  it("has a name", function(){
    expect(card.name).toBe("name");
  });

  it("has a description", function(){
    expect(card.description).toBe("desc");
  });

  it("has a priority", function(){
    expect(card.priority).toBe(1);
  });

  it("has a done default of false", function(){
    expect(card.done).toBe(false)
  });

  it("has no assignee", function(){
    expect(card.assignees).toEqual([])
  });

  it("has a blocked property starts as false",function(){
    expect(card).not.toBeBlocked();
  });

  it("can be blocked",function(){
    card.block();
    expect(card).toBeBlocked();
  });

  it("can be unblocked",function(){
    card.unblock();
    expect(card).not.toBeBlocked();
  });

  it("has a start date that is null",function(){
    expect(card.startDate).toBe(null);
  });
  
  it("has an end date that is null",function(){
    expect(card.endDate).toBe(null);
  });

  it("has one assignee", function() {
    card.addPerson("name");
    expect(card.assignees.length).toBe(1);
  });

  it("has two assignees", function(){
      card.addPerson("name");
      card.addPerson("name2");
      expect(card.assignees.length).toBe(2);
  });

  it("has unique assignees", function(){
      card.addPerson("name");
      card.addPerson("name2");
      card.addPerson("name2");
      expect(card.assignees.length).toBe(2);
  });

  it("has complexity property", function(){
    var card = createCard("name","desc",4)
    expect(card.complexity).toBeDefined();
  });

});