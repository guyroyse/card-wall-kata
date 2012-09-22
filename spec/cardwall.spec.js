var inbetween = function(a, b, c) {
  return a >= b && a <= c;
};

describe("Cardwall", function() {
  describe ("person", function(){
    var person;
    it("has a name", function(){
      person = createPerson("name");
      expect(person.name).toBe("name");
    });

  });
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
      expect(card.blocked).toBe(false);
    });

    it("has a start date that is null",function(){
      expect(card.startDate).toBe(null);
    });
    
    it("has an end date that is null",function(){
      expect(card.endDate).toBe(null);
    });






    it("has one assignee", function() {
      var person = createPerson("name");
      card.addPerson(person);
      expect(card.assignees.length).toBe(1);
    });

    it("has two assignees", function(){
        var person = createPerson("name");
        var person2 = createPerson("name2");
        card.addPerson(person);
        card.addPerson(person2);
        expect(card.assignees.length).toBe(2);
    });

    it("has unique assignees", function(){
        var person = createPerson("name");
        var person2 = createPerson("name2");
        card.addPerson(person);
        card.addPerson(person2);
        card.addPerson(person2);
        expect(card.assignees.length).toBe(2);
    });

    it("has complexity property", function(){
      var card = createCard("name","desc",4)
      expect(card.complexity).toBeDefined();
    });

  });

  describe("Wall", function() {
    var wall;

    beforeEach(function() {
      wall = createWall(); 
    });

    it("has no cards when created", function(){
      expect(wall.allCards()).toEqual([]);
    });

    it("can block a card", function(){
      var cardOne = createCard("MavisCard", "Desc", 7);
      wall.addCard(cardOne);
      wall.blockCard(cardOne);
      expect(cardOne.blocked).toBe(true);
    });

    it("has one card", function() {
      var card = createCard("name", "desc");
      wall.addCard(card);
      expect(wall.allCards().length).toBe(1);      
    });

    it("create 2 cards", function(){
      var cardOne = createCard("w00t", "desc1", 1);
      var cardTwo = createCard("Dos", "desc2", 4);
      wall.addCard(cardOne);
      wall.addCard(cardTwo);
      expect(wall.allCards().length).toBe(2); 
    });
  
    it("orders 2 cards based on priority", function(){

      var cardOne = createCard("w00t", "desc1", 1);
      var cardTwo = createCard("Dos", "desc2", 4);
      wall.addCard(cardOne);
      wall.addCard(cardTwo);
      expect(wall.allCards()).toEqual([cardTwo, cardOne]);
    });

    it("orders 3 cards based on priority", function(){

      var cardOne = createCard("w00t", "desc1", 1);
      var cardTwo = createCard("Dos", "desc2", 4);
      var cardThree = createCard("Sherief", "desc3", 6);
      wall.addCard(cardOne);
      wall.addCard(cardThree);
      wall.addCard(cardTwo);
      expect(wall.allCards()).toEqual([cardThree, cardTwo, cardOne]);
    });

    it("sets a card to done", function() {
      var cardOne = createCard("w00t", "desc1", 1)
      wall.addCard(cardOne);
      wall.completeCard(cardOne);
      expect(cardOne.done).toBe(true);
    });


    it("can filter on completeness", function() {
      var cardOne = createCard("w00t", "desc1", 1);
      var cardTwo = createCard("Dos", "desc2", 4);
      var cardThree = createCard("Sherief", "desc3", 6);
      wall.addCard(cardOne);
      wall.addCard(cardThree);
      wall.addCard(cardTwo);

      wall.completeCard(cardTwo);

      expect(wall.completedCards()).toEqual([cardTwo]);
    });

    it("can filter on completeness part 2", function() {
      var cardOne = createCard("w00t", "desc1", 1);
      var cardTwo = createCard("Dos", "desc2", 4);
      var cardThree = createCard("Sherief", "desc3", 6);
      wall.addCard(cardOne);
      wall.addCard(cardThree);
      wall.addCard(cardTwo);

      wall.completeCard(cardTwo);
      wall.completeCard(cardThree);

      expect(wall.completedCards()).toEqual([cardThree, cardTwo]);
    });

    it("can filter on blockedness", function() {
      var cardOne = createCard("w00t", "desc1", 1);
      var cardTwo = createCard("Dos", "desc2", 4);
      var cardThree = createCard("Sherief", "desc3", 6);
      wall.addCard(cardOne);
      wall.addCard(cardThree);
      wall.addCard(cardTwo);

      wall.blockCard(cardTwo);
      wall.blockCard(cardThree);

      expect(wall.blockedCards()).toEqual([cardThree, cardTwo]);
    });

    it("has a 'start work' function", function(){
      var before = Date.now();
      var cardOne = createCard("w00t", "desc1", 1);
      wall.addCard(cardOne);
      wall.startWork(cardOne);
      var after = Date.now();
      expect(inbetween(cardOne.startDate.getTime(), before, after)).toBe(true);
    });

  });

});
