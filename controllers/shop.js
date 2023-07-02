const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>{
    console.log(err)
  });
  
};

exports.getProduct = (req,res,next)=>{
  const prodid = req.params.productID;
  Product.findBYID(prodid).then(([rows,fieldData])=>{
    console.log(rows)
    res.render('shop/product-detail',{product:rows[0],pageTitle:rows[0].title,path:'/products'})
    

  })
  .catch(err=>{
    console.log(err)
  });
  
  // Product.findBYID(prodid,product=>{
  //   res.render('shop/product-detail',{product:product,pageTitle:product.title,path:'/products'})

  // })
  
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>{
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
