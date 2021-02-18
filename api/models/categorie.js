var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorieSchema = new Schema(
    {
        nom: {type: String, required: true, maxlength: 100},
        acronyme: {type: String, required: true, maxlength: 2, minlength: 2}
    }
);

module.exports = mongoose.model('Categorie', CategorieSchema);
