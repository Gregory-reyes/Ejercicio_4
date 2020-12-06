const mongoose = require('mongoose');       //requiere líneas y moneda conf.
const Schema = mongoose.Schema;             //Esquema mongoose
//require('mongoose-currency').loadType(mongoose);
//var Currency = mongoose.Types.Currency;

/*const commentSchema = new Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
},{
    timestamps: true
});*/

var leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    label:{
        type: String,
        default: ''
    },
    price:{
        type: String,
        required: true,
        min:0
    },
    featured:{
        type: Boolean,
        default: false
    },
   // comments: [commentSchema]
},{
    timestamps: true
});

var Leaders = mongoose.model('Leader',  leaderSchema);    //crear el modelo a partir del esquema

module.exports = Leaders;