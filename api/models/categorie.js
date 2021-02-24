var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/* Représente une catégorie de Matos.
    Nom : nom de la catégorie
    Acronyme : acronyme de la catégorie en 2 lettres 
*/

var CategorieSchema = new Schema(
    {
        nom: {type: String, required: true, maxlength: 100},
        acronyme: {type: String, required: true, maxlength: 2, minlength: 2}
    }
);

module.exports = mongoose.model('Categorie', CategorieSchema);
