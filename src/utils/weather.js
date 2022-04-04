import request from 'postman-request';

const weather = ({lati, lonti}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d7c37ea2902003c7843987008b8c81e5&query=' + lati + ',' + lonti

    request({url, json:true} , (error, {body}) => {
        if(error) {
            callback('unable to find the location', undefined)
        }
        else {
            callback(undefined, {
                weather_desc: body.current.weather_descriptions[0],
                location_name: body.location.region,
                location_country: body.location.country,
                location_temp: body.current.temperature
            })
        }

    })
}

export default weather