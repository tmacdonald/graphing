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
    for ( var i = 0; i < values.length; i++ ) {
      render_series( this, values[i], i * this.height / values.length, max );
    }
  } else {
    var max = Math.max.apply( Math, values );
    render_series( this, values, 0, max );
  }
};
