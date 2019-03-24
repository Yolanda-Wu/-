let generateMatrix = function (n) {
  let matrix = new Array();
  for (let i = 0; i < n; i++) {
    matrix.push(new Array());
    for (let j = 0; j < n; j++) {
      matrix[i].push(1);
    }
  }
  return matrix;
}

let divideMatrix = function(x1, y1, x2, matrix) {
  let n = x2-x1+1;
  let m = new Array(n);
  for (let i = 0; i < n; i++) {
    m[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      m[i][j] = matrix[i+x1][j+y1];
    }
  }
  return m;
}

let addMatrix = function(A, B, type) {
  var n = A.length;
  var result = [];
  for (let i = 0; i < n; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      // 复制值
      result[i][j] = type === 'minus' ? (A[i][j] - B[i][j]) : (A[i][j] + B[i][j]);
    }
  }
  return result;
}

let MergeResult = function (C11, C12, C21, C22) {
  let m = C11.length;
  let n = C11.length * 2;
  let C = generateMatrix(n);

  for(let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i < m && j < m) {
        C[i][j] = C11[i][j];
      } else if (i < m && j >= m) {
        C[i][j] = C12[i][j-m];
      } else if (i >= m && j < m) {
        C[i][j] = C21[i-m][j];
      } else if (i >= m && j >= m) {
        C[i][j] = C22[i-m][j-m];
      }
    }
  }

  return C;
}

let StrassenMutipyMatrix = function (matrixA, matrixB) {
  let n = matrixA.length;
  let subMatrixLen = n / 2;
  let C = generateMatrix(n);

  if (n === 1) {
    C[0][0] = matrixA[0][0] * matrixB[0][0];
    return C;
  } else {
    let A11 = divideMatrix(0, 0, subMatrixLen - 1, matrixA);
    let A12 = divideMatrix(0, subMatrixLen, subMatrixLen - 1, matrixA);
    let A21 = divideMatrix(subMatrixLen, 0, n - 1, matrixA);
    let A22 = divideMatrix(subMatrixLen, subMatrixLen, n - 1, matrixA);

    let B11 = divideMatrix(0, 0, subMatrixLen - 1, matrixB);
    let B12 = divideMatrix(0, subMatrixLen, subMatrixLen - 1, matrixB);
    let B21 = divideMatrix(subMatrixLen, 0, n - 1, matrixB);
    let B22 = divideMatrix(subMatrixLen, subMatrixLen, n - 1, matrixB);

    let P1 = StrassenMutipyMatrix(A11, addMatrix(B12, B22, 'minus'));
    let P2 = StrassenMutipyMatrix(addMatrix(A11, A12), B22);
    let P3 = StrassenMutipyMatrix(addMatrix(A21, A22), B11);
    let P4 = StrassenMutipyMatrix(A22, addMatrix(B21, B11, 'minus'));
    let P5 = StrassenMutipyMatrix(addMatrix(A11, A22), addMatrix(B11, B22));
    let P6 = StrassenMutipyMatrix(addMatrix(A12, A22, 'minus'), addMatrix(B21, B22));
    let P7 = StrassenMutipyMatrix(addMatrix(A11, A21, 'minus'), addMatrix(B11, B12));

    let C11 = addMatrix(addMatrix(addMatrix(P5, P4), P2, 'minus'), P6)
    let C12 = addMatrix(P1, P2);
    let C21 = addMatrix(P3, P4);
    let C22 = addMatrix(addMatrix(addMatrix(P5, P1), P3, 'minus'), P7, 'minus');

    C = MergeResult(C11, C12, C21, C22);
    //console.log(C);
    return C;
  }
}



let matrixA = generateMatrix(16);
let matrixB = generateMatrix(16);

let C = StrassenMutipyMatrix(matrixA, matrixB);
C;

let getPoint = function(n) {
  let points = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i < n; i++) {
    x = Math.floor(Math.random() * 1000);
    y = Math.floor(Math.random() * 1000);
    points[i] = {x: x, y: y};
  }
  return points;
}

let bruteForceGetLatestPoints = function(points) {
  let latest = {
    pointA: {
      x: 0,
      y: 0
    },
    pointB: {
      x: 0,
      y: 0
    },
    direction: Infinity
  };
  for (let i = 0; i < points.length; i++) {
    for (let j = i+1; j < points.length; j++) {
      let dir = Math.sqrt((points[i].x - points[j].x)*(points[i].x - points[j].x) + (points[i].y - points[j].y)*(points[i].y - points[j].y));
      if (dir < latest.direction) {
        latest.pointA = points[i];
        latest.pointB = points[j];
        latest.direction = dir;
      }
    }
  }
  return latest;
}

let sortPoints = function(points) {
  let tmp;
  for (let i = 0; i < points.length; i++) {
    for (let j = i+1; j < points.length; j++) {
      if (points[i].x >= points[j].x) {
        tmp = points[j];
        points[j] = points[i];

      }
    }
  }
}

let advanceGetLatestPoints = function() {

}

// let points = getPoint(10);

// let latestPoints = bruteForceGetLatestPoints(points);
// points;
// latestPoints;