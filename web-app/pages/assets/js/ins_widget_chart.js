( function ( $ ) {
    "use strict";
// Create array

var mth_array = [];
var score_array = [];
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
		url:'api/ins_count_graph/'+emp_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			   var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 mth_array[i] = json_mth.mth_name;
		     score_array[i] = json_mth.avg_inspections;
			 }
		
			
			var ctx = document.getElementById( "insWidgetChart" );
	//var vOneLS = localStorage.getItem("vOneLocalStorage ");  
	//var variableTwo = json_july; 
    
    ctx.height = 100;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            
			labels : mth_array,
            type: 'line',
            datasets: [ {
                data: score_array,
                label: 'Inspections',
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
            }, ]
        },
        options: {

            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [ {
                    gridLines: {
                        color: 'transparent',
                        zeroLineColor: 'transparent'
                    },
                    ticks: {
                        fontSize: 1,
                        fontColor: 'transparent'
                    }
                } ],
                yAxes: [ {
                    display:false,
                    ticks: {
                        display: false,
                    }
                } ]
            },
            title: {
                display: false,
            },
            elements: {
                line: {
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    } );
			
			//localStorage.setItem("vOneLocalStorage", JSON.stringify(json_mth.mth_name)); 
		}
	});
    //WidgetChart 
	

    



} )( jQuery );
