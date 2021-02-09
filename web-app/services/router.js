const express = require('express');

const router = new express.Router();

//Add variables for changes

const top_5_restaurant_table = require('../controllers/top_5_restaurant_table.js');

const inpected_prop = require('../controllers/inpected_prop.js');

const inspector_pie = require('../controllers/inspector_pie.js');

const total_ins = require('../controllers/total_ins.js');

const avg_ins = require('../controllers/avg_ins.js');

const avg_others_ins = require('../controllers/avg_others_ins.js');

const avg_others_scr_ins = require('../controllers/avg_others_scr_ins.js');

const ins_total_graph = require('../controllers/ins_total_graph.js');

const ins_count_graph = require('../controllers/ins_count_graph.js');

const ins_other_count_graph = require('../controllers/ins_other_count_graph.js');

const ins_other_total_graph = require('../controllers/ins_other_total_graph.js');

const ins_grade_graph = require('../controllers/ins_grade_graph.js');

const risk_vs_score = require('../controllers/risk_vs_score.js'); //new traffic chart by nt

const seats_vs_violations = require('../controllers/seats_vs_violations.js'); //new traffic chart by nt

const facility_vs_risk = require('../controllers/facility_vs_risk.js'); //new bar chart by nt

//santosh
const owners = require('../controllers/owners.js');
const avg_owner_score_graph = require('../controllers/avg_owner_score_graph.js');
const avg_owner_violation_graph = require('../controllers/avg_owner_violation_graph.js');
const avg_owner_violation = require('../controllers/avg_owner_violation.js');
const owner_critical_violation = require('../controllers/owner_critical_violation.js');
const owner_critical_violation_graph = require('../controllers/owner_critical_violation_graph.js'); 
const owner_rank = require('../controllers/owner_rank.js'); 
const owner_rank_graph = require('../controllers/owner_rank_graph.js'); 
const owner_attr = require('../controllers/owner_attr.js'); 
const owner_facility_list = require('../controllers/owner_facility_list.js'); 
const owner_total_inspections = require('../controllers/owner_total_inspections.js'); 
const owner_main_violation_graph = require('../controllers/owner_main_violation_graph.js'); 
const owner_main_avg_graph = require('../controllers/owner_main_avg_graph.js'); 
const owner_pie_violations = require('../controllers/owner_pie_violations.js'); 
const facility_score = require('../controllers/facility_score.js'); 
const facility_score_graph = require('../controllers/facility_score_graph.js'); 
const facility_rank = require('../controllers/facility_rank.js'); 
const facility_rank_graph = require('../controllers/facility_rank_graph.js');
const facility_total_violations_graph = require('../controllers/facility_total_violations_graph.js');
const facility_total_violations = require('../controllers/facility_total_violations.js');
const facility_critical_violation = require('../controllers/facility_critical_violation.js');
const facility_crt_violation = require('../controllers/facility_crt_violation.js');
const facility_violation_list = require('../controllers/facility_violation_list.js');
const facility_attr = require('../controllers/facility_attr.js');
const facility_total_inspections = require('../controllers/facility_total_inspections.js');
const facility_main_avg_graph = require('../controllers/facility_main_avg_graph.js'); 
const facility_main_violation_graph = require('../controllers/facility_main_violation_graph.js'); 
const facility_violation_frequency = require('../controllers/facility_violation_frequency.js'); 

//avanti
const customer_top_restaurants = require('../controllers/customer_top_restaurants.js');
const customer_top_markets = require('../controllers/customer_top_markets.js');
const customer_top_neighbourhoods = require('../controllers/customer_top_neighbourhoods.js');
const customer_nb_details = require('../controllers/customer_nb_details.js');


//Make Changes 

router.route('/top_5_restaurant_table/:emp_id?').get(top_5_restaurant_table.get); //new by nt
 
router.route('/inpected_prop/:emp_id?').get(inpected_prop.get); //new lect pannel by nt
  
router.route('/inspector_pie/:emp_id?').get(inspector_pie.get); //new pie chart by nt
 
router.route('/total_ins/:emp_id?').get(total_ins.get);

router.route('/avg_ins/:emp_id?').get(avg_ins.get);
 
router.route('/avg_others_ins/:emp_id?').get(avg_others_ins.get);

router.route('/avg_others_scr_ins/:emp_id?').get(avg_others_scr_ins.get);

router.route('/ins_total_graph/:emp_id?').get(ins_total_graph.get);

router.route('/ins_count_graph/:emp_id?').get(ins_count_graph.get);

router.route('/ins_other_count_graph/:emp_id?').get(ins_other_count_graph.get);  

router.route('/ins_other_total_graph/:emp_id?').get(ins_other_total_graph.get); 

router.route('/ins_grade_graph/:emp_id?').get(ins_grade_graph.get);

router.route('/risk_vs_score/:emp_id?').get(risk_vs_score.get); //new traffic chart by nt

router.route('/seats_vs_violations/:emp_id?').get(seats_vs_violations.get); //new traffic chart by nt

router.route('/facility_vs_risk/:emp_id?').get(facility_vs_risk.get); //new bar chart by nt

router.route('/customer_top_restaurants').get(customer_top_restaurants.get);

router.route('/customer_top_markets').get(customer_top_markets.get);

router.route('/customer_top_neighbourhoods').get(customer_top_neighbourhoods.get);

router.route('/customer_nb_details/:nb_id?').get(customer_nb_details.get);

router.route('/owner_attr/:o_id?').get(owner_attr.get);
  
router.route('/facility_violation_frequency/:f_id?').get(facility_violation_frequency.get);
  
router.route('/facility_main_violation_graph/:f_id?').get(facility_main_violation_graph.get);
  
router.route('/facility_main_avg_graph/:f_id?').get(facility_main_avg_graph.get);
    
router.route('/facility_total_violations_graph/:f_id?').get(facility_total_violations_graph.get);
      
router.route('/facility_total_inspections/:f_id?').get(facility_total_inspections.get);
    
router.route('/facility_score_graph/:f_id?').get(facility_score_graph.get);
  
router.route('/facility_attr/:f_id?').get(facility_attr.get);
  
router.route('/facility_violation_list/:f_id?').get(facility_violation_list.get);
  
router.route('/facility_crt_violation/:f_id?').get(facility_crt_violation.get);
  
router.route('/facility_critical_violation/:f_id?').get(facility_critical_violation.get);
  
router.route('/facility_total_violations/:f_id?').get(facility_total_violations.get);
  
router.route('/facility_total_violations/:f_id?').get(facility_total_violations.get);
  
router.route('/facility_rank_graph/:f_id?').get(facility_rank_graph.get);
  
router.route('/facility_rank/:f_id?').get(facility_rank.get);
  
router.route('/facility_score/:f_id?').get(facility_score.get);

router.route('/owners/:o_id?').get(owners.get);

router.route('/avg_owner_score_graph/:o_id?').get(avg_owner_score_graph.get);

router.route('/avg_owner_violation/:o_id?').get(avg_owner_violation.get);

router.route('/avg_owner_violation_graph/:o_id?').get(avg_owner_violation_graph.get);

router.route('/owner_critical_violation/:o_id?').get(owner_critical_violation.get);

router.route('/owner_critical_violation_graph/:o_id?').get(owner_critical_violation_graph.get);

router.route('/owner_rank/:o_id?').get(owner_rank.get);

router.route('/owner_rank_graph/:o_id?').get(owner_rank_graph.get);

router.route('/owner_facility_list/:o_id?').get(owner_facility_list.get);

router.route('/owner_total_inspections/:o_id?').get(owner_total_inspections.get);

router.route('/owner_main_avg_graph/:o_id?').get(owner_main_avg_graph.get);

router.route('/owner_main_violation_graph/:o_id?').get(owner_main_violation_graph.get);

router.route('/owner_pie_violations/:o_id?').get(owner_pie_violations.get); 
 
 
 //End Changes
module.exports = router;