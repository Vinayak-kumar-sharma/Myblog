const mongoose = require("mongoose");
const marked = require("marked")
const slugify = require("slugify")

const articleSchema = new mongoose.Schema({
    title: { requiured:true,type:String},
    description: { type:String },
    // markdown: { type: String, required:true},
    createdAt: { type: Date, default:Date.now },
    // slug: { type:String, required:true, unique:true},
})

// articleSchema.pre('validate',function(next){
//     if(this.title){
//         this.slug = sligify(this.title,{lower:true, strict: true})
//     }
//     next()
// })

module.exports = mongoose.model('Article',articleSchema)