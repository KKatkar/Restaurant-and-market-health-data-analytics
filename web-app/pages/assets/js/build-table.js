$(document).ready(function(){
	$.ajax({
		url:'api/top_5_restaurant_table/'+emp_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			var json_mth;
			var i;
			var mountains = data;  
			for(i = 0; i < data.length; i++)
			{
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			}
			let table = document.querySelector("table");
			generateTable(table, mountains); // generate the table first
		}
	});
});


function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

