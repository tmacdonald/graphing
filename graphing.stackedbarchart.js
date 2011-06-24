Raphael.fn.stackedbarchart = function( values, opts ) {
  var colors = [ "lightblue", "darkgray", "lightpink" ];
    
  var opts = opts || {};

  opts.x = opts.x || 0;
  opts.y = opts.y || 0;
  opts.width = opts.width || this.width - opts.x;
  opts.height = opts.height || this.height - opts.y;

  var chart = {};
  chart.bars = [];

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
  var column_width = opts.width / len;
  var column_height = opts.height;
  
  for ( var i = 0; i < len; i++ ) {
    var x1 = opts.x + i * column_width;
    var x2 = opts.x + (i + 1) * column_width;
    
    var y = opts.y + column_height;
    for ( var j = 0; j < l; j++ ) {
      var y1 = y;
      var y2 = y - (column_height * values[j][i] / max ); 
      
      var bar = this.path("M " + x1 + " " + y1 + " V " + y2 + " H " + x2 + " V " + y1 + " H " + x1)
          .attr({"stroke-width": 1, stroke: "#fff", fill: colors[j]});

      y = y2;
    }
  }
};

