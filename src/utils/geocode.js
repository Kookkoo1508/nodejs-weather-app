import request from 'postman-request';

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia29va2tvbzE1MDgiLCJhIjoiY2wxNnNyOHpwMWhjMjNqcHdqZ2M4cWZ3ZiJ9.1PY42JfEMNcp75a9qfunhQ&limit=1'
    request({ url, json: true } , (error, {body={}} = {}) => {   //Provide default empty object if no object return
        if(error) {
            callback('unable to find the location', {undefined} )
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            // console.log(body)
            const [lonti, lati] = body.features[0].center
            const { place_name } = body.features[0]
            callback(undefined, {
                lati,
                lonti,
                place_name
            })
        }
    })
}

export default geocode