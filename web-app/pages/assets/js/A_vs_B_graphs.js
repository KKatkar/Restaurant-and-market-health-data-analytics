( function ( $ ) {
    "use strict";


// const brandPrimary = '#20a8d8'
const brandSuccess = '#4dbd74'
const brandInfo = '#63c2de'
const brandDanger = '#f86c6b'

function convertHex (hex, opacity) {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
  return result
}

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
var qtr_array = [];
var own_avg_array = [];
var all_own_avg_array = [];


$(document).ready(function(){
	
	
	if(document.getElementById('option1').checked) {
	$.ajax({
	

		url:'api/owner_main_avg_graph/'+emp_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			
			  var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 qtr_array[i] = json_mth.qtr;
		     own_avg_array[i] = json_mth.own_avg;
			 all_own_avg_array[i] = json_mth.all_avg;
			 }
			
			
    //Traffic Chart
    var ctx = document.getElementById( "trafficChart" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: qtr_array,
            datasets: [
            {
              label: 'Score of each Facility : Self',
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: own_avg_array
          },
          {
              label: 'Score of each Facility : Competitors',
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: all_own_avg_array
          },
          
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: true
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: false,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(50 / 5),
                        max: 100,
						min: 50
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );
			
		}
});
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    $('input[name=options]').on('change', function(){
    var n = $(this).val();
    switch(n)
    {
		case 'option1':
$.ajax({
	

		url:'api/owner_main_avg_graph/'+emp_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			
			  var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 qtr_array[i] = json_mth.qtr;
		     own_avg_array[i] = json_mth.own_avg;
			 all_own_avg_array[i] = json_mth.all_avg;
			 }
			
			
    //Traffic Chart
    var ctx = document.getElementById( "trafficChart" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: qtr_array,
            datasets: [
            {
              label: 'Score of each Facility : Self',
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: own_avg_array
          },
          {
              label: 'Score of each Facility : Competitors',
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: all_own_avg_array
          },
          
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: true
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: false,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(50 / 5),
                        max: 100,
						min: 50
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );
			
		}
});
break;


case 'option3':
$.ajax({
	

		url:'api/owner_main_avg_graph/'+emp_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			
			  var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 qtr_array[i] = json_mth.qtr;
		     own_avg_array[i] = json_mth.own_avg;
			 all_own_avg_array[i] = json_mth.all_avg;
			 }
			
			
    //Traffic Chart
    var ctx = document.getElementById( "trafficChart" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: qtr_array,
            datasets: [
            {
              label: 'Self',
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: own_avg_array
          },
          {
              label: 'Other Owners',
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: all_own_avg_array
          },
          
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: true
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: false,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(50 / 5),
                        max: 100,
						min: 50
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );
			
		}
});
break;


case 'option2':
$.ajax({
	

		url:'api/owner_main_violation_graph/'+emp_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			
			  var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 qtr_array[i] = json_mth.qtr;
		     own_avg_array[i] = json_mth.own_avg;
			 all_own_avg_array[i] = json_mth.all_avg;
			 }
			
			
    //Traffic Chart
    var ctx = document.getElementById( "trafficChart" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: qtr_array,
            datasets: [
            {
              label: 'Violations at each Facility : Self',
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: own_avg_array
          },
          {
              label: 'Violations at each Facility : Competitors',
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: all_own_avg_array
          },
          
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: true
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: false,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(20 / 5),
                        max: 20,
						min: 0
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );
			
		}
});
break;

default:
$.ajax({
	

		url:'api/owner_main_avg_graph/'+emp_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			
			  var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 qtr_array[i] = json_mth.qtr;
		     own_avg_array[i] = json_mth.own_avg;
			 all_own_avg_array[i] = json_mth.all_avg;
			 }
			
			
    //Traffic Chart
    var ctx = document.getElementById( "trafficChart" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: qtr_array,
            datasets: [
            {
              label: 'Self',
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: own_avg_array
          },
          {
              label: 'Other Owners',
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: all_own_avg_array
          },
          
          ]
        },
        options: {
            //   maintainAspectRatio: true,
            //   legend: {
            //     display: false
            // },
            // scales: {
            //     xAxes: [{
            //       display: false,
            //       categoryPercentage: 1,
            //       barPercentage: 0.5
            //     }],
            //     yAxes: [ {
            //         display: false
            //     } ]
            // }


            maintainAspectRatio: true,
            legend: {
                display: true
            },
            responsive: true,
            scales: {
                xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }],
                yAxes: [ {
                      ticks: {
                        beginAtZero: false,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(50 / 5),
                        max: 100,
						min: 50
                      },
                      gridLines: {
                        display: true
                      }
                } ]
            },
            elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3
              }
          }


        }
    } );
			
		}
});



	}
 });
});
} )( jQuery );