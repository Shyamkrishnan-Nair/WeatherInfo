const request = require ("request")
const geolocation=(location,callback) =>{
    const geoUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?access_token=pk.eyJ1Ijoic2h5YW1rcmlzaG5hbiIsImEiOiJja3NieTQ2MWEwYmJwMm9vZGM0aGFubmpiIn0.Jv1-a5bdh57G0faOlxgtFA"
    request({url:geoUrl,json:true},(error,response) =>{
        
        if(error){
            const error={
                error:"Error whie fetching location, try again.."
            }
            const data="undefined"
            callback(error,data);
        }else if(response.body.message){
            const error ={
                error:"Empty location. Try again with valid location"
            }
            const data="undefined"
            callback(error,data);
        }else if(response.body.features.length === 0){
            const error ={
                error:"Invalid location. Please try again with valid location!"
            }
            const data="undefined"
            callback(error,data);
        }else{
            const error="undefined"
            const data={
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0]
            }
            callback(error,data);
        }
        
    })
}
module.exports=geolocation