Raphael.fn.linechart = function(values, opts) {
  var colors = [ "lightpink", "darkgray", "lightblue" ];

  var opts = opts || {};

  opts.x = opts.x || 0;
  opts.y = opts.y || 0;
  opts.width = opts.width || this.width - opts.x;
  opts.height = opts.height || this.height - opts.y;

  var chart = {};
  chart.lines = [];
                
  var max = Math.max.apply(Math, values);
  var column_width = opts.width / ( values.length - 1 );
  var column_height = opts.height;
  
  function render_series(paper, series_values) {
    var path = "";
    var l = series_values.length;
    for ( var k = 0; k < l; k++ ) {
      var x = opts.x + k * column_width;
      var y = opts.y + column_height - (column_height * (series_values[k] / max));
      
      var op = (k === 0) ? "M" : "L";
      
      path += op + " " + x + " " + y + " ";
    }
    return paper.path( path ).attr( { "stroke-width": 1 } ); 
  }
  
  if ( this.raphael.is( values[0], "array") ) {
    max = 0;
    column_width = opts.width / ( values[0].length - 1 );
    for ( var i = 0; i < values.length; i++ ) {
      max = Math.max( max, Math.max.apply( Math, values[i] ) );
    }
    
    for ( var i = 0; i < values.length; i++ ) {
      chart.lines.push( render_series( this, values[i] )
        .attr( {"stroke-width": 2, stroke: colors[i] } ) );
    }
  } else {
    chart.lines.push( render_series( this, values ).attr( { stroke: colors[0] } ) );
  }

  return chart;
};

