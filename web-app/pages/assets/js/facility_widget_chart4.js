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
		url:'api/owner_critical_violation_graph/'+o_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			   var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 qtr_array[i] = json_mth.qtr;
		     cnt_array[i] = json_mth.crt_cnt;
			 }
			
			

     var ctx = document.getElementById( "widgetChart4" );
    ctx.height = 100;
    var myChart = new Chart( ctx, {
        type: 'bar',
        data: {
            labels: qtr_array,
            datasets: [
                {
                    label: "Violations",
                    data: cnt_array,
                    borderColor: "rgba(0, 123, 255, 0.9)",
                    //borderWidth: "0",
                    backgroundColor: "rgba(255,255,255,.3)"
					
                }
            ]
        },
        options: {
              maintainAspectRatio: true,
              legend: {
                display: false
            },
            scales: {
                xAxes: [{
                  display: false,
                  categoryPercentage: 1,
                  barPercentage: 0.5
                }],
                yAxes: [ {
                    display: false
                } ]
            }
        }
    } );
			//localStorage.setItem("vOneLocalStorage", JSON.stringify(json_mth.mth_name)); 
		}
	});
    //WidgetChart 1
	

    



} )( jQuery );
