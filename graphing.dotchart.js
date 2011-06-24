Raphael.fn.dotchart = function(values, opts) {
  var opts = opts || {};

  opts.x = opts.x || 0;
  opts.y = opts.y || 0;
  opts.width = opts.width || this.width - opts.x;
  opts.height = opts.height || this.height - opts.y;

  function render_series(paper, series_values, offset, max) {
    var width = opts.width / series_values.length;

    for ( var i = 0; i < series_values.length; i++ ) {
      var x = opts.x + (i * width) + width / 2;
      var y = opts.y + offset + width / 2;

      paper.circle( x, y, series_values[i] / max * width / 2).attr({"fill": "lightblue", "stroke-width": 0});
    }
  }

  if ( !this.raphael.is( values[0], "array" ) ) {
    values = [values];
  }

  var max = 0;
  for ( var i = 0; i < values.length; i++ ) {
    max = Math.max( max, Math.max.apply( Math, values[i] ) );
  }
  for ( var i = 0; i < values.length; i++ ) {
    render_series( this, values[i], i * opts.height / values.length, max );
  }
};
