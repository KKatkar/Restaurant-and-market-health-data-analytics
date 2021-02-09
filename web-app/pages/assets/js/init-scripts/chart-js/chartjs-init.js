( function ( $ ) {
    "use strict";

var f_array = [];
var cnt_array = [];
var backcolor = [];
var hoverbackcolor = [];
$.ajax({
		url:'api/owner_pie_violations/'+o_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			   var json_mth
			 
			 var i;
			 var j=0;
			 var k=120;
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 f_array[i] = json_mth.f_name;
		     cnt_array[i] = json_mth.v_cnt;
			 j=j+0.1;
			 k=k+5;
			 backcolor[i] = "rgba(0, "+k+", 255,"+j+")";
			 hoverbackcolor[i] = "rgba(0, 255, 255,100)";
			 }

    

   

    //pie chart
    var ctx = document.getElementById( "pieChart" );
    ctx.height = 150;
    var myChart = new Chart( ctx, {
        type: 'pie',
        data: {
            datasets: [ {
                data: cnt_array,
                backgroundColor: backcolor,
                hoverBackgroundColor: hoverbackcolor

                            } ],
            labels: f_array
        },
        options: {
            responsive: true,
			legend: {
                display: false
            },
        }
    } );

}
	});
   
    



} )( jQuery );