const request = require ("request")
const forecast=(cordinates,callback) =>{
    const weatherUrl="http://api.weatherstack.com/current?access_key=61771b97f60b767a9f09851ec2f0631d&query="+cordinates+"&units=m"

    request({url:weatherUrl,json:true},(error,response) =>{
        if(error){
            const error={
                error:"Unable to find forecast, Please try again!.."
            }
            const data="undefined"
            callback(error,data)
        }else if(!response.body.location){
            const error={
                error:"Invalid location, Please try again with valid location!"
            }
            const data="undefined"
            callback(error,data)
        }else{
            const error="undefined"
            const data={
                location:response.body.location.name +", "+ response.body.location.region+", "+ response.body.location.country,
                temperature:response.body.current.temperature,
                feelslike:response.body.current.feelslike,
                humidity:response.body.current.humidity,
                wind_speed:response.body.current.wind_speed,
                rainProbability:response.body.current.weather_descriptions[0]
            }
            callback(error,data)
        }

    })
}

module.exports=forecast