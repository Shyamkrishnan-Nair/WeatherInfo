const weatherForm=document.querySelector('form')
const temp=document.querySelector('.temperature');
const windSpeed=document.querySelector('.windSpeed');
const feelsLike=document.querySelector('.feelsLike');
const humidity=document.querySelector('.humidity');
const locationText=document.querySelector('.location')
weatherForm.addEventListener('submit', (e)=>{
e.preventDefault()
console.log("Form submitted",weatherForm.querySelector('input').value)
fetch('http://localhost:3000/weather?address='+weatherForm.querySelector('input').value)
  .then(response => response.json())
  .then(data =>{
      if(data.error){
          console.log(data.error)
      }else{
          console.log(data)
          locationText.textContent=data.location
          humidity.textContent = data.humidity
          windSpeed.textContent = data.wind_speed +" km/h"
          feelsLike.textContent= data.feelslike + "°C"
          temp.textContent = data.temperature + "°C"
      }
  } );

})