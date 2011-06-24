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

  var largearc = (a > Math.PI) ? 1 : 0;
  
  return this.path("M " + x1 + " " + y1 + " L " + x2 + " " + y2 + " A " + r2 + " " + r2 + " 0 " + largearc + " 0 " + x3 + " " + y3 + " L " + x4 + " " + y4 + " A " + r1 + " " + r1 + " 0 " + largearc + " 1 " + x1 + " " + y1); 
};

