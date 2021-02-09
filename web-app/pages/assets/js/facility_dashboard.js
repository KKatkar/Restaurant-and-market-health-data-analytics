( function ( $ ) {
    "use strict";


 const brandPrimary = '#20a8d8'
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


var sem1_array = [];
var sem_array=[];
var facility_score_array=[];
var own_facility_score_array = [];
var comp_facility_score_array=[];
var facility_violation_array=[];
var own_facility_violation_array=[];
var comp_facility_violation_array=[];
var own_avg_array = [];
var all_own_avg_array = [];
var all_self_avg_array = [];

$(document).ready(function(){
	
	
	if(document.getElementById('option1').checked) {
	$.ajax({
	

		url:'api/facility_main_avg_graph/'+f_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			
			 var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 sem_array[i] = json_mth.sem;
			 if(json_mth.self_avg=="0")
			 {
				 var val=null;
			 }
			 else
			 {
				 var val = json_mth.self_avg;
			 }
		     facility_score_array[i] = val;
			 comp_facility_score_array[i] = json_mth.all_comp_avg;
			 own_facility_score_array[i] = json_mth.all_self_avg;
			 }
			
			
    //Traffic Chart
    var ctx = document.getElementById( "facility_chart" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: sem_array,
            datasets: [
            {
              label: 'Score of Facility',
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 5,
				pointBackgroundColor:brandInfo,
              data: facility_score_array
          },
          {
              label: 'Score of Competitor Facilities',
              backgroundColor: 'transparent',
              borderColor: '#FF5733',
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:'#FF5733',
              data: comp_facility_score_array
          },
		  {
              label: 'Score of Other Facilities owned by Owner',
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:brandSuccess,
              data: own_facility_score_array
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
						min: 60
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
	

		url:'api/facility_main_avg_graph/'+f_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			
			//Traffic Chart
    var ctx = document.getElementById( "facility_chart" );
    //ctx.height = 200;
     var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: sem_array,
            datasets: [
            {
              label: 'Score of Facility',
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 5,
				pointBackgroundColor:brandInfo,
              data: facility_score_array
          },
          {
              label: 'Score of Competitor Facilities',
              backgroundColor: 'transparent',
              borderColor: '#FF5733',
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:'#FF5733',
              data: comp_facility_score_array
          },
		  {
              label: 'Score of Other Facilities owned by Owner',
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:brandSuccess,
              data: own_facility_score_array
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
						min: 60
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
	

		url:'api/owner_main_avg_graph/'+o_id+'/',
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
	

		url:'api/facility_main_violation_graph/'+f_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			
			  var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 if(json_mth.self_avg=="0")
			 {
				 var val1=null;
			 }
			 else
			 {
				 var val1 = json_mth.self_avg;
			 }
			 sem1_array[i] = json_mth.sem;
		     facility_violation_array[i] = val1;
			 comp_facility_violation_array[i] = json_mth.all_comp_avg;
			 own_facility_violation_array[i]=json_mth.all_self_avg;
			 }
			
			
    //Traffic Chart
    var ctx = document.getElementById( "facility_chart" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: sem1_array,
           datasets: [
            {
              label: 'Violations at Facility',
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:brandInfo,
              data: facility_violation_array
          },
          {
              label: 'Violations at Competitor facilities',
              backgroundColor: 'transparent',
              borderColor: '#FF5733',
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:'#FF5733',
              data: comp_facility_violation_array
          },
		  {
              label: 'Violations at other Facilities owned by Owner',
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:brandSuccess,
              data: own_facility_violation_array
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
	

		url:'api/facility_main_avg_graph/'+f_id+'/',
		type:'GET',
		dataType:'json',
		success:(data) => {
			
			 var json_mth
			 
			 var i;
			
			 for(i = 0; i < data.length; i++)
			 {
			 json_mth = JSON.parse(JSON.stringify(data[i]));
			 sem_array[i] = json_mth.sem;
			 if(json_mth.self_avg=="0")
			 {
				 var val=null;
			 }
			 else
			 {
				 var val = json_mth.self_avg;
			 }
		     facility_score_array[i] = val;
			 comp_facility_score_array[i] = json_mth.all_comp_avg;
			 own_facility_score_array[i] = json_mth.all_self_avg;
			 }
			
			
    //Traffic Chart
    var ctx = document.getElementById( "facility_chart" );
    //ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: sem_array,
            datasets: [
            {
              label: 'Score of Facility',
              backgroundColor: convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:brandInfo,
              data: facility_score_array
          },
          {
              label: 'Score of Competitor Facilities',
              backgroundColor: 'transparent',
              borderColor: '#FF5733',
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:'#FF5733',
              data: comp_facility_score_array
          },
		  {
              label: 'Score of Other Facilities owned by Owner',
              backgroundColor: 'transparent',
              borderColor: brandSuccess,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
			   pointStyle: 'circle',
                pointRadius: 2,
				pointBackgroundColor:brandSuccess,
              data: own_facility_score_array
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
						min: 60
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