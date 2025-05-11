fetch('http://127.0.0.1:3002/about', {method: 'put'})
.then(res => res.json())
.then((data) => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})