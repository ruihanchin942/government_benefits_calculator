const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const benefitList = [];

router.get('/input-details', (req, res, next) => {
  res.render('input-details', {
    pageTitle: 'Input Details',
    path: '/admin/input-details',
    formsCSS: true,
    productCSS: true,
  });
});

router.post('/benefits', (req, res, next) => {
  benefitList.length = 0;
  const lines = req.body.details.trim().split(/\r?\n/);

  const testCaseNum = parseInt(lines[0]);
  const headers = lines[1].split(',');

  const population = [];
  const person = {};
  headers.forEach((el) => (person[el] = ''));


    for (let i = 2; i < lines.length; i++) {
      const data = lines[i].split(',');
      population.push({
        age: parseInt(data[0]),
        isCitizen: data[1],
        floor: parseInt(data[2]),
        unit: parseInt(data[3]),
        postal: parseInt(data[4]),
        income: parseInt(data[5]),
      });
    }

    //   let sum = population.reduce((a, obj)=> {
    //   let i = a.findIndex(o => o.floor === obj.floor && o.unit === obj.unit && o.postal === obj.postal)
    //   i == (-1) ? a.push(obj) : (a[i].income += obj.income)
    //   return a
    // }, [])

    // console.log(sum)

    for (let i = 0; i < population.length; i++) {
      const benefit = [];

      if (population[i].isCitizen === '1') {
        if (population[i].age < 15) {
          benefit.push('Children Voucher');
        } else if (population[i].age > 60 && population[i].income <= 6000) {
          benefit.push('Retirement Benefit');
        } else if (
          population[i].age >= 25 &&
          population[i].age <= 60 &&
          population[i].income <= 4000
        ) {
          benefit.push('Workplace medical care');
        }

        // let sum = population.reduce((a, obj)=> {
        //   let i = a.findIndex(o => o.floor === obj.floor && o.unit === obj.unit && o.postal === obj.postal)
        //   i == (-1) ? a.push(obj) : (a[i].income += obj.income)
        //   return a
        // }, [])

        // for (let j = 0; j < sum.length; j++){
        //   if (sum[j].income <= 5000 && sum[j].age >= 15 && sum[j].age <= 25){
        //     benefit.push('Student Benefit')
        //   } else if (sum[j].income <= 4000 && sum[j].age >= 30 && sum[j].age <= 45) {
        //     benefit.push('Unemployment Support')
        //   } else if (sum[j].income <= 7000 && sum[j].age >= 45 && sum[j].age <= 60) {
        //     benefit.push('Family Support')
        //   }
        // }
        // if (isFamily === true) {
        //   if (
        //     population[i].age >= 15 &&
        //     population[i].age <= 25 &&
        //     population[i].income <= 5000
        //   ) {
        //     benefit.push('Student Benefit');
        //   } else if (
        //     population[i].age >= 30 &&
        //     population[i].age <= 45 &&
        //     population[i].income <= 4000
        //   ) {
        //     benefit.push('Unemployment Support');
        //   } else if (
        //     population[i].age >= 45 &&
        //     population[i].age <= 60 &&
        //     population[i].income <= 7000
        //   ) {
        //     benefit.push('Family Support');
        //   }
        // }
      } else if (population[i].isCitizen === '0') {
        if (
          population[i].age >= 25 &&
          population[i].age <= 60 &&
          population[i].income <= 4000
        ) {
          benefit.push('Workplace medical care');
        }
      }

      // const family = [];
      // for (let j = i + 1; j < population.length; j++) {
      //   if (
      //     population[i].postal === population[j].postal &&
      //     population[i].unit === population[j].unit &&
      //     population[i].floor === population[j].floor
      //   ) {
      //     family.push(population[i]);
      //   }
      // }
      // console.log(family);
      //console.log(benefit);
      benefitList.push(benefit);
    }

  //console.log(benefitList);
  //details.push({detail: req.body.details });
  res.redirect('/');
});

exports.routes = router;
exports.benefitList = benefitList;
