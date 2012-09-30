describe("Wall", function() {

  var wall, cardOne, cardTwo, cardThree;

  beforeEach(function() {
    wall = createWall(); 
    cardOne = createCard("w00t", "desc1", 1);
    cardTwo = createCard("Dos", "desc2", 4);
    cardThree = createCard("Sherief", "desc3", 6);
  });

  afterEach(function() {
    delete localStorage.cards;
  });

  it("has no cards when created", function(){
    expect(wall.allCards()).toEqual([]);
  });

  it("accepts cards", function() {
    wall.addCard(cardOne);
    expect(wall.allCards()[0]).toBe(cardOne);
  });

  it("removes cards", function() {
    wall.addCard(cardOne);
    wall.removeCard(cardOne);
    expect(wall.allCards()).toEqual([]);
  });

  describe("when wall is full of cards", function() {

    beforeEach(function() {
      wall.addCard(cardOne);
      wall.addCard(cardTwo);
      wall.addCard(cardThree);
    });

    it("is full of cards", function(){
      expect(wall.allCards().length).toBe(3); 
    });

    it("orders cards based on priority", function(){
      expect(wall.allCards()).toEqual([cardThree, cardTwo, cardOne]);
    });

    it("filters cards on completeness", function() {
      cardTwo.complete();
      cardThree.complete();
      expect(wall.completedCards()).toEqual([cardThree, cardTwo]);
    });

    it("filters cards on blockedness", function() {
      cardTwo.block();
      cardThree.block();
      expect(wall.blockedCards()).toEqual([cardThree, cardTwo]);
    });

  });

  it("can add statuses", function() {
    wall.addStatus("TODO");
    expect(wall.cards[0].name).toBe("TODO");
  });

});
