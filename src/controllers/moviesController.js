const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
      
       res.render("moviesAdd")
    },
    create: function (req,res) {
        db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
        })
        .then(resultado=>{
            res.redirect("/movies")
        })
        .catch(err=>{
            res.send(err)
        })

    },
    edit: function(req,res) {
        db.Movie.findByPk(req.params.id)
        .then((Movie)=>{
            res.render("moviesEdit",{Movie:Movie})
        })
        .catch(err=>{
            res.send(err)
        })
    },
    update: function (req,res) {
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
        },{
            where: {id:req.params.id}
        })
        .then(resultado=>{
            res.redirect("/movies")
        })
        .catch(err=>{
            res.send(err)
        })

    },
    delete: function (req,res) {
        db.Movie.findByPk(req.params.id)
        .then(Movie=>{
            res.render("moviesDelete", {Movie})
        })
        .catch(err=>{
            res.send(err)
        })
    },
    destroy: function (req,res) {
        db.Movie.destroy({
            where: {id: req.params.id}
        })
        .then(resultado=>{
            res.redirect("/movies")
        })
    }
}

module.exports = moviesController;