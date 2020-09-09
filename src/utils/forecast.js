const request = require ('request')

const forecast = (longitute, latitute,callback)=>{

    const url ='https://api.darksky.com/forecast?key'+longitute +latitute

request({url, json : true}, (error, {body})=>{
    if (error){
      callback('Unable to connect the Weather Service',undefined)
    }else if(body.error){
        callback('Unable to find the location',undefined)
    }
    else{
         callback(undefined,body.daily.data[0].summary + 'It is currently '+ body.currently.temperature + 'degrees ouy.There is a ' + body.currently.precipProbability+ '% chance of rain. Temperature is high.') 
        
    }
})

}

module.exports = forecast