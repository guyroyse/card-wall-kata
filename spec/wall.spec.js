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

  it("has one card", function() {
    wall.addCard(cardOne);

    expect(wall.allCards().length).toBe(1);      
  });

  it("create 2 cards", function(){
    wall.addCard(cardOne);
    wall.addCard(cardTwo);

    expect(wall.allCards().length).toBe(2); 
  });

  it("orders 2 cards based on priority", function(){
    wall.addCard(cardOne);
    wall.addCard(cardTwo);

    expect(wall.allCards()).toEqual([cardTwo, cardOne]);
  });

  it("orders 3 cards based on priority", function(){
    wall.addCard(cardOne);
    wall.addCard(cardThree);
    wall.addCard(cardTwo);

    expect(wall.allCards()).toEqual([cardThree, cardTwo, cardOne]);
  });

  it("can filter on completeness", function() {
    wall.addCard(cardOne);
    wall.addCard(cardThree);
    wall.addCard(cardTwo);

    cardTwo.complete();

    expect(wall.completedCards()).toEqual([cardTwo]);
  });

  it("can filter on completeness part 2", function() {
    wall.addCard(cardOne);
    wall.addCard(cardThree);
    wall.addCard(cardTwo);

    cardTwo.complete();
    cardThree.complete();

    expect(wall.completedCards()).toEqual([cardThree, cardTwo]);
  });

  it("can filter on blockedness", function() {
    wall.addCard(cardOne);
    wall.addCard(cardThree);
    wall.addCard(cardTwo);

    cardTwo.block();
    cardThree.block();

    expect(wall.blockedCards()).toEqual([cardThree, cardTwo]);
  });

  it("has a 'start work' function", function(){
    var before = Date.now();
    wall.addCard(cardOne);
    wall.startWork(cardOne);
    var after = Date.now();

    expect(cardOne.startDate.getTime()).toBeBetween(before, after);
  });

  it("can remove cards", function() {
    wall.addCard(cardOne);
    wall.removeCard(cardOne);

    expect(wall.allCards()).toEqual([]);
  });

  it("can add statuses", function() {
    wall.addStatus("TODO");

    expect(wall.cards[0].name).toBe("TODO");
  });

});
