const Listing = require("../models/listing.js");

module.exports.index = async (req,res)=>{
    let allListinngs = await Listing.find({});
    res.render("./listings/index.ejs",{allListinngs});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.renderCreateForm = async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListings = new Listing(req.body.listing);
    newListings.owner = req.user._id;
    newListings.image = {url,filename};
    await newListings.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderShowForm = async (req,res)=>{
    let {id} = req.params;
    const listings = await Listing.findById(id).populate({path : "reviews", populate : {path : "author",},}).populate("owner");
    if(!listings){
        req.flash("error","Listing you requested for doesnot exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listings});
};

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for doesnot exist!");
        res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing,originalUrl});
};

module.exports.renderUpdateForm = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
    
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.renderDeleteForm = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};