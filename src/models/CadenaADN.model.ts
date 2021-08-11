import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CadenaADN_Schema = new Schema({
    dna: {
        type: [String],
        required: [ true, 'La cadena de ADN es obligatoria' ],
        trim: true
    },
    isMutant: {
        type: Boolean,
        required: [ true, 'El valor de si es mutante o no es obligatorio' ],
    }
});

export = mongoose.model('CadenasADN', CadenaADN_Schema);