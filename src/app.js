const path = require('path')
const express = require('express')
const hbs = require('hbs')                                                                      //Templating engine
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bunty'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bunty'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Bunty'
    })
})

app.get('/weather', (req, res) => {
    //console.log(req.query)
    if (req.query.address === ''){
        return res.send({
            error: 'Address is required'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error: error})
        }
        //console.log(latitude, longitude)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error: error})
            }
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (req.query.search === undefined){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search) 
    res.send({
        forecast: "It's foggy",
        location: "Jammu"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: "Bunty"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Bunty'
    })
})

app.listen(port, () => {
    console.log('Server is up on port port.')
})