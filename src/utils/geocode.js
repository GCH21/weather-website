const request = require ('request')

const geocode=(address, callback)=>{
    const geourl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ2VldGhhY2hyIiwiYSI6ImNrZWR6eXMyMTB3emszMW10bXBvMDFjNTkifQ._veLG5E877EI7pZuAuFtNg'
    request({url:geourl, json : true}, (error,{body} )=>{
        if (error){
          callback('Unable to connect to location Services',undefined)
        }else if(body.features.length ===0){
           callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,{
              latitude :body.features[0].center[0],
              longitude:body.features[0].center[1],
            location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

