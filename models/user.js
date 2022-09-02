import mongoose from 'mongoose';

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Required']
    },
    correo: {
        type: String,
        required: [true, 'Required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Required']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user;
}

export default mongoose.model('Usuario', UsuarioSchema);