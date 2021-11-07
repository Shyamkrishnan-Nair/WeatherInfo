const weatherForm=document.querySelector('form')
const temp=document.querySelector('.temperature');
const windSpeed=document.querySelector('.windSpeed');
const feelsLike=document.querySelector('.feelsLike');
const humidity=document.querySelector('.humidity');
const locationText=document.querySelector('.location')
const weatherDesc=document.querySelector('.weatherDesc')
const errorDiv=document.querySelector('.errorBox')
const box1=document.querySelector('.box1')
const box2=document.querySelector('.box2')
const iconDiv=document.querySelector('.iconDiv')
weatherForm.addEventListener('submit', (e)=>{
e.preventDefault()
console.log("Form submitted",weatherForm.querySelector('input').value)
//fetch('http://localhost:3000/weather?address='+weatherForm.querySelector('input').value)
fetch('/weather?address='+weatherForm.querySelector('input').value)
  .then(response => response.json())
  .then(data =>{
      if(data.error){
          errorDiv.style.display = "block"
          box1.style.display="none"
          box2.style.display="none"
          iconDiv.style.display="block";
          errorDiv.textContent=data.error
          
      }else{
          box1.style.display="block"
          box2.style.display="block"
          errorDiv.style.display = "none";
          iconDiv.style.display="none";
          locationText.textContent=data.location
          humidity.textContent = data.humidity
          windSpeed.textContent = data.wind_speed +" km/h"
          feelsLike.textContent= data.feelslike + "°C"
          temp.textContent = data.temperature + "°C"
          weatherDesc.textContent=data.rainProbability
      }
  } );

})