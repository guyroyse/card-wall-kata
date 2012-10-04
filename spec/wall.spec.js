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

  when("created", function() {

    it("has no cards", function(){
      expect(wall.allCards()).toEqual([]);
    });

  });

  when("adding cards", function() {

    it("accepts cards", function() {
      wall.addCard(cardOne);
      expect(wall.allCards().length).toBe(1);
    });

    it("accepts multiple cards", function() {
      wall.addCard(cardOne);
      wall.addCard(cardTwo);
      expect(wall.allCards().length).toBe(2);
    });

    it("removes cards", function() {
      wall.addCard(cardOne);
      wall.removeCard(cardOne);
      expect(wall.allCards().length).toBe(0);
    });

  });

  when("full of cards", function() {

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
    expect(wall.statuses()[0]).toBe("TODO");
  });

    it('can move cards', function() {
	wall.addStatus("TODO");
	wall.addStatus("DOING");
	wall.addCard(cardOne);
	wall.moveCard(cardOne, wall.cards[1]);
	expect(wall.cards[1].cards).toEqual([cardOne]);
    });

    it("doesn't copy cards when moving", function() {
	wall.addStatus("TODO");
	wall.addStatus("DOING");
	wall.addCard(cardOne);
	wall.moveCard(cardOne, wall.cards[1]);
	expect(wall.cards[0].cards).toEqual([]);
    });

    it('can move cards by name', function() {
	wall.addStatus("TODO");
	wall.addStatus("DOING");
	wall.addCard(cardOne);
	wall.moveCard(cardOne, "DOING");
	expect(wall.cards[1].cards).toEqual([cardOne]);
    });

    it("doesn't copy cards when trying to same status", function() {
	wall.addStatus("TODO");
	wall.addStatus("DOING");
	wall.addCard(cardOne);
	wall.moveCard(cardOne, "TODO");
	expect(wall.cards[0].cards).toEqual([cardOne]);
    });
});
