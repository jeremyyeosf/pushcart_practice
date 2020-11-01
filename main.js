const express = require('express')
const handlebars = require('express-handlebars')
const PORT = 3000
const app = express()
app.engine('hbs', handlebars({defaultLayout: 'default.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    const cart = []
    res.status(200)
    res.type('text/html')
    res.render('index', { cartState: JSON.stringify(cart)})
})

app.post('/', express.urlencoded({extended: true}), (req, res) => {
    const cart = JSON.parse(req.body.cartState)  
    cart.push({
        item: req.body.item,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice
    })
    console.log('cart: ', cart)
    res.status(200)
    res.type('text/html')
    res.render('index', {cart: cart, cartState: JSON.stringify(cart)})
})

app.listen(PORT, () => {
    console.log(`Application started on port: ${PORT} at ${new Date()}.`)
})