const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express();

app.use(fileUpload({
  createParentPath: true
}))
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

// try {
//   const data = fs.readFileSync('Input 1.txt', 'utf8');
//   const lines = data.split(/\r?\n/);
//   const testCaseNum = lines[0];
//   const headers = lines[1].split(',');

//   const benefitList = [];
//   const population = [];
//   const person = {};
//   headers.forEach((el) => (person[el] = ''));

//   for (let i = 2; i < lines.length; i++) {
//     const data = lines[i].split(',');
//     population.push({
//       age: parseInt(data[0]),
//       isCitizen: data[1],
//       floor: data[2],
//       unit: data[3],
//       postal: data[4],
//       income: parseInt(data[5]),
//     });
//   }


//   // const groupBy = (arr, f) => {
//   //   let groups = {};
//   //   arr.forEach((o) => {
//   //     let group = JSON.stringify(f(o));
//   //     groups[group] = groups[group] || [];
//   //     groups[group].push(o);
//   //   });

//   //   return Object.keys(groups).map((group) => {
//   //     return groups[group];
//   //   });
//   // };

//   // let result = groupBy(population, (item) => {
//   //   return [item.floor, item.unit, item.postal];
//   // });

//   // result.forEach((el) =>
//   //   el.reduce((sum, curr) => {
//   //     return sum + curr.income;
//   //   }, 0)
//   // );

//   // console.log(result);

//   // const result = [...population.reduce((r, o) => {
//   //   const key = o.floor + '-' + o.unit + '-' + o.postal

//   //   const item = r.get(key) || Object.assign({}, o, {
//   //     income: 0
//   //   })

//   //   item.income += o.income;

//   //   return r.set(key, item)
//   // }, new Map).values()]

//   // console.log(result)

//   let sum = population.reduce((a, obj)=> {
//     let i = a.findIndex(o => o.floor === obj.floor && o.unit === obj.unit && o.postal === obj.postal)
//     i == (-1) ? a.push(obj) : (a[i].income += obj.income)
//     return a
//   }, [])

//   console.log(sum)

//   for (let i = 0; i < population.length; i++) {
//     const benefit = [];

//     if (population[i].isCitizen === '1') {
//       if (population[i].age < 15) {
//         benefit.push('Children Voucher');
//       } else if (population[i].age > 60 && population[i].income <= 6000) {
//         benefit.push('Retirement Benefit');
//       } else if (
//         population[i].age >= 25 &&
//         population[i].age <= 60 &&
//         population[i].income <= 4000
//       ) {
//         benefit.push('Workplace medical care');
//       }

//       let sum = population.reduce((a, obj)=> {
//         let i = a.findIndex(o => o.floor === obj.floor && o.unit === obj.unit && o.postal === obj.postal)
//         i == (-1) ? a.push(obj) : (a[i].income += obj.income)
//         return a
//       }, [])
  
//       for (let j = 0; j < sum.length; j++){
//         if (sum[j].income <= 5000 && sum[j].age >= 15 && sum[j].age <= 25){
//           benefit.push('Student Benefit')
//         } else if (sum[j].income <= 4000 && sum[j].age >= 30 && sum[j].age <= 45) {
//           benefit.push('Unemployment Support')
//         } else if (sum[j].income <= 7000 && sum[j].age >= 45 && sum[j].age <= 60) {
//           benefit.push('Family Support')
//         }
//       }
//       // if (isFamily === true) {
//       //   if (
//       //     population[i].age >= 15 &&
//       //     population[i].age <= 25 &&
//       //     population[i].income <= 5000
//       //   ) {
//       //     benefit.push('Student Benefit');
//       //   } else if (
//       //     population[i].age >= 30 &&
//       //     population[i].age <= 45 &&
//       //     population[i].income <= 4000
//       //   ) {
//       //     benefit.push('Unemployment Support');
//       //   } else if (
//       //     population[i].age >= 45 &&
//       //     population[i].age <= 60 &&
//       //     population[i].income <= 7000
//       //   ) {
//       //     benefit.push('Family Support');
//       //   }
//       // }
//     } else if (population[i].isCitizen === '0') {
//       if (
//         population[i].age >= 25 &&
//         population[i].age <= 60 &&
//         population[i].income <= 4000
//       ) {
//         benefit.push('Workplace medical care');
//       }
//     }



//     // const family = [];
//     // for (let j = i + 1; j < population.length; j++) {
//     //   if (
//     //     population[i].postal === population[j].postal &&
//     //     population[i].unit === population[j].unit &&
//     //     population[i].floor === population[j].floor
//     //   ) {
//     //     family.push(population[i]);
//     //   }
//     // }
//     // console.log(family);
//     console.log(benefit);
//   }
// } catch (err) {
//   console.log(err);
// }

const adminData = require('./routes/admin');
const resultRoutes = require('./routes/result');
const { fileURLToPath } = require('url');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(resultRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

const port = 8080;
app.listen(port, () => {
  console.log(`App is listening on port ${port}!`)
});

module.exports = app; //for testing
