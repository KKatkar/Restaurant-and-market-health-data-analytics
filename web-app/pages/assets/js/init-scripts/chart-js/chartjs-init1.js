( function ( $ ) {
    "use strict";

var f_array = [];
var cnt_array = [];
var backcolor = [];
var hoverbackcolor = [];
$.ajax({
		url:'api/inspector_pie/'+emp_id+'/',
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
			 f_array[i] = json_mth.v_desc;
		     cnt_array[i] = json_mth.f_cnt;
			 j=j+0.1;
			 k=k+1;
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
	//end graph


var cnt_array1 = [];
var cnt_array2 = [];

$.ajax({
		url:'api/facility_vs_risk/'+emp_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			 var json_mth
			 var i;
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));	
			 if (i % 2 == 0)
			{
			cnt_array1[i/2] = json_mth.COUNT; //food market
			}
			else
			{
		     cnt_array2[(i-1)/2] = json_mth.COUNT; //restaurant
			}
			 }
			 
	//bar chart
    var ctx = document.getElementById( "barChart" );
    //    ctx.height = 1000;
    var myChart = new Chart( ctx, {
        type: 'bar',
        data: {
            labels: [ "HIGH RISK", "LOW RISK", "MODERATE RISK" ],
            datasets: [
                {
                    label: "FOOD MKT RETAIL",
                    data: cnt_array1,
                    borderColor: "rgba(0, 123, 255, 0.9)",
                    borderWidth: "0",
                    backgroundColor: "rgba(0, 123, 255, 0.5)"
                            },
                {
                    label: "RESTAURANT",
                    data: cnt_array2,
                    borderColor: "rgba(0,0,0,0.09)",
                    borderWidth: "0",
                    backgroundColor: "rgba(0,0,0,0.07)"
                            }
                        ]
        },
        options: {
            scales: {
                yAxes: [ {
                    ticks: {
                        beginAtZero: true
                    }
                                } ]
            }
        }
    } );
	}
	});
	//end graph
   
    



} )( jQuery );