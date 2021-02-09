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
		url:'api/facility_rank_graph/'+f_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			   var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 qtr_array[i] = json_mth.sem;
		     cnt_array[i] = json_mth.rank;
			 }
			
			
			var ctx = document.getElementById( "widgetChart2" );
	//var vOneLS = localStorage.getItem("vOneLocalStorage ");  
	//var variableTwo = json_july; 
    
    ctx.height = 100;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            
			labels : qtr_array,
            type: 'line',
            datasets: [ {
                data: cnt_array,
                label: 'Rank',
                backgroundColor: '#63c2de',
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
					reversed:true,
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
    //WidgetChart 1
	

    



} )( jQuery );
