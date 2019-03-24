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

let longestSubSequence = function(s1, s2) {
  s1.unshift('S');
  s2.unshift('S');
  let c = initArray(s1.length, s2.length);
  let startS1;
  let startS2;
  let subSLength = 0;
  for (let i = 1; i < s1.length; i++) {
    for (let j = 1; j < s2.length; j++) {
      if (s2[j] === s1[i]) {
        c[i][j] = c[i-1][j-1] + 1;
      } else {
        c[i][j] = c[i-1][j] > c[i][j-1] ? c[i-1][j] : c[i][j-1];
      }
    }
    
  }
  let subSequenceLen = c[s1.length-1][s2.length-1];
  let subSequence = '';
  let length = subSequenceLen;
  let i = s1.length-1,
      j = s2.length-1;
  while (length > 0) {
    if (s1[i] === s2[j]) {
      subSequence = s1[i] + subSequence;
      length--;
      i--;
      j--;
    } else if (c[i-1][j] === c[i][j-1]) {
      i--;
    } else {
      j--;
    }
  }
  return {
    subSequenceLen: subSequenceLen,
    subSequence: subSequence
  }
}

let s1 = 'ACCGGTCGAGATGCAG'.split('');
let s2 = 'GTCGTTCGGAATGCAT'.split('');
let result = longestSubSequence(s1, s2);
result;
