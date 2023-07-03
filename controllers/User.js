const User = require('../models/user');
exports.getUsers= (req, res, next) => {
    User.findAll()
    .then(users=>{
      res.json(users)
      // res.render('shop/product-list', {
      //   prods: products,
      //   pageTitle: 'All Products',
      //   path: '/products'
      // });
    }).catch(err=>{
      console.log(err)
    });
  };

  exports.addUser=(req,res,next)=>{
    console.log(req.body)
    const nam = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    
    User.create({
        name:nam,
        email:email,
        phone:phone

    }).then(result=>{
        res.json(result)
        console.log('Created Product');
    }).catch(err=>console.log(err));
  }

  exports.userdelete=(req,res,next)=>{
    const userid=req.params.ID;
    console.log(userid)
    
    User.findByPk(userid)
    .then(user=>{
        return user.destroy();
    }).then(result=>{
        res.json(result)
        console.log('User Deleted')
        

    })
    .catch(err=>{
        console.log(err)
    });
  }