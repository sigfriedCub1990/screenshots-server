
const path = '/';

const indexController = {
    registerRoutes: function (app) {
        app.get(path, this.index);
    },

    index: function(req, res) {
        res.render('index', {title: 'Screenshot server'});
    }
};

module.exports = indexController;