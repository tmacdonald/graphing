Raphael.fn.stackedlinechart = function(values, opts) {
  var colors = [ "lightblue", "darkgray", "lightpink", "#AF2C31", "#175E6A", "#6C8CC7", "#CD8215",
                   "#6C3290", "#175E6A", "#818D97", "#D8B304"];

  var opts = opts || {};

  opts.x = opts.x || 0;
  opts.y = opts.y || 0;
  opts.width = opts.width || this.width - opts.x;
  opts.height = opts.height || this.height - opts.y;

  var chart = {};
  chart.areas = [];
  
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
  
  for ( var i = 0; i < l; i++ ) {
    var path = [];
    
    for ( var j = 0; j < len; j++ ) {
      path.push( {x: j * column_width, y: column_height - (column_height * current[j] / max)} );
      current[j] += values[i][j];
    }
    for ( var j = len - 1; j >= 0; j-- ) {
      path.push( {x: j * column_width, y: column_height - (column_height * current[j] / max)} ); 
    }
    
    path.push( path[0] );
    
    var pathString = "";
    for ( var j = 0; j < path.length; j++ ) {
       var op = ( j == 0 ) ? "M" : "L";
       pathString += op + " " + (opts.x + path[j].x) + " " + (opts.y + path[j].y) + " ";
     }
    
     chart.areas.push( this.path(pathString).attr({"stroke-width": 1, stroke: "#fff", fill: colors[i]}) );
  }
  return chart;
};
