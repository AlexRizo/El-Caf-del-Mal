import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    rol: {
        type: String,
        required: [true, 'Role is required']
    }
});

export default mongoose.model('Role', RoleSchema);