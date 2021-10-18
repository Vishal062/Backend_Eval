const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
    roll: { type: Number, required: true },
    batch: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});


module.exports = mongoose.model("student", StudentSchema);