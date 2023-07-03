const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err=>{
    console.log(err)
  });
};

exports.getProduct = (req,res,next)=>{
  const prodid = req.params.productID;
  Product.findByPk(prodid).then(product=>{
    res.render('shop/product-detail',{product:product,pageTitle:product.title,path:'/products'})
    

  })
  .catch(err=>{
    console.log(err)
  });
  
  // Product.findBYID(prodid,product=>{
  //   res.render('shop/product-detail',{product:product,pageTitle:product.title,path:'/products'})

  // })
  
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });

  }).catch(err=>{
    console.log(err)
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    Product.fetchAll(products=>{
      const cartProducts=[];
      for (pro of products){
        const cartProductData=cart.products.find(prod=> prod.id===pro.id );
        if (cartProductData){
          cartProducts.push({productData:pro,qty:cartProductData.qty});

        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:cartProducts,
        totalPrice:cart.totalPrice
      });

    })
  })
  
};
exports.postCart =(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findBYID(prodId,(product)=>{
    Cart.addProduct(prodId,product.price);

  })
  console.log(prodId)
  res.redirect('/cart');

};
exports.postCartDelete=(req,res,next)=>{
  const prodId=req.body.productId;
  
  Product.findBYID(prodId,(product)=>{
    console.log(product)
    Cart.deletCartProduct(prodId,product.price);

  })
  console.log(prodId)
  res.redirect('/cart');

}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
