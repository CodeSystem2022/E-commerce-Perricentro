const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const path = require("path"); // redirige a los directorios que se necesitan al momento de arrancar el servidor

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
    access_token: "APP_USR-4961290398089399-091717-850d39f560c325d3b8b9b8c0841cb7db-1482274743", 
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// express se dirige a la carpeta 
app.use(express.static(path.join(__dirname, "../")));
app.use(cors());
// inicia una primera ruta resuelta por path
app.get("/", function () {
    path.resolve(__dirname, "..", "..", "index.html");
});
// crea una preferencia
app.post("/create_preference", (req, res) => {

    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }
        ],
        back_urls: {
            "success": "http://localhost:3000",
            "failure": "http://localhost:3000",
            "pending": ""
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});
// feedback - estado de la compra para el usuario
app.get('/feedback', function (req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});

app.listen(3000, () => {
    console.log("The server is now running on Port 3000");
});