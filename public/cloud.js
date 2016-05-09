require('plugins/alerting/cloud.less');
require('plugins/alerting/lib/cloud_controller.js');
require('plugins/alerting/lib/cloud_directive.js');

function TagCloudProvider(Private) {
  var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
  var Schemas = Private(require('ui/Vis/Schemas'));

  return new TemplateVisType({
    name: 'alerting',
    title: 'Simple Alerting Dashboard',
    description: 'Simple Alerting Dashboard is a simple visualisation, ' +
     'typically used to visualize alerts base on data, ' +
     'and the importance of each alert is shown with font size or color.',
    icon: 'fa-bell',
    template: require('plugins/alerting/cloud.html'),
    params: {
      defaults: {
        textScale: 'linear',
        orientations: 1,
        fromDegree: 0,
        toDegree: 0,
        font: 'serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        timeInterval: 500,
        spiral: 'archimedean',
        minFontSize: 18,
        maxFontSize: 72
      },
      editor: require('plugins/alerting/cloud_vis_params.html')
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Tag Size',
        min: 1,
        max: 1,
        aggFilter: ['avg', 'sum', 'count', 'min', 'max', 'median', 'cardinality'],
        defaults: [
          { schema: 'metric', type: 'count' }
        ]
      },
      {
        group: 'buckets',
        name: 'segment',
        icon: 'fa fa-cloud',
        title: 'Tags',
        min: 1,
        max: 1,
        aggFilter: ['terms', 'significant_terms']
      }
    ])
  });
}

require('ui/registry/vis_types').register(TagCloudProvider);
