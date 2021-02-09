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

const risk_vs_score = require('../controllers/risk_vs_score.js');

const seats_vs_violations = require('../controllers/seats_vs_violations.js');

const facility_vs_risk = require('../controllers/facility_vs_risk.js');

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

router.route('/risk_vs_score/:emp_id?').get(risk_vs_score.get);

router.route('/seats_vs_violations/:emp_id?').get(seats_vs_violations.get);

router.route('/facility_vs_risk/:emp_id?').get(facility_vs_risk.get);
 
 //End Changes
module.exports = router;