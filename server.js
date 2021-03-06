var express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    colors     = require('colors'),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    port       = process.env.PORT || 3000,
    router     = express.Router();

//mongoose connection
mongoose.connect('mongodb://localhost/myRest');

var Bike = require('./app/models/bike')

//register middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routes for the API
router.use(function(req, res, next){
  console.log('API is being accessed'.rainbow);
  next();
});

//get route
router.get('/', function(req, res){
  res.json({message: 'Welcome to my API!'})
});

//first router.route will handle .post and .get
router.route('/bikes')
  .post(function(req, res){
    var bike = new Bike();
    bike.company = req.body.company;
    bike.model = req.body.model;
    bike.type = req.body.type;

    //save bike and check for errors
    bike.save(function(err){
      if(err){
        res.send(err);
      } else {
        res.json({message: 'Bike Created'})
      }
    })
})
  .get(function(req, res){
    Bike.find(function(err, bikes){
      if (err){
        res.send(err);
      }else {
        res.json(bikes);
      }
    });
  });

router.route('/bikes/:bike_id')
  .get(function(req, res){
    Bike.findById(req.params.bike_id, function(err, bike){
      if (err){
        res.send(err)
      } else {
        res.json(bike);
      }
    });
  })
  .put(function(req, res){
    Bike.findById(req.params.bike_id, function(err, bike){
      if (err){
        res.send(err)
      } else {
        bike.company = req.body.company;
        bike.model = req.body.model;
        bike.type = req.body.type;

        bike.save(function(err){
          if (err){
            res.send(err);
          }
          else {
            res.json({dude: 'Bike has been updated'});
          }
        });
      }
    });
  })
  .delete(function(req, res){
    Bike.remove({
      _id: req.params.bike_id
    }, function(err, bike){
      if (err){
        res.send(err)
      } else {
        res.json({message: 'Successfully deleted bike.'})
      }
    });
  });

//register routes, all routes will be prefixed with /api
app.use('/api', router);

//start server
app.listen(port);
console.log('Taste the rainbow on port '.rainbow + port);
