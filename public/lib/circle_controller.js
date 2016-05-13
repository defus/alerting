var _ = require('lodash');

var module = require('ui/modules').get('alerting');

module.controller('CircleController', function ($scope) {
  // $watch permet d'écouter la réponse à la requete ES faite par Kibana
  $scope.$watch('esResponse', function (resp) {
    if (!resp) {
      $scope.data = null;
      return;
    }

    var tagsAggId = _.first(_.pluck($scope.vis.aggs.bySchemaName['segment'], 'id'));
    var metricsAgg = _.first($scope.vis.aggs.bySchemaName['metric']);

    var buckets = resp.aggregations[tagsAggId].buckets;

    var tags = buckets.map(function (bucket) {
      return {
        text: bucket.key,
        size: metricsAgg.getValue(bucket)
      };
    });

    $scope.data = [{ tags: tags}];
  });
});
