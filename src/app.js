const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const airvisual = require('./utils/airvisual')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))


const { response } = require('express')

const app = express()
// For Heroku deployment
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// to change default hbs directory from views (which express expects) to templates
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)  //this is only required if the views directory is named something else
hbs.registerPartials(partialsPath) 

// Setup static directory for assets
app.use(express.static(publicDirectoryPath))
// using an alias to fix issue with use of static files from subdirectories
// use static before images, styles, javascript in headers or other files that could be used
// at different levels/ in different subdirectories, instead of just the root
// https://www.tutorialspoint.com/expressjs/expressjs_static_files.htm
app.use('/static', express.static(publicDirectoryPath));


// assume ownership of app.com domain.  the following are just routes on the same express server
// app.com
// app.com/help
// app.com/about

const navlinks = '<ul><li><a href="/">Home</a></li><li><a href="/weather">Weather</a></li><li><a href="/about">About</a></li><li><a href="/help">Help</a></li><li><a href="/json">JSON</a></li></ul>'

// route setup
app.get('', (req, res) => {
    const context = {
        title: 'Weather Application',
        pageHeader: "Weather",
        body: "Enter a search location to retrieve weather.",
        name: "Charles Steele",
        pageJSLink: "/static/js/app.js"
    }
    res.render('index', context)
})

app.get('/help', (req, res) => {
    const context = {
        title: 'Weather Application',
        pageHeader: "Help!",
        helpMessage: "You don't really need help... that would be pathetic.",
        name: "Charles Steele",
        pageJSLink: "/static/js/blank.js"
    }
    res.render('help', context)
})

app.get('/about', (req, res) => {
    const context = {
        title: 'Weather Application',
        pageHeader: "About!",
        body: "I've got 99 problems and node ain't one.",
        name: "Charles Steele",
        profileImage: "passportphoto.jpg",
        pageJSLink: "/static/js/blank.js"
    }
    res.render('about', context)
})

// app.get('/help', (req, res) => {
//     res.send('<h1>Help Page</h1>'+navlinks)
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About Page</h1>'+navlinks)
// })

app.get('/weather', (req, res) => {
    //res.send('<h1>Show Weather</h1>'+navlinks)
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })  // use return to prevent the Cannot set headers after they are sent to the client ERROR
    }

    // This is to minimize refactoring of code leveraged from original weather-app
    search_address = req.query.address

    geocode.geocode(search_address, (error, {location, longitude, latitude} = {}) => {
        if (error) {
            return res.send({ error })
        }
        let full_weather_message = ''
        forecast(longitude, latitude, (error, { weather_message }) => {
            if (error) {
                return res.send({ error })
            } 
            //full_weather_message = weather_message
            airvisual(longitude, latitude, (error, { air_quality_message }) => {
                if (error) {
                    return res.send({ error })
                } 
                //full_weather_message = full_weather_message +'<br>'+ air_quality_message
                
                res.send({
                    address: search_address,
                    location,
                    weather: weather_message,
                    air_quality: air_quality_message
                }) 
            }) 
            
        }) 
    
    })

})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })  // use return to prevent the Cannot set headers after they are sent to the client ERROR
    }


    res.send({
        products: []
    })
})

app.get('/json', (req, res) => {
    res.send([{
        name: 'Charles',
        age: 57,
        location: 'Mammoth Lakes, CA'
    },
    {
        name: 'Jennie',
        age: 47,
        location: 'Mammoth Lakes, CA'
    }])
})

//404 calls after this point
app.get('/help/*', (req, res) => {
    //res.send('<h1>Help article not found (placeholder)</h1>')
    const context = {
        title: 'Weather Application',
        pageHeader: "Weather App",
        missingPageMessage: "The help article you were looking for was not found.  Please try again.",
        name: "Charles Steele"
    }
    res.render('pagenotfound', context)
})

app.get('*', (req, res) => {
    //res.send('<h1>My 404 page (placeholder)</h1>')
    const context = {
        title: 'Weather Application',
        pageHeader: "Weather App",
        missingPageMessage: "The page you were looking for was not found.  Please try again.",
        name: "Charles Steele"
    }
    res.render('pagenotfound', context)
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})