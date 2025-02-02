const mongoose = require("mongoose");
const {marked} = require('marked')
const createDomPurify = require('dompurify')
const {JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const slugify = require("slugify")

const articleSchema = new mongoose.Schema({
    title: { requiured:true,type:String},
    description: { type:String },
    markdown: { type: String, required:true},
    createdAt: { type: Date, default:Date.now },
    slug: { type:String, required:true, unique:true},
    views:{ type: Number , default:0 },
    sanotizedHtml: {type:String,required:true},
})

articleSchema.pre('validate',function(next){
    if(this.title){
        this.slug = slugify(this.title,{lower:true, strict: true})
    }
    if(this.markdown){
        this.sanotizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.model('Article',articleSchema)
