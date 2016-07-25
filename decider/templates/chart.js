function indexOfGreatest(array){
  var highest = 0;
  var index = -1;
  for (a=0;a<array.length;a++){
    if (array[a]>highest){
      index = a;
      highest = array[a];
    }
  }
  return index;
}
function decide(){
  var results = "RESULTS";
  document.getElementById("resultList").innerHTML = "";
  var names = [];
  var i =1;
  while (document.getElementById("name"+i) != null){
    names.push(document.getElementById("name"+i).value);
    i++;
  }
  var weights = [];
  var w = 1;
  while (document.getElementById("f"+w+"weight") != null){
    weights.push(document.getElementById("f"+w+"weight").value)
    w++;
  }
  var values = [];
  var localValues = [];
  var o = 1;
  var f = 1;
  while (document.getElementById("o"+o+"f"+f) != null){
    localValues = [];
    while (document.getElementById("o"+o+"f"+f) != null){
      localValues.push(document.getElementById("o"+o+"f"+f).value);
      f++;
    }
    values.push(localValues);
    o++;
    f = 1;
  }
  var scores = [];
  var singlescore=0;
  for (i=0;i<values.length;i++){
    for (j=0;j<values[i].length;j++){
      singlescore=singlescore+(weights[j]*values[i][j])
    }
    scores.push(singlescore);
    singlescore=0;
  }
  while (indexOfGreatest(scores)!= -1){
    results = results.concat("<br>",names[indexOfGreatest(scores)],": ", scores[indexOfGreatest(scores)]);
    names.splice(indexOfGreatest(scores),1);
    scores.splice(indexOfGreatest(scores),1);
  }
  $('#resultList').append(results)
}
function newColumn(){
  $('#myTable tr').append('<td>new</td>')
}
function newRow(){
  $('#myTable tr:last').after('<tr><td>HELLO</td></tr>');
}
$('#decide').on('click', decide);
$('#newCol').on('click', newColumn);
$('#newRow').on('click', newRow);
