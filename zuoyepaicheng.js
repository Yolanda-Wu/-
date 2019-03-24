let fastestWay = function() {
  let result = initArray(2, 5);
  let arrayA = [[7, 9, 3, 4, 80], [8, 5, 6, 4, 5]];
  let arrayT = [[2, 3, 1, 3], [2, 1, 2, 2]];
  let e = [2, 4];
  let x = [3, 6];
  let n = 5;
  let listNum = initArray(2, 4);
  result[0][0] = e[0] + arrayA[0][0];
  result[1][0] = e[1] + arrayA[1][0];
  for (let i = 1; i < n; i++) {
    if (result[0][i - 1] + arrayA[0][i] <= result[1][i - 1] + arrayT[1][i - 1] + arrayA[0][i]) 
		{
			result[0][i] = result[0][i - 1] + arrayA[0][i];
			listNum[0][i-1] = 1;
		}
		else 
		{
			result[0][i] = result[1][i - 1] + arrayT[1][i - 1] + arrayA[0][i];
			listNum[0][i-1] = 2;
		}

		if (result[1][i - 1] + arrayA[1][i] <= result[0][i - 1] + arrayT[0][i - 1] + arrayA[1][i])
		{
			result[1][i] = result[1][i - 1] + arrayA[1][i];
			listNum[1][i-1] = 2;
		}
		else
		{
			result[1][i] = result[0][i - 1] + arrayT[0][i - 1] + arrayA[1][i];
			listNum[1][i-1] = 1;
		}
  }

  let resultFinal;
  let listFinal;

  if (result[0][n-1] + x[0] <= result[1][n-1] + x[1]) 
	{
		resultFinal = result[0][n-1] + x[0];
    listFinal = listNum[0];
    listFinal.push(1);
	}
	else 
	{
		resultFinal = result[1][n-1] + x[1];
    listFinal = listNum[1];
    listFinal.push(2);
  }

  let resultObj = {
    shortestTime: resultFinal,
    fastestWay: listFinal
  }

  return resultObj;
}

let initArray = function(x, y) {
  let arr = new Array(x);
  for (let i = 0; i < x; i++) {
    arr[i] = new Array(y);
    for (let j = 0; j < y; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let result = fastestWay();
result;

