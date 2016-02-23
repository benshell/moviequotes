'use strict';

var app = angular.module('quotes', [
  'templates',
  'js-data'
]);

app.config(['DSProvider', 'DSHttpAdapterProvider', function(DSProvider, DSHttpAdapterProvider) {
  angular.extend(DSProvider.defaults, {
    basePath: '/',
      suffix: '.json'
  });
}]);

app.run(['DS', function(DS) {
  DS.defineResource({
    name: 'movie',
    endpoint: 'movies',
    relations: {
      hasMany: {
        quote: {
          localField: 'quotes',
          foreignKey: 'movie_id'
        }
      }
    }
  });
  DS.defineResource({
    name: 'quote',
    endpoint: 'quotes',
    relations: {
      belongsTo: {
        movie: {
          localField: 'movie',
          localKey: 'movie_id'
        }
      }
    }
  });
}]);
