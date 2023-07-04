const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var products = [
  { imageUrl: "products/iphone.webp", name: "Iphone", price: "1000" },
  { imageUrl: "products/headphones.webp", name: "Headphones", price: "450" },
  { imageUrl: "products/kbm.webp", name: "Keyboard & Mouse", price: "90" },
  { imageUrl: "products/macbook.webp", name: "Macbook", price: "2000" },
  { imageUrl: "products/watch.webp", name: "Apple Watch", price: "550" },
];

var cart = [];


app.get('/', (req, res) => {
  var total = 0
  if (cart.length > 0) { 
  cart.forEach(function (item) { 
    total += Number(item.price)
    })  
  }
  else {
    total = 0;
  }
  console.log("total is " + total);
  res.render("main", {total:total, products: products,cart: cart });
});

app.get("/:product", (req, res) => { 
  var product = req.params.product;
  var position = products.findIndex(function (p) {
    return p.name === product;
  });
  
  res.render("product", { product: products[position], products: products });
});

app.post("/add-to-cart", (req, res) => { 
  const { name, price, imageUrl } = req.body;

  const product = {name,price,imageUrl}
  cart.push(product);
  console.log(cart);
});



app.listen(3000, () => { 
  console.log("Server has started on port 3000");
});

