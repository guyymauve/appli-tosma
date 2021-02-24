var mongoose = require('mongoose');
var categorie = require('./categorie');

var Schema = mongoose.Schema;

const opts = { toJSON : {virtuals: true} };

var MatosSchema = new Schema(
    {
        nom: {type: String, required: true, maxlength: 100},
        categorie: {type: Schema.Types.ObjectId, ref: 'Categorie', required: true},
        id: {type: Number},
        dispo: {type: Boolean, required: true},
        emprunt: {type: String, maxlength: 100}
    }, opts
);

MatosSchema
.virtual('code')
.get(function() {
    return this.categorie.acronyme + new Intl.NumberFormat(options={minimumIntegerDigits: 3}).format(this.id);
});

module.exports = mongoose.model('Matos', MatosSchema);
