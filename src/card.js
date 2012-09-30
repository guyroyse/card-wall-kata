var createCard = function(name, description, priority) {

    var addPerson = function(person) {
      if(assigneeNotFound(person))
        addPersonToAssignees(person);
    };

    var assigneeNotFound = function(person) {
      return card.assignees.indexOf(person) === -1;
    };

    var addPersonToAssignees = function(person) {
      card.assignees.push(person);      
    };

    var card = {
      name: name,
      description: description,
      priority: priority,
      done: false,
      blocked: false,
      assignees: [],
      addPerson: addPerson,
      complexity: 2,
      startDate: null,
      endDate: null,
      block: function() { this.blocked = true; },
      unblock: function() { this.blocked = false; },
      complete: function() { this.done = true; this.endDate = new Date(); },
      start: function() { card.startDate = new Date(); }
    };

    return card;

};
