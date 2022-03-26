/** 
    script.js
    Ver geolocalizaciones e IPs en JavaScript
    @author Juan Diego Carretero Granado <jdcarreterogranado@gmail.com>
    @License GPL v3 2021
*/

'use strict'

class Geolocalizacion{
    constructor(){
        window.onload = this.iniciar.bind(this)
    }
    iniciar(){        
        this.cogerPosicion()
    }
    cogerPosicion(){
        let geolocation = navigator.geolocation
        if (geolocation) {
            geolocation.getCurrentPosition(this.success)
        }else{
            throw 'Error GPS'
        }
          
    }
    success(pos) {
        let crd = pos.coords;
      
        console.log('Posición: ' );
        console.log(`Latitud: ${crd.latitude}`); 
        console.log(`Longitud: ${crd.longitude}`); 
        console.log(`Más o menos ${crd.accuracy} metros`);

        
        let ip = document.getElementById('ip')
        let latitude = document.getElementById('latitude')
        let longitude = document.getElementById('longitude')
        let accuracy = document.getElementById('accuracy')

        latitude.appendChild(document.createTextNode('Latitud: ' + crd.latitude))
        longitude.appendChild(document.createTextNode('Longitud: ' + crd.longitude))
        accuracy.appendChild(document.createTextNode('Precisión: ' + crd.accuracy))

        // http://ip.jsontest.com/   https://ipinfo.io/json  https://jsonip.com/
        

        //Token a utilizar de la API ipinfo.io
        let token = 'Aquí va el token de la API'

        const xhttp = new XMLHttpRequest()
        xhttp.open("GET", "https://ipinfo.io?token="+token, true)
        xhttp.setRequestHeader('Content-type', 'applications/json')
        xhttp.send()
        xhttp.onreadystatechange = function (){
            if (this.readyState == 4 && this.status == 200) {
                let ipResponse  = JSON.parse(this.responseText).ip
                console.log('Ip: ' + ipResponse);
                
                ip.appendChild(document.createTextNode('Ip: ' + ipResponse))

                const xhttp2 = new XMLHttpRequest()
                xhttp2.open("POST", "./php/geoip.php", true)
                let data = {
                    Ip: ipResponse,
                    Latitud: crd.latitude,
                    Longitud: crd.longitude,
                    Precision: crd.accuracy
                }
                xhttp2.send(JSON.stringify(data)) 
            }
        }
    }
}

new Geolocalizacion()
