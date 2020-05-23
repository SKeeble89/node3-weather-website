const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup a static directory to serve (images, css etc)
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Stuart Keeble'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Stuart Keeble'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpItem: 'When you need a solution, contact IoT industries',
        title: 'Help',
        name: 'Stuart Keeble'
    })
})
app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    console.log(req.query.address)

    const userLocation = req.query.address

    geocode(userLocation, (error, {latitude, longitude, location}={}) => {

        if (error) {
            return res.send({
                error: error

            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address

            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render({
        title: '404',
        name: 'Stuart Keeble',
        errMsg: '404 Error - Page not found'
    })
})

app.get('*', (req, res) => {
    res.render({

        title: '404',
        name: 'Stuart Keeble',
        errMsg: '404 Error - Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})