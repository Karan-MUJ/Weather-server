//console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'Wow!'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                console.log(data.error) //first
                messageOne.textContent = data.error
            }
            else {
                console.log(data.location)  //first
                messageOne.textContent = data.location
                console.log(data.forecast)  //Second
                messageTwo.textContent = data.forecast
            }
        })
    })
})