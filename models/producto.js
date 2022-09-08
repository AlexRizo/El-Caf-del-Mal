import mongoose from "mongoose";

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Name is required'],
        // unique: true
    },
    descripcion: {
        type: String,
        default: ''
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    disponible: {
        type: Boolean,
        default: true,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true 
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

ProductoSchema.methods.toJSON = function() {
    const {__v, _id:uid, estado, ...producto} = this.toObject();

    return Object.assign({uid}, producto);
}

export default mongoose.model('Producto', ProductoSchema);
