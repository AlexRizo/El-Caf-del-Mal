import Usuario from "../models/user.js";
import Role from "../models/role.js";

const rolValido = async(rol = '') => {
    const rolExist = await Role.findOne({rol});
    if (!rolExist) {
        throw new Error(`El rol ${rol} no está registrado`);
    }
}

const correoValido = async(correo = '') => {
    // Verificar si el correo existe;
    const emailExist = await Usuario.findOne({correo});
    if (emailExist) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioId = async(id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeUsuario = await Usuario.findById( id ).exec();
        if ( !existeUsuario ) {
            throw new Error(`El id ${ id } no existe`);
        }
    } else {
        throw new Error(`${ id } no es un ID válido`);
    }
}

export{
    rolValido,
    correoValido,
    existeUsuarioId,
}