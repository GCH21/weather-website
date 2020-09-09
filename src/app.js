const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast =require('./utils/forecast.js')
// const address = process.argv[2]

const app = express()
const port=process.env.PORT || 3000

//Define paths for Express config
const publicDirectorPath= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//  Setup handlebars engine and views path
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectorPath))

app.get('',(req,res)=>{ 
    res.render('index',{
        title:'Weather App',
        name: 'Geetha'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:' Geetha',
        aboutText:'Weather App'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'Lets us know your location to get the forecast',
        name: 'Geetha'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide location'
        })
   }
        geocode(req.query.address,(error,{longitute,latitude,location}={})=>{
            if(error){
                return res.send(error)
            }
            
            forecast (longitute, latitute, (error, forecastdata)=>{
                if(error){
                    return res.send(error)
                }
                res.send([{
                    forecast: forecastdata,
                    location : location,
                    address: req.query.address
                }])
               
            })
        })
    
    
})
app.get('/products',(req,res)=>{
if (!req.query.search){
   return res.send({
       error: 'You must provide a search term'
   })
}
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
res.render('404',{
    title: '404',
    name:'Geetha',
    errorMessage: 'Help article not found'

})
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name:'Geetha',
        errorMessage: 'Page not found'
    })

})

app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})
