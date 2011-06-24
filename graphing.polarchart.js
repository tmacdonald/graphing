Raphael.fn.polarchart = function( values, opts ) {
  var colors = ["lightpink","darkgray","lightblue","yellow","blue","green","red","black","gray","orange","red"];

  var opts = opts || {};

  opts.x = opts.x || 0;
  opts.y = opts.y || 0;
  opts.width = opts.width || this.width - opts.x;
  opts.height = opts.height || this.height - opts.y;

  if ( !this.raphael.is(values[0], "array") ) {
    values = [values];
  }

  var max = 0;
  var total = 0;
  for ( var i = 0; i < values.length; i++ ) {
    var current = 0
    for ( var j = 0; j < values[i].length; j++ ) {
      current += values[i][j];
    }
    total = Math.max( total, current );
    max = Math.max( max, Math.max.apply( Math, values[i] ) );
  }

  var cx = opts.x + opts.width / 2;
  var cy = opts.y + opts.height / 2;
  var radius = Math.min( opts.width / 2, opts.height / 2 ) / values.length;;

  var offsets = [];
  for ( var i = 0; i < values[0].length; i++ ) {
    offsets.push(0);
  }

  for ( var i = 0; i < values.length; i++ ) {
    var rads = Math.PI * 2 / values[i].length;
    for ( var j = 0; j < values[i].length; j++ ) {
      var r1 = offsets[j];
      var r2 = offsets[j] + radius * values[i][j] / max;

      var a1 = j * rads;
      var a2 = (j + 1) * rads;

      this.segment( cx, cy, r1, r2, a1, a2 - a1 )
        .attr({"stroke-width": 0, fill: colors[i]});

      offsets[j] += radius * values[i][j] / max;
    }
  }
};
