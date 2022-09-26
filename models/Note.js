const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let NoteSchema = new Schema(
    {
        owner_id: {type: String, required: true},
        note: { 
            type: String, 
            required: [true, "A note is required!"]}
    },
    { timestamps: true }
);

NoteSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model("note", NoteSchema, "notes");