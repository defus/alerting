var d3 = require('d3');
var attrs = require('plugins/alerting/vis/components/utils/attrs');
var baseLayout = require('plugins/alerting/vis/components/layout/layout');
var gGenerator = require('plugins/alerting/vis/components/elements/g');

function layoutGenerator() {
  var layout = baseLayout();
  var group = gGenerator();

  function generator(selection) {
    selection.each(function (data) {
      group.cssClass('chart')
        .transform(function (d) {
          return 'translate(' + d.dx + ',' + d.dy + ')';
        });

      d3.select(this)
        .datum(layout(data))
        .call(group);
    });
  }

  // Public API
  generator.attr = attrs(generator)(layout);

  return generator;
}

module.exports = layoutGenerator;
