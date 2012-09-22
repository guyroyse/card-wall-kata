var createCard = function(name, description, priority) {
  var card = {
    name: name,
    description: description,
    priority: priority,
    done: false,
    blocked: false,
    assignees: [],
    addPerson: function(person) {
      if(this.assignees.indexOf(person) === -1){
        this.assignees.push(person);
      };
    },
    complexity: 2,
    startDate: null,
    endDate: null

  };

  return card;

};

var createWall = function() {

  var wall = {
    cards: [],
    addCard: function(card, statusIndex) {
      statusIndex = statusIndex || 0;
      var status = this.cards[statusIndex];
      if (!status) {
        status = this.cards[statusIndex] = {cards: []};
      }
      var cardsForStatus = status.cards;
      cardsForStatus.push(card);
      cardsForStatus.sort(function(a,b) {
        return b.priority - a.priority;
       });
    },

    completeCard: function(card){
      card.done = true;  
    },

    blockCard: function(card){
      card.blocked = true;
    },

    completedCards: function() {
      return _(this.allCards()).filter(function(card) {
        return card.done;
      });
    },

    blockedCards: function() {
      return _(this.allCards()).filter(function(card) {
        return card.blocked;
    });
   },

   startWork: function(card){
      card.startDate = new Date();
   },

   allCards: function(){
    var cards = [];
    _(this.cards).each(function(status) {
      cards = cards.concat(status.cards);
    });
    return cards;
   }
};
  return wall;

};

var createPerson = function(name) {
  var person = {
    name: name
  }
  return person;
}

