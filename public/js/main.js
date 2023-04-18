const cityName=document.getElementById('cityname');
const submitbtn=document.getElementById("submitbtn");
const city_name=document.getElementById("city_name");
const temp_real_val =document.getElementById('temp_real_val');
const temp_status=document.getElementById('temp_status');
const datahide=document.querySelector(".midd_layer");

const apikey="";

var d=new Date();
const day=document.getElementById('day');
const date=document.getElementById('date');
var days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
day.innerText=days[d.getUTCDay()];
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
date.innerText=`${d.getUTCDate()} ${months[d.getUTCMonth()]}`



const getInfo= async(event)=>{
    event.preventDefault();
    let cityVal=cityName.value
    if(cityVal==""){
        city_name.innerText=`Please write the city name before search`;
        datahide.classList.add('data_hide');
    }
    else{
        try{
        let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${apikey}`;
        const response= await fetch(url);
        // console.log(response);
        const data=await response.json();
        console.log(data);
        const arrData=[data];

        city_name.innerText=`${arrData[0].name}, ${arrData[0].sys.country}`;
        temp_real_val.innerText=arrData[0].main.temp;
        const tempmod=arrData[0].weather[0].main;

        if(tempmod=="Clear"){
            temp_status.innerHTML="<i class='fa-solid fa-sun' style='color:#eccc68;'></i>"
        }
        else if(tempmod=="Clouds"){
            temp_status.innerHTML="<i class='fa-solid fa-cloud' style='color:#f1f2f6;'></i>"
        }
        else if(tempmod=="Rain"){
            temp_status.innerHTML="<i class='fa-solid fa-cloud-rain' style='color:#a4b0be;'></i>"
        }
        else {
            temp_status.innerHTML="<i class='fa-solid fa-cloud' style='color:#f1f2f6;'></i>"
        }

        datahide.classList.remove('data_hide');
        }catch{
            city_name.innerText=`Please search according to page...`;
            datahide.classList.add('data_hide');
        }
    }
}

submitbtn.addEventListener('click',getInfo);