// 最优循环方法

var arrList = new Array(1, 2, 3, 4, 5);

arrList.forEach(function (item) {
  //最优
  console.log(item);
});

for (var i = arrList.length; i; i--) {
  console.log(arrList[i]);
}

for (var i in arrList) {
  console.log(arrList[i]);
}
