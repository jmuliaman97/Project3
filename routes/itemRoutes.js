const router = require("express").Router();
const { Item, User, Bid, Comment } = require("../models");
const jwt = require("jsonwebtoken");
const passport = require("passport");


// returns all items signed in or not
router.post("/items/category", (req, res) => {
  if(req.body.category === 'All' )
  {
    Item.find({isBought : false})
    .populate("user")
    .then((items) => res.json(items))
    .catch((err) => console.error(err));
  }
  else
  {
    Item.find({isBought : false, category : req.body.category})
    .populate("user")
    .then((items) => res.json(items))
    .catch((err) => console.error(err));
  }
 
});


// returns all items signed in or not
router.get("/items/:id", (req, res) => {
  Item.find({_id : req.params.id})
    .populate("user")
    .then((items) => 
    {
      // if(req.user._id === items[0].user._id)
      // {
      //   console.log('true')
      // }
      // console.log(items)
      res.json(items)
    }
    )
    .catch((err) => console.error(err));
});


// creating new item for sale
router.post("/items", passport.authenticate("jwt"), async (req, res) => {

  let path = []
  const url = req.protocol + '://' + req.get('host')
  if (req.files) {
  const file = req.files.imgCollection
   for(let i = 0; i < file.length; i++ )
  {
     await (file.length?file[i]:file).mv(
      `./client/images/` + (file.length?file[i]:file).name.split(' ').join('_'),
        (err) => {
        if (err) {
          console.log('failed to upload')
        } else {
          isImage = true;
        }
      }
    ); 
     path.push(`/images/` + file[i].name)
  }
}

  req.body['photos'] = path
  req.body['user'] = req.user._id

  Item.create(req.body)
    .then((item) => {
      User.findByIdAndUpdate(req.user._id, { $push: { sellItems: item._id } })
        .then(() =>
          res.json(req.body)
        )
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
});

// update created auction item
// router.put('/items/:id', passport.authenticate("jwt"), (req, res) => {
//   Item.findByIdAndUpdate(req.params.id, { $set: req.body })
//     .then(data => res.json(data))
//     .catch(err => console.error(err))
// })

// // delete item by id
// router.delete('/items/:id', passport.authenticate("jwt"), (req, res) => {
//   Item.findByIdAndRemove(req.params.id)
//     .then(data => res.json(data))
//     .catch(err => console.error(err))
// })


// create new bid on item
router.post("/item/bid", passport.authenticate("jwt"), async (req, res) => {

  let path = []
  const url = req.protocol + '://' + req.get('host')
  if (req.files) {
  const file = req.files.imgCollection
  const length = file.length || 1
   for(let i = 0; i < length; i++ )
  {
     await (file.length?file[i]:file).mv(
      `./client/images/` + (file.length?file[i]:file).name.split(' ').join('_'),
        (err) => {
        if (err) {
          console.log('failed to upload')
        } else {
        
          isImage = true;
        }
      }
    ); 
     path.push(`/images/` + (file.length?file[i]:file).name.split(' ').join('_'))
  }
}


const newBid = {
  price: req.body.price,
  description: req.body.description,
  user: req.user._id,
  item: req.body.postId,
  photos : path
};

  Bid.create(newBid)
    .then((bid) => {
      Item.findByIdAndUpdate(req.body.postId, { $push: { bid: bid._id } })
        .then(() => {
            if(!req.user.buyItems.indexOf(req.body.postId))
            {
              User.findByIdAndUpdate(req.user._id,{ $push: { buyItems: req.body.postId }})
              .then(data => res.json(data))
              .catch(err => console.error(err))
            }
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
})

// create new comment on item
router.post("/comments", passport.authenticate("jwt"), (req, res) => {
  const newComment = {
    body: req.body.body,
    user: req.user._id,
    item: req.body.item
  }
  Comment.create(newComment)
    .then((comment) => {
      Item.findByIdAndUpdate(req.body.item, { $push: { comment: comment._id } })
        .then(() => res.json(newComment))
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
})


// watch on item
router.post("/item/watch", passport.authenticate("jwt"), async (req, res) => {
  await User.findByIdAndUpdate(req.user._id,{ $push: { watchItems: req.body.postId }}, {new:true}, async (err, data) => 
  {
  if(err)console.error(err)
   res.sendStatus(200)
  }
  )
})

module.exports = router


