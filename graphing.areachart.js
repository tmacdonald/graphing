function create_path_from_points( points ) {
  var path= "";
  for ( var j = 0; j < points.length; j++ ) {
    var op = ( j == 0 ) ? "M" : "L";
    path += op + " " + points[j].x + " " + points[j].y + " ";
  }
  return path;
}

Raphael.fn.areachart = function(values, opts) {
  var colors = [ "lightblue", "darkgray", "lightpink", "#AF2C31", "#175E6A", "#6C8CC7", "#CD8215",
                   "#6C3290", "#175E6A", "#818D97", "#D8B304"];

  var opts = opts || {};

  opts.x = opts.x || 0;
  opts.y = opts.y || 0;
  opts.width = opts.width || this.width - opts.x;
  opts.height = opts.height || this.height - opts.y;

  var chart = {};
  chart.areas = this.set();
  
  var len = 0;
  var l = values.length;
  for ( var i = 0; i < l; i++ ) {
    len = Math.max(len, values[i].length);
  }
  for ( var i = 0; i < l; i++ ) {
    for ( var j = 0; j < len - values[i].length; j++ ) {
      values[i].push(0);
    }
  }
  var columns = [];
  var maximums = [];
  for ( var i = 0; i < len; i++ ) {
    var column = [];
    var total = 0;
    for ( var j = 0; j < l; j++ ) {
      column.push(values[j][i]);
      total += values[j][i];
    }
    columns.push(column);
    maximums.push(total);
  }  
  
  var max = Math.max.apply(Math, maximums);
  var column_width = opts.width / ( len - 1 );
  var column_height = opts.height;
  
  var current = [];
  for ( var i = 0; i < len; i++ ) {
    current.push(0);
  }
  
  var paths = [];

  for ( var i = 0; i < l; i++ ) {
    var last_path = [];
    var this_path = [];
    
    for ( var j = 0; j < len; j++ ) {
      last_path.push( {x: opts.x + j * column_width, y: opts.y +  ( column_height - (column_height * current[j] / max) )} );
      current[j] += values[i][j];
    }
    for ( var j = len - 1; j >= 0; j-- ) {
      this_path.push( {x: opts.x + j * column_width, y: opts.y + ( column_height - (column_height * current[j] / max) )} ); 
    }
    
    paths.push( [ last_path, this_path ] );
  }

  for ( var i = paths.length - 1; i >= 0; i-- ) {
    var path = [];
    path = path.concat( paths[i][0] );
    path = path.concat( paths[i][1] );
    path.push( path[0] );
     
    var area = create_path_from_points( path ); 
    var line = create_path_from_points( paths[i][1] );

    chart.areas.push( this.path( area ).attr({"stroke-width": 1, stroke: "#fff", fill: colors[ paths.length - i - 1]}) );
    this.path( line ).attr( { "stroke-width": 3, stroke: colors[ paths.length - i - 1] } );
  }

  return chart;
};
