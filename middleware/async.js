module.exports = function asyncMiddleware(handler){
    return async (req,res,next) => {
      try {
        await handler(req,res);
       }
      catch(ex) {
       next(ex);
     }
    }
   
  }
  router.get('/', asyncMiddleware(async (req, res) => {
      const genres = await Genre.find().sort('name');
      res.send(genres);
  }));
  