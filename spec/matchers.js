beforeEach(function() {
  this.addMatchers({
    toBeBetween: function(start, end) {
      return this.actual >= start && this.actual <= end;
    },
    toBeBlocked: function() {
      return this.actual.blocked;
    }
  });
});