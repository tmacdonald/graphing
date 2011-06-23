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
