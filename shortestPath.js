//节点
function Vertex() {
  if (!(this instanceof Vertex))
      return new Vertex();
  this.id = null;
}

//边
function Edge() {
  if (!(this instanceof Edge))
      return new Edge();
  this.u = null; 
  this.v = null; 
  this.w = null; 
}

//图
function Graph() {
  if (!(this instanceof Graph))
      return new Graph();
  this.vertices = [];
  this.edges = [];
  this.refer = new Map();
}
Graph.prototype = {
  constructor: Graph,
  initVertices: function(vs) {
      for (let id of vs) {
          let v = Vertex();
          v.id = id;
          this.refer.set(id, v);
          this.vertices.push(v);
      }
  },
  initEdges: function(es) {
      for (let r of es) {
          let e = Edge();
          e.u = this.refer.get(r.u);
          e.v = this.refer.get(r.v);
          e.w = r.w;
          this.edges.push(e);
      }
  }
}

function BellmanFord(vertices, edges, source) {
  let distance = new Map();
  let predecessor = new Map();

  for (let v of vertices) {
      distance.set(v, Infinity);
      predecessor.set(v, null);
  }
  distance.set(source, 0);

  for (let i = 1, len = vertices.length - 1; i < len; i++) {
      for (let e of edges) {
          if (distance.get(e.u) + e.w < distance.get(e.v)) {
              distance.set(e.v, distance.get(e.u) + e.w);
              predecessor.set(e.v, e.u);
          }
      }
  }

  for (let e of edges) {
      if (distance.get(e.u) + e.w < distance.get(e.v))
          return null;
  }

  return {
      distance: distance,
      predecessor: predecessor
  }
}

var vertices = ['s', 't', 'x', 'y', 'z'];
var edges = [
  { u: 's', v: 't', w: 6 },
  { u: 's', v: 'y', w: 7 },
  { u: 't', v: 'x', w: 5 },
  { u: 't', v: 'y', w: 8 },
  { u: 'y', v: 'x', w: -3 },
  { u: 'y', v: 'z', w: 9 },
  { u: 'z', v: 's', w: 2 },
  { u: 'z', v: 'x', w: 7 },
  { u: 'x', v: 't', w: -2 },
  { u: 't', v: 'z', w: -4 },
];

var g = Graph();
g.initVertices(vertices);
g.initEdges(edges);

let distanceMatrix = [
  [0, 3, 8, Infinity, -4],
  [Infinity, 0, Infinity, 1, 7],
  [Infinity, 4, 0, Infinity, Infinity],
  [2, Infinity, -5, 0, Infinity],
  [Infinity, Infinity, Infinity, 6, 0]
]

let floyd = function(matrix) {
  for (let k = 0; k < matrix.length; k++) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][k] + matrix[k][j] < matrix[i][j]) {
          matrix[i][j] = matrix[i][k] + matrix[k][j];
        }
      }
    }
  }
  return matrix;
}

let result1 = BellmanFord(g.vertices, g.edges, g.vertices[0]);

let result2 = floyd(distanceMatrix);
result1;
result2;