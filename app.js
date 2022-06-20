const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

try {
  const data = fs.readFileSync('Input 1.txt', 'utf8');
  const lines = data.split(/\r?\n/);
  const testCaseNum = lines[0];
  const headers = lines[1].split(',');

  const benefitList = [];
  const population = [];
  const person = {};
  headers.forEach((el) => (person[el] = ''));

  for (let i = 2; i < lines.length; i++) {
    const data = lines[i].split(',');
    population.push({
      age: parseInt(data[0]),
      isCitizen: data[1],
      floor: data[2],
      unit: data[3],
      postal: data[4],
      income: parseInt(data[5]),
    });
  }

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

    const family = [];
    for (let j = i + 1; j < population.length; j++) {
      if (
        population[i].postal === population[j].postal &&
        population[i].unit === population[j].unit &&
        population[i].floor === population[j].floor
      ) {
        family.push(population[i]);
      }
    }
    console.log(family);
    //console.log(benefit);
  }
} catch (err) {
  console.log(err);
}

const adminData = require('./routes/admin');
const resultRoutes = require('./routes/result');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(resultRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(8080);
