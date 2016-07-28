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
  var results = "";
  var element = document.getElementById("question");
  if (element.tagName == 'TEXTAREA'){
    results = results + document.getElementById("question").value.toUpperCase();
  }
  else{
    results = results + document.getElementById("question").textContent.toUpperCase();
  }
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
  $('#resultList').append(results);
  $('html, body').animate({
    scrollTop: $("#resultList").offset().top
 }, 1000);
}
function newColumn(){
  var rows = document.getElementById("myTable").rows.length;
  var cols = document.getElementById("myTable").rows[0].cells.length;
  var newStuff = "";
  if (cols%2==1){
    $('#myTable tr:eq(0)').append("<td class='row1 coleven'><textarea id='name"+(cols-1)+"' class='option'>Option "+(cols-1)+"</textarea></td>");
    for (var i=1;i<rows;i++){
      if (i%2==1){
        newStuff=newStuff+"<td class='roweven coleven'>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd coleven'>";
      }
      newStuff=newStuff+"<select id='o"+(cols-1)+"f"+i+"' class='dropdown'><option value='0'>Score</option>";
      for (var j=1;j<11;j++){
        newStuff=newStuff+"<option value='"+j+"'>"+j+"</option>";
      }
      newStuff=newStuff+"</select></td>";
      $('#myTable tr:eq('+i+')').append(newStuff);
      newStuff="";
    }
  }
  else{
    $('#myTable tr:eq(0)').append("<td class='row1 colodd'><textarea id='name"+(cols-1)+"' class='option'>Option "+(cols-1)+"</textarea></td>");
    for (i=1;i<rows;i++){
      if (i%2==1){
        newStuff=newStuff+"<td class='roweven colodd'>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd colodd'>";
      }
      newStuff=newStuff+"<select id='o"+(cols-1)+"f"+i+"' class='dropdown'><option value='0'>Score</option>";
      for (j=1;j<11;j++){
        newStuff=newStuff+"<option value='"+j+"'>"+j+"</option>";
      }
      newStuff=newStuff+"</select></td>";
      $('#myTable tr:eq('+i+')').append(newStuff);
      newStuff="";
    }
  }
}
function newRow(){
  var rows = document.getElementById("myTable").rows.length;
  var cols = document.getElementById("myTable").rows[0].cells.length;
  var newStuff = "";
  if (rows%2==0){
    newStuff = newStuff + "<td class='rowodd col1'><textarea class='factor'>Factor "+rows+"</textarea></td>";
    newStuff = newStuff + "<td class='rowodd col2'><select id='f"+rows+"weight' class='dropdown'><option value='1' selected>1</option>";
    for(var j=2;j<11;j++){
      newStuff = newStuff + "<option value='"+j+"'>"+j+"</option>"
    }
    newStuff = newStuff + "</select></td>"
    for (var i=2;i<cols;i++){
      if (i%2==0){
        newStuff=newStuff+"<td class='rowodd coleven'>";
        newStuff=newStuff+"<select id='o"+(i-1)+"f"+rows+"' class='dropdown'><option value='0'>Score</option>";
        for (k=1;k<11;k++){
          newStuff=newStuff+"<option value='"+k+"'>"+k+"</option>";
        }
        newStuff=newStuff+"</select></td>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd colodd'>";
        newStuff=newStuff+"<select id='o"+(i-1)+"f"+rows+"' class='dropdown'><option value='0'>Score</option>";
        for (k=1;k<11;k++){
          newStuff=newStuff+"<option value='"+k+"'>"+k+"</option>";
        }
        newStuff=newStuff+"</select></td>";
      }
    }
  }
  else{
    newStuff = newStuff + "<td class='roweven col1'><textarea class='factor'>Factor "+rows+"</textarea></td>";
    newStuff = newStuff + "<td class='roweven col2'><select id='f"+rows+"weight' class='dropdown'><option value='1' selected>1</option>";
    for(var j=2;j<11;j++){
      newStuff = newStuff + "<option value='"+j+"'>"+j+"</option>"
    }
    newStuff = newStuff + "</select></td>"
    for (var i=2;i<cols;i++){
      if (i%2==0){
        newStuff=newStuff+"<td class='roweven coleven'>";
        newStuff=newStuff+"<select id='o"+(i-1)+"f"+rows+"' class='dropdown'><option value='0'>Score</option>";
        for (k=1;k<11;k++){
          newStuff=newStuff+"<option value='"+k+"'>"+k+"</option>";
        }
        newStuff=newStuff+"</select></td>";
      }
      else{
        newStuff=newStuff+"<td class='roweven colodd'>";
        newStuff=newStuff+"<select id='o"+(i-1)+"f"+rows+"' class='dropdown'><option value='0'>Score</option>";
        for (k=1;k<11;k++){
          newStuff=newStuff+"<option value='"+k+"'>"+k+"</option>";
        }
        newStuff=newStuff+"</select></td>";
      }
    }
  }
  $('#myTable tr:last').after("<tr>"+newStuff+"</tr>");
}
function deleteColumn(){
  var cols = document.getElementById("myTable").rows[0].cells.length;
  if (cols>3){
    $('#myTable').find('tr').find('td:last').remove();
  }
}
function deleteRow(){
  var rows = document.getElementById("myTable").rows.length;
  if (rows>2){
    $('#myTable tr:last').remove();
  }
}
function newSchool(){
  var rows = document.getElementById("myTable").rows.length;
  var cols = document.getElementById("myTable").rows[0].cells.length;
  var newStuff = "";
  if (cols%2==1){
    $('#myTable tr:eq(0)').append("<td class='row1 coleven'><textarea id='name"+(cols-1)+"' class='option'>College "+(cols-1)+"</textarea></td>");
    for (var i=1;i<rows;i++){
      if (i%2==1){
        newStuff=newStuff+"<td class='roweven coleven'>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd coleven'>";
      }
      newStuff=newStuff+"<select id='o"+(cols-1)+"f"+i+"' class='dropdown'><option value='0'>Score</option>";
      for (var j=1;j<11;j++){
        newStuff=newStuff+"<option value='"+j+"'>"+j+"</option>";
      }
      newStuff=newStuff+"</select></td>";
      $('#myTable tr:eq('+i+')').append(newStuff);
      newStuff="";
    }
  }
  else{
    $('#myTable tr:eq(0)').append("<td class='row1 colodd'><textarea id='name"+(cols-1)+"' class='option'>College "+(cols-1)+"</textarea></td>");
    for (i=1;i<rows;i++){
      if (i%2==1){
        newStuff=newStuff+"<td class='roweven colodd'>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd colodd'>";
      }
      newStuff=newStuff+"<select id='o"+(cols-1)+"f"+i+"' class='dropdown'><option value='0'>Score</option>";
      for (j=1;j<11;j++){
        newStuff=newStuff+"<option value='"+j+"'>"+j+"</option>";
      }
      newStuff=newStuff+"</select></td>";
      $('#myTable tr:eq('+i+')').append(newStuff);
      newStuff="";
    }
  }
}
function newHouse(){
  var rows = document.getElementById("myTable").rows.length;
  var cols = document.getElementById("myTable").rows[0].cells.length;
  var newStuff = "";
  if (cols%2==1){
    $('#myTable tr:eq(0)').append("<td class='row1 coleven'><textarea id='name"+(cols-1)+"' class='option'>Home "+(cols-1)+"</textarea></td>");
    for (var i=1;i<rows;i++){
      if (i%2==1){
        newStuff=newStuff+"<td class='roweven coleven'>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd coleven'>";
      }
      newStuff=newStuff+"<select id='o"+(cols-1)+"f"+i+"' class='dropdown'><option value='0'>Score</option>";
      for (var j=1;j<11;j++){
        newStuff=newStuff+"<option value='"+j+"'>"+j+"</option>";
      }
      newStuff=newStuff+"</select></td>";
      $('#myTable tr:eq('+i+')').append(newStuff);
      newStuff="";
    }
  }
  else{
    $('#myTable tr:eq(0)').append("<td class='row1 colodd'><textarea id='name"+(cols-1)+"' class='option'>Home "+(cols-1)+"</textarea></td>");
    for (i=1;i<rows;i++){
      if (i%2==1){
        newStuff=newStuff+"<td class='roweven colodd'>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd colodd'>";
      }
      newStuff=newStuff+"<select id='o"+(cols-1)+"f"+i+"' class='dropdown'><option value='0'>Score</option>";
      for (j=1;j<11;j++){
        newStuff=newStuff+"<option value='"+j+"'>"+j+"</option>";
      }
      newStuff=newStuff+"</select></td>";
      $('#myTable tr:eq('+i+')').append(newStuff);
      newStuff="";
    }
  }
}
function newFood(){
  var rows = document.getElementById("myTable").rows.length;
  var cols = document.getElementById("myTable").rows[0].cells.length;
  var newStuff = "";
  if (cols%2==1){
    $('#myTable tr:eq(0)').append("<td class='row1 coleven'><textarea id='name"+(cols-1)+"' class='option'>Restaurant "+(cols-1)+"</textarea></td>");
    for (var i=1;i<rows;i++){
      if (i%2==1){
        newStuff=newStuff+"<td class='roweven coleven'>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd coleven'>";
      }
      newStuff=newStuff+"<select id='o"+(cols-1)+"f"+i+"' class='dropdown'><option value='0'>Score</option>";
      for (var j=1;j<11;j++){
        newStuff=newStuff+"<option value='"+j+"'>"+j+"</option>";
      }
      newStuff=newStuff+"</select></td>";
      $('#myTable tr:eq('+i+')').append(newStuff);
      newStuff="";
    }
  }
  else{
    $('#myTable tr:eq(0)').append("<td class='row1 colodd'><textarea id='name"+(cols-1)+"' class='option'>Restaurant "+(cols-1)+"</textarea></td>");
    for (i=1;i<rows;i++){
      if (i%2==1){
        newStuff=newStuff+"<td class='roweven colodd'>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd colodd'>";
      }
      newStuff=newStuff+"<select id='o"+(cols-1)+"f"+i+"' class='dropdown'><option value='0'>Score</option>";
      for (j=1;j<11;j++){
        newStuff=newStuff+"<option value='"+j+"'>"+j+"</option>";
      }
      newStuff=newStuff+"</select></td>";
      $('#myTable tr:eq('+i+')').append(newStuff);
      newStuff="";
    }
  }
}
function newOtherFactor(){
  var rows = document.getElementById("myTable").rows.length;
  var cols = document.getElementById("myTable").rows[0].cells.length;
  var newStuff = "";
  if (rows%2==0){
    newStuff = newStuff + "<td class='rowodd col1'><textarea class='factor'>Other Factor</textarea></td>";
    newStuff = newStuff + "<td class='rowodd col2'><select id='f"+rows+"weight' class='dropdown'><option value='1' selected>1</option>";
    for(var j=2;j<11;j++){
      newStuff = newStuff + "<option value='"+j+"'>"+j+"</option>"
    }
    newStuff = newStuff + "</select></td>"
    for (var i=2;i<cols;i++){
      if (i%2==0){
        newStuff=newStuff+"<td class='rowodd coleven'>";
        newStuff=newStuff+"<select id='o"+(i-1)+"f"+rows+"' class='dropdown'><option value='0'>Score</option>";
        for (k=1;k<11;k++){
          newStuff=newStuff+"<option value='"+k+"'>"+k+"</option>";
        }
        newStuff=newStuff+"</select></td>";
      }
      else{
        newStuff=newStuff+"<td class='rowodd colodd'>";
        newStuff=newStuff+"<select id='o"+(i-1)+"f"+rows+"' class='dropdown'><option value='0'>Score</option>";
        for (k=1;k<11;k++){
          newStuff=newStuff+"<option value='"+k+"'>"+k+"</option>";
        }
        newStuff=newStuff+"</select></td>";
      }
    }
  }
  else{
    newStuff = newStuff + "<td class='roweven col1'><textarea class='factor'>Other Factor</textarea></td>";
    newStuff = newStuff + "<td class='roweven col2'><select id='f"+rows+"weight' class='dropdown'><option value='1' selected>1</option>";
    for(var j=2;j<11;j++){
      newStuff = newStuff + "<option value='"+j+"'>"+j+"</option>"
    }
    newStuff = newStuff + "</select></td>"
    for (var i=2;i<cols;i++){
      if (i%2==1){
        newStuff=newStuff+"<td class='roweven coleven'>";
        newStuff=newStuff+"<select id='o"+(i-1)+"f"+rows+"' class='dropdown'><option value='0'>Score</option>";
        for (k=1;k<11;k++){
          newStuff=newStuff+"<option value='"+k+"'>"+k+"</option>";
        }
        newStuff=newStuff+"</select></td>";
      }
      else{
        newStuff=newStuff+"<td class='roweven colodd'>";
        newStuff=newStuff+"<select id='o"+(i-1)+"f"+rows+"' class='dropdown'><option value='0'>Score</option>";
        for (k=1;k<11;k++){
          newStuff=newStuff+"<option value='"+k+"'>"+k+"</option>";
        }
        newStuff=newStuff+"</select></td>";
      }
    }
  }
  $('#myTable tr:last').after("<tr>"+newStuff+"</tr>");
}
$('#decide').on('click', decide);
$('#newCol').on('click', newColumn);
$('#newSchool').on('click', newSchool);
$('#newHouse').on('click', newHouse);
$('#newRestaurant').on('click', newFood);
$('#newRow').on('click', newRow);
$('#newOther').on('click', newOtherFactor);
$('#deleteCol').on('click', deleteColumn);
$('#deleteRow').on('click', deleteRow);
/*function center_text(selector) {
  var h= $(selector).outerHeight();
  $(selector).css({   //clear current padding and height so we can use scrollHeight below
    paddingTop: 0,
    height: 0
  });

  $(selector).css({
    paddingTop: Math.max(0, h/2 - $(selector)[0].scrollHeight/2),
    height: h
  });
}
$(document).ready(function(){
  $('textarea').load(function(){center_text(this)});
  $('textarea').on('input', function(){center_text(this)});
 }
)*/
/*$('textarea').on('input', function(){
  $(this).css({
    opacity:1,
    font-style:normal,
    font-size:100;
})
});*/
