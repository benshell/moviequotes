app.controller('QuotesController', ['$scope', 'DS', function($scope, DS) {

  DS.bindAll('movie', {}, $scope, 'movies');
  DS.findAll('movie');

  DS.bindAll('quote', {}, $scope, 'quotes');
  DS.findAll('quote');

  $scope.save = function() {
    if (!$scope.quote.movie && $scope.quote.newMovie) {
      DS.create('movie', {
        name: $scope.quote.newMovie
      }).then(function(movie) {
        $scope.quote.movie = movie;
        $scope.saveQuote();
      });
    }
    else {
      $scope.saveQuote();
    }
  };

  $scope.saveQuote = function() {
    if ($scope.quote.id) {
      DS.update('quote', $scope.quote.id, {
        quote: $scope.quote.quote,
        movie_id: $scope.quote.movie.id
      }).then($scope.reset);
    }
    else {
      DS.create('quote', {
        quote: $scope.quote.quote,
        movie_id: $scope.quote.movie.id
      }).then($scope.reset);
    }
  };

  $scope.editQuote = function(quote) {
    $scope.quote = angular.copy(quote);
    $scope.action = 'Edit';
  };

  $scope.removeQuote = function(quote) {
    DS.destroy('quote', quote.id);
  };

  $scope.reset = function() {
    $scope.quote = {};
    $scope.action = 'Add';
  };
  $scope.reset();
}]);
