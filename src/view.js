jQuery(function($) {

    var wall = createWall();
    /*
      wall.addCard(createCard("our first card", "our first card", 1));
      wall.addCard(createCard("our second card", "our second card", 2));
    */

    var sumCardsByStatus = function(status) {
	return _(status.cards).reduce(function(memo, card) {
	    return memo + b.complexity;
	}, 0);
    };

    var refresh = function() {
      var outer = $('.outer');
      outer.empty();
      _(wall.cards).each(function(status) {
        var between = $('<div class="bordered"/>').appendTo(outer);
          between.text("status: " + (status.name || "I HAVE NO NAME") + " sum " + sumCardsByStatus(status));
        _(status.cards).each(function(card) {
          var template = _.template($('#cardTemplate').html());
          var statuses = _(_(wall.cards).without(status)).pluck('name');
          var html = template({card: card, statuses:statuses});
          var inner = $(html);
	    inner.data('card', card);
          $(inner).find('button.remove').click(function() {
            wall.removeCard(card);
            refresh();
          });
          $(inner).find('button.move').click(function(ev) {
              var selected = $(ev.target).closest('div').find('option:selected');
              wall.moveCard(card, selected.text());
              refresh();
          });
          between.append(inner);
        });
	  outer.find('.draggable').draggable();
	  between.droppable({
	      drop: function(ev, ui) {
		  // ps, here be dragons
		  var card = ui.draggable.data('card')
		  wall.moveCard(card, status);
		  refresh();
	      }
	  });
      });
    };

    refresh();

    $('.add').click(function(ev) {
      var input = $(ev.target).closest('div').find('input');
      var name = input.val();
      var card = createCard(name, name, 100);
      wall.addCard(card);
      refresh();
    });

    $('.addStatus').click(function(ev) {
      var input = $(ev.target).closest('div').find('input');
      var name = input.val();
      wall.addStatus(name);
      refresh();
    });
});
