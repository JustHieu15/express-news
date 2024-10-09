const mongoose = require('mongoose');
const Schema = mongoose.Schema

const categorySchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['hoạt động', 'đã xóa'],
        default: 'hoạt động'
    }
});

module.exports = mongoose.model('Category', categorySchema);
