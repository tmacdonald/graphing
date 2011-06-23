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

