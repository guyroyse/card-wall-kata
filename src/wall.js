var createWall = function() {

  var cards = [];
  if (localStorage.cards) {
    cards = JSON.parse(localStorage.cards);
  }

  var wall = {
      cards: cards,
    addCard: function(card, statusIndex) {
      statusIndex = statusIndex || 0;
      var status = cards[statusIndex];
      if (!status) {
        status = cards[statusIndex] = {cards: []};
      }
      var cardsForStatus = status.cards;
      cardsForStatus.push(card);
      cardsForStatus.sort(function(a,b) {
        return b.priority - a.priority;
      });
      localStorage.cards = JSON.stringify(cards);
    },

    removeCard: function(card) {
      _(cards).each(function(status) {
        status.cards = _(status.cards).without(card);
      });
      localStorage.cards = JSON.stringify(cards);
    },

    completedCards: function() {
      return _(this.allCards()).filter(function(card) {
        return card.done();
      });
    },

    blockedCards: function() {
      return _(this.allCards()).filter(function(card) {
        return card.blocked;
      });
    },

    allCards: function(){
      var theseCards = [];
      _(cards).each(function(status) {
        theseCards = theseCards.concat(status.cards);
      });
      return theseCards;
    },

    addStatus: function(name) {
      cards.push({
        name: name,
        cards: []
      });
      localStorage.cards = JSON.stringify(cards);
    },

    statuses: function() {
      return cards.map(function(card) {
        return card.name
      });
    },

      moveCard: function(card, dest) {
	  if (_.isString(dest)) {
	      var name = dest;
	      dest = _(cards).find(function(status) {
		  return status.name == name;
	      });
	  }
	  _(cards).each(function(origStatus) {
	      origStatus.cards = _(origStatus.cards).without(card);
	  });
	  // remove from old ones
	  dest.cards.push(card);
	  localStorage.cards = JSON.stringify(cards);
      }

  };

  return wall;

};
