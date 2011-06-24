Raphael.fn.dotchart = function(values, opts) {
  var colors = [ "lightblue", "darkgray", "lightpink", "#AF2C31", "#175E6A", "#6C8CC7", "#CD8215",
                   "#6C3290", "#175E6A", "#818D97", "#D8B304"];
  var opts = opts || {};

  opts.x = opts.x || 0;
  opts.y = opts.y || 0;
  opts.width = opts.width || this.width - opts.x;
  opts.height = opts.height || this.height - opts.y;

  function render_series(paper, series_values, offset, max) {
    var width = opts.width / series_values.length;
    var series = paper.set();

    for ( var i = 0; i < series_values.length; i++ ) {
      var x = opts.x + (i * width) + width / 2;
      var y = opts.y + offset;

      series.push( paper.circle( x, y, series_values[i] / max * width / 2 ) );
    }
    return series;
  }

  if ( !this.raphael.is( values[0], "array" ) ) {
    values = [values];
  }

  var max = 0;
  for ( var i = 0; i < values.length; i++ ) {
    max = Math.max( max, Math.max.apply( Math, values[i] ) );
  }
  for ( var i = 0; i < values.length; i++ ) {
    var height = opts.height / values.length;
    render_series( this, values[i], i * height + height / 2, max ).attr( { "stroke-width": 0, fill: colors[i] } );
  }
};
