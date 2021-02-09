( function ( $ ) {
    "use strict";

var qtr_array = [];
var cnt_array = [];
    // Counter Number
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
$.ajax({
		url:'api/ins_grade_graph/'+emp_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			   var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 qtr_array[i] = json_mth.grade;
		     cnt_array[i] = json_mth.grade_count;
			 }
			
			

     var ctx = document.getElementById( "gradeWidget" );
    ctx.height = 140;
    var myChart = new Chart( ctx, {
        type: 'bar',
        data: {
            labels: qtr_array,
            datasets: [
                {
                    label: "Grade Count",
                    data: cnt_array,
                    borderColor: "rgba(255, 165, 50, 0.9)",
                    //borderWidth: "0",
                    backgroundColor: "rgba(255,165,0,0.9)"
					
                }
            ]
        },
        options: {
              maintainAspectRatio: true,
              legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                  display: true,
                  categoryPercentage: 1,
                  barPercentage: 0.5
                }],
                yAxes: [ {
                    display: true
                } ]
            }
        }
    } );
			//localStorage.setItem("vOneLocalStorage", JSON.stringify(json_mth.mth_name)); 
		}
	});
    //gradeWidget
	

    



} )( jQuery );
