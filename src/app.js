import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express'
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import weather from './utils/weather.js'


const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const patialPath = path.join(__dirname, '../templates/patials')

app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(patialPath)

app.use(express.static(publicDirectory))  //express.static will map fillename with the url (auto gen route as a filename)
                                          // just see in the publicDirectory   

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Thana',
    age: 27,
    title: 'Main Page'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Thana',
    title: 'About Page'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    name: 'Thana',
    title: 'Help Page'
  })
})


app.get('/weather', (req, res) => {
    
    if(!req.query.address){
      return res.status(404).send('Please provide the address!')
    }

    const address = req.query.address
    geocode(address, (error, {lati,lonti, place_name} = {})=> {
      if(error){
        return res.status(404).send({
          errMsg: error
        })
      }
      weather({lati, lonti},(error, {weather_desc,location_name, location_country, location_temp}) => {
        return res.send({
          location: location_name,
          country: location_country,
          weather: weather_desc,
          forcast: location_temp + ' c'
        })
      })
    })


})

app.get('/help/*', (req, res)=> {   //Math anything start with /help/
  res.render('404', {
    errMsg: 'Help article not found',
    title: '404 Page'
  })
})

app.get('*', (req, res)=> {   //Math anything were not math on above
  res.render('404', {
    errMsg: 'Page Not Found',
    name: 'Thana',
    title: '404 Page'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})