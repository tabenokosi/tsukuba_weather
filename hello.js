function time_format(stamp) {
    var d = new Date(stamp * 1000)
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    var min = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
    var sec = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}

// クッキーにデータを格納
function Changeinput(){
    document.cookie="apikey="+apikey.value
    get_weather();
}

function qclick(){
    window.open('https://home.openweathermap.org/api_keys', '_blank');
}

var apikey=document.getElementById('apikey')
var apibutton=document.getElementById('apibutton')
var qbutton=document.getElementById('qbutton')
apibutton.addEventListener("click", Changeinput, false)
qbutton.addEventListener("click", qclick, false)


// クッキーからデータを取り出す
var cookie_data = document.cookie.split(';');
var cookie_array=new Array();

cookie_data.forEach(function(value) {
    var content = value.split('=');
    cookie_array[content[0]]=content[1];
})

console.log(cookie_array["apikey"]);
apikey.value=cookie_array["apikey"];


function get_weather(){
    // apikeyを使って天気データを取得
    var weather_url = "https://api.openweathermap.org/data/2.5/onecall?lat=36.0920494&lon=139.9444801&units=metric&appid="+apikey.value;
    console.log(weather_url)
    var request = new XMLHttpRequest();
    var div1 = document.getElementById('div1');

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response) {
                // console.log(this.response);
                var obj = JSON.parse(this.response)
                for (var i = 0; i < 16; i++) {
                    var p1 = document.createElement("p");
                    try{
                    var hour=String(obj.hourly[i].rain['1h'])+'mm ';
                    }
                    catch(e){
                    var hour=''
                    }
                    icon={'01d': 'fas fa-sun','01n': 'fas fa-sun','02d': 'fas fa-cloud-sun','02n': 'fas fa-cloud-sun','03d': 'fas fa-cloud','03n': 'fas fa-cloud','04d': 'fas fa-cloud','04n': 'fas fa-cloud','09d': 'fas fa-umbrella','09n': 'fas fa-umbrella','10d': 'fas fa-cloud-sun-rain','10n': 'fas fa-cloud-sun-rain','11d': 'fas fa-bolt','11n': 'fas fa-bolt','13d': 'fas fa-snowflake','13n': 'fas fa-snowflake','50d': 'fas fa-smog','50n': 'fas fa-smog'}
                    p1.innerHTML=
                    time_format(obj.hourly[i].dt)+
                    '<p><span class="icon"><i class="fas '+ icon[obj.hourly[i].weather[0].icon] +'"></i></span>'
                    +hour
                    +obj.hourly[i].temp+'℃<br><br>';
                    div1.appendChild(p1);
                }
            }
        }
    }
    request.open('GET', weather_url, true);
    request.send();
}
get_weather();


