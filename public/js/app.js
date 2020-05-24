const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const forecast = document.querySelector('#forecast')
const errorMsg = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
    const location = search.value
    errorMsg.textContent = 'Loading'
    forecast.textContent = ''

    fetch(`/weather?address=${location}`).then((response)=> {
    response.json().then((data) => {
        if (data.error) {
           errorMsg.textContent = data.error
           forecast.textContent =''
        } else {
            forecast.textContent = (data.location)
            errorMsg.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }

    })
})
    e.preventDefault()
})
