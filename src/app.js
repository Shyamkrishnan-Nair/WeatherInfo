const express  =    require('express')
const path     =    require("path")
const hbs      =    require('hbs')
const geocode  =    require('./utils/geocode')
const forecast =    require('./utils/forecast')
const app=express()
const port=process.env.PORT || 3000

//path for public static assets
const publicDirectory=path.join(__dirname,"../public")
//serve public static assets
app.use(express.static(publicDirectory))


//path for views directory
const viewsDirectory=path.join(__dirname,"../templates/views")


//Setup view engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsDirectory)

//path for partials directory
const partialsDirectory=path.join(__dirname,'../templates/partials')
//register partials with hbs
hbs.registerPartials(partialsDirectory)

app.get("/", (req,res)=>{
  res.render("index")
})

app.get("/weather", (req,res)=>{
    if(!req.query.address){
        console.log("please enter a search value")
        return res.send({
            error:'Please provide a valid location to view the forecast!'
        })
    }
    geocode(req.query.address,(error,location)=>{
        if(error==="undefined"){
                 console.log("latitude is ",location.latitude)
                     console.log("latitude is ",location.longitude)
                     const cordinates=location.latitude+","+location.longitude 
                   forecast(cordinates,(error,data)=>{//callback chaining
                       if(data ==="undefined"){
                          return res.send(error)
                       }else{
                          return res.send(data)
                       }
                   })
           }else{
                   return res.send(error)
               }
    })
})

app.get("/about", (req,res)=>{
    res.render("about")
})

app.get("/help", (req,res)=>{
    res.render("help")
})

app.get("*", (req,res)=>{
    res.render("error")
})

app.listen(port,()=>{
    console.log("Server is up and running!")
})