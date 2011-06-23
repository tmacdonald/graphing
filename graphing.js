Raphael.fn.slice = function ( cx, cy, r, sa, a ) {
  var x1 = cx + Math.sin(sa) * r;
  var y1 = cy + Math.cos(sa) * r;
  
  var x2 = cx + Math.sin(sa + a) * r;
  var y2 = cy + Math.cos(sa + a) * r;
  
  return this.path("M " + cx + " " + cy + " L " + x1 + " " + y1 + " A" + r + " " + r + " 0 0 0 " + x2 + " " + y2 + " L " + cx + " " + cy);
};

Raphael.fn.segment = function ( cx, cy, r1, r2, sa, a ) {  
  var x1 = cx + Math.sin(sa) * r1;
  var y1 = cy + Math.cos(sa) * r1;
  
  var x2 = cx + Math.sin(sa) * r2;
  var y2 = cy + Math.cos(sa) * r2;
  
  var x3 = cx + Math.sin(sa + a) * r2;
  var y3 = cy + Math.cos(sa + a) * r2;
  
  var x4 = cx + Math.sin(sa + a) * r1;
  var y4 = cy + Math.cos(sa + a) * r1;
  
  return this.path("M " + x1 + " " + y1 + " L " + x2 + " " + y2 + " A " + r2 + " " + r2 + " 0 0 0 " + x3 + " " + y3 + " L " + x4 + " " + y4 + " A " + r1 + " " + r1 + " 0 0 1 " + x1 + " " + y1); 
};

Raphael.fn.dotchart = function(values) {
  function render_series(paper, series_values, offset, max) {
    var width = paper.width / series_values.length;

    for ( var i = 0; i < series_values.length; i++ ) {
      var x = (i * width) + width / 2;
      var y = offset + width / 2;

      paper.circle( x, y, series_values[i] / max * width / 2).attr({"fill": "lightblue", "stroke-width": 0});
    }
  }

  if (this.raphael.is(values[0], "array")) {
    var max = 0;
    for ( var i = 0; i < values.length; i++ ) {
      max = Math.max( max, Math.max.apply( Math, values[i] ) );
    }
    console.log(max);
    for ( var i = 0; i < values.length; i++ ) {
      console.log(values[i]);
      render_series( this, values[i], i * this.height / values.length, max );
    }
  } else {
    var max = Math.max.apply( Math, values );
    render_series( this, values, 0, max );
  }
  
}

Raphael.fn.barchart = function(values) {
  var colors = [ "#55B1E3", "#94B93D", "#AF2C31", "#175E6A", "#6C8CC7", "#CD8215",
                   "#6C3290", "#175E6A", "#818D97", "#D8B304"];

  var max = Math.max.apply(Math, values);
  var column_width = this.width / values.length;
  var column_height = this.height;
  
  function render_series(paper, series_values, total_column_width, offset) {
    var path = "";
    
    var l = series_values.length;
    for ( var i = 0; i < l; i++ ) {
      var x1 = offset + i * (total_column_width);
      var x2 = x1 + column_width;
      
      var y1 = column_height;
      var y2 = column_height - (column_height * (series_values[i] / max));
      
      path += "M " + x1 + " " + y1 + " V " + y2 + " H " + x2 + " V " + y1 + " H " + x1 + " ";
    }
    
    return paper.path(path);
  }
  
  if (this.raphael.is(values[0], "array")) {
    max = 0;
    column_width = this.width / (values[0].length * values.length);
    for ( var i = 0; i < values.length; i++ ) {
      max = Math.max(max, Math.max.apply(Math, values[i]));
    }
    
    for ( var i = 0; i < values.length; i++ ) {
      render_series(this, values[i], column_width * values.length, column_width * i)
        .attr({stroke: "#fff", fill: colors[i]});
    }
  } else {
    render_series(this, values);
  }
  
};

Raphael.fn.stackedbarchart = function(values) {
  var colors = [ "#55B1E3", "#A0D9F5", "#94B93D", "#AF2C31", "#175E6A", "#6C8CC7", "#CD8215",
                   "#6C3290", "#175E6A", "#818D97", "#D8B304"];
  
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
  var column_width = this.width / len;
  var column_height = this.height;
  
  for ( var i = 0; i < len; i++ ) {
    var x1 = i * column_width;
    var x2 = (i + 1) * column_width;
    
    var y = column_height;
    for ( var j = 0; j < l; j++ ) {
      var y1 = y;
      var y2 = y - (column_height * values[j][i] / max ); 
      
      var bar = this.path("M " + x1 + " " + y1 + " V " + y2 + " H " + x2 + " V " + y1 + " H " + x1)
          .attr({"stroke-width": 1, stroke: "#fff", fill: colors[j]});
      
      y = y2;
    }
  }
};

Raphael.fn.stackedlinechart = function(values) {
  var colors = [ "lightpink", "darkgray", "lightblue", "#AF2C31", "#175E6A", "#6C8CC7", "#CD8215",
                   "#6C3290", "#175E6A", "#818D97", "#D8B304"];
  
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
  var column_width = this.width / len;
  var column_height = this.height;
  
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
      pathString += op + " " + path[j].x + " " + path[j].y + " ";
    }
    
    this.path(pathString).attr({"stroke-width": 1, stroke: "#fff", fill: colors[i]});
  }
};

Raphael.fn.linechart = function(values) {
  var colors = [ "#55B1E3", "#94B93D", "#AF2C31", "#175E6A", "#6C8CC7", "#CD8215",
                   "#6C3290", "#175E6A", "#818D97", "#D8B304"];
                
  var max = Math.max.apply(Math, values);
  var column_width = this.width / values.length;
  var column_height = this.height;
  
  function render_series(paper, series_values) {
    var path = "";
    var l = series_values.length;
    for ( var k = 0; k < l; k++ ) {
      var x = k * column_width;
      var y = column_height - (column_height * (series_values[k] / max));
      console.log(column_height, series_values[k], max);
      
      var op = (k === 0) ? "M" : "L";
      
      path += op + " " + x + " " + y + " ";
    }
    console.log(path);
    return paper.path(path).attr({"stroke-width": 1}); 
  }
  
  if (this.raphael.is(values[0], "array")) {
    max = 0;
    column_width = this.width / values[0].length;
    for ( var i = 0; i < values.length; i++ ) {
      max = Math.max(max, Math.max.apply(Math, values[i]));
    }
    
    for ( var i = 0; i < values.length; i++ ) {
      render_series(this, values[i]).attr({"stroke-width": 2, stroke: colors[i]});
    }
  } else {
    render_series(this, values);
  }
};
