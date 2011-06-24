Raphael.fn.piechart = function( values, opts ) {
  var colors = ["lightblue","darkgray","lightpink","yellow","blue","green","red","black","gray","orange","red"];

  var opts = opts || {};

  opts.x = opts.x || 0;
  opts.y = opts.y || 0;
  opts.width = opts.width || this.width - opts.x;
  opts.height = opts.height || this.height - opts.y;

  var total = 0;
  for ( var i = 0; i < values.length; i++ ) {
    total += values[i];
  }
  
  var cx = opts.x + opts.width / 2;
  var cy = opts.y + opts.height / 2;
  var r = Math.min( opts.width / 2, opts.height / 2 );

  var offset = 0;
  for ( var i = 0; i < values.length; i++ ) {
    var rads = Math.PI * 2 * values[i] / total;
    
    var x1 = cx + Math.sin( offset ) * r;
    var y1 = cy + Math.cos( offset ) * r;

    offset += rads;    

    var x2 = cx + Math.sin( offset ) * r;
    var y2 = cy + Math.cos( offset ) * r;
    
    var largearc = (rads > Math.PI) ? 1 : 0;

    var path = ( "M " + cx + " " + cy + " L " + x1 + " " + y1 + " A " + r + " " + r + " 0 " + largearc + " 0 " + x2 + " " + y2 + " L " + cx + " " + cy );
    console.log(path);
    this.path(path).attr({"stroke-width": 0, fill: colors[i]});
  }
};
