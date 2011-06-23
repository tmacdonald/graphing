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

