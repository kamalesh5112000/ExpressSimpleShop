const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
  }).then(result=>{
    console.log('Created Product');
    res.redirect('/')
  }).catch(err=>console.log(err));
  
  
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }

  const prodId = req.params.productId;
  req.user.getProducts({where:{id:prodId}})
  //Product.findByPk(prodId)
  .then(products=>{
    const product=products[0]
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product
  
    });

  }).catch(err=>console.log(err))

  
};

exports.postEditProduct=(req,res,next)=>{
  const prodId = req.body.productId;
  const updatedtitle = req.body.title;
  const updatedimageUrl = req.body.imageUrl;
  const updatedprice = req.body.price;
  const updateddescription = req.body.description;
  Product.findByPk(prodId)
  .then(product=>{
    product.title=updatedtitle;
    product.price=updatedprice;
    product.description=updateddescription;
    product.imageUrl=updatedimageUrl;
    return product.save();
  }).then(result=>{
    console.log('Updated Product')
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err));
  
  



};

exports.deleteProduct=(req,res,next)=>{
  const prodId = req.params.productId;
  console.log(prodId)
  Product.findByPk(prodId)
  .then(product=>{
    return product.destroy();
  }).then(result=>{
    console.log('Product Deleted')
    res.redirect('/admin/products')

  })
  .catch(err=>console.log(err));
  
  


}

exports.getProducts = (req, res, next) => {

  req.user.getProducts()
  .then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>{
    console.log(err)
  });
};
