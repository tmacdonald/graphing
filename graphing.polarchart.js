Raphael.fn.polarchart = function( values ) {
  var colors = ["lightblue","darkgray","lightpink","yellow","blue","green","red","black","gray","orange","red"];

  var max = Math.max.apply( Math, values );

  var cx = this.width / 2;
  var cy = this.height / 2;
  var radius = Math.min( cx, cy );

  var offset = 0;
  for ( var i = 0; i < values.length; i++ ) {
    var rads = Math.PI * 2 / values.length;
    
    var r = radius * values[i] / max;

    var x1 = cx + Math.sin( offset ) * r;
    var y1 = cy + Math.cos( offset ) * r;

    offset += rads;    

    var x2 = cx + Math.sin( offset ) * r;
    var y2 = cy + Math.cos( offset ) * r;

    var path = ( "M " + cx + " " + cy + " L " + x1 + " " + y1 + " A " + r + " " + r + " 0 0 0 " + x2 + " " + y2 + " L " + cx + " " + cy );
    this.path(path).attr({"stroke-width": 2, fill: colors[0], stroke: "#fff"});
  }
};
