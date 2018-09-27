const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');
const Photo = require('../models/photo.schema');

// DO NOT MODIFY THIS FILE FOR BASE MODE

// PUT Route
// router.put('/like/:id', function (req, res) {
//     console.log(req.params);
//     const galleryId = req.params.id;
//     for(const galleryItem of galleryItems) {
//         if(galleryItem.id == galleryId) {
//             galleryItem.likes += 1;
//         }
//     }
//     res.sendStatus(200);
// }); // END PUT Route

router.put('/like/:id', (req, res) => {
    let updatedLikes = req.body.likes += 1;
    
    Photo.findByIdAndUpdate({
        _id: req.params.id
    }, {
        $set: {likes: updatedLikes}
    })
        .then(data => {
            res.sendStatus(200);
        })
        .catch(errorFromMongoose => {
            console.log('/gallery/like PUT error:', errorFromMongoose);
            res.sendStatus(500);
        });
})

// GET Route
// router.get('/', function (req, res) {
//     res.send(galleryItems);
// }); // END GET Route

router.get('/', (req, res) => {
    Photo.find({})
         .then((data) => {
             res.send(data);
         })
         .catch(errorFromMongoose => {
             console.log('error on /gallery GET:', errorFromMongoose);
             res.sendStatus(500);
         });
});

router.post('/', (req, res) => {
    let newPhoto = new Photo(req.body);
    newPhoto.save()
            .then(data => {
                res.sendStatus(201);
            })
            .catch(errorFromMongoose => {
                console.log('error on /gallery POST:', errorFromMongoose);
                res.sendStatus(500);
            })
});

router.delete('/:id', (req, res) => {
    Photo.findByIdAndRemove({
        _id: req.params.id
    })
        .then(data => {
            res.sendStatus(200);
        })
        .catch(errorFromMongoose => {
            console.log('error on /gallery DELETE:', errorFromMongoose);
            res.sendStatus(500);
        })
})

module.exports = router;