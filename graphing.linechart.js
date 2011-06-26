Raphael.fn.linechart = function(values, opts) {
  var colors = [ "lightblue", "darkgray", "lightpink", "#AF2C31", "#175E6A", "#6C8CC7", "#CD8215",
                   "#6C3290", "#175E6A", "#818D97", "#D8B304"];

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

  function get_points_from_values( series_values ) {
    var points = [];
    var l = series_values.length;
    for ( var i = 0; i < l; i++ ) {
      var x = opts.x + i * column_width;
      var y = opts.y + column_height - ( column_height * ( series_values[i] / max ) );

      points.push( { x: x, y: y } );
    }
    return points;
  }
  
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
 
  if ( !this.raphael.is( values[0], "array" ) ) {
    values = [values];
  }
   
  max = 0;
  column_width = opts.width / ( values[0].length - 1 );
  for ( var i = 0; i < values.length; i++ ) {
    max = Math.max( max, Math.max.apply( Math, values[i] ) );
  }
  
  for ( var i = 0; i < values.length; i++ ) {
    var points = get_points_from_values( values[i] );
    var path = create_path_from_points( points );
    chart.lines.push( this.path( path )
      .attr( {"stroke-width": 2, stroke: colors[i] } ) );

    if ( opts.include_area ) {
      points.push( { x: opts.x + opts.width, y: opts.y + opts.height } );
      points.push( { x: opts.x, y: opts.y + opts.height } );
    
      this.path( create_path_from_points( points ) ).attr( { "stroke-width": 0, fill: colors[i], "fill-opacity": 0.5 } );
    }
  }

  return chart;
};

