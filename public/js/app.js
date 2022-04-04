
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#p1')
console.log(p1)

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    if(location){
        const url = 'http://localhost:3000/weather?address=' + location
        p1.innerHTML = 'Loading.....'
        fetch(url).then((response)=> {
            if(response.status != 404) {
                response.json().then((data)=> {
                    if(data.errMsg) {
                        document.getElementById('p1').innerHTML = data.errMsg
                    }
                    else{
                        // document.getElementById('p1').innerHTML = 'The weather is ' + data.weather + ' and the temp is ' + data.forcast
                        p1.innerHTML = 'The weather is ' + data.weather + ' and the temp is ' + data.forcast
                    }
                })
            }
            else {
                document.getElementById('p1').innerHTML = 'There is somthing want wrong'
            }
        })
    }
    else {
        document.getElementById('p1').innerHTML = 'Please provide location befor submit'
    }

})

