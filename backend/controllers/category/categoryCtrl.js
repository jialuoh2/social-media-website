const expressAsyncHandler = require("express-async-handler");
const { restart } = require("nodemon");
const Category = require("../../model/category/category");

//create
const createCategoryCtrl = expressAsyncHandler(async(req,res) => {
    try {
        const category = await Category.create({
            user: req.user._id,
            title: req.body.title
        });
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});

//fetch all
const fetchCategoriesCtrl = expressAsyncHandler(async(req,res) => {
    try {
        const categories = await Category.find({}).populate('user').sort('-createdAt');
        res.json(categories);
    } catch (error) {
        res.json(error);
    }
});

//fetch
const fetchCategoryCtrl = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;
    try {
        const category = await Category.findById(id).populate('user').sort('-createdAt');
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});

//update
const updateCategoryCtrl = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;
    try {
        const category = await Category.findByIdAndUpdate(id, {
            title: req?.body?.title
        }, {
            new: true,
            runValidators: true
        });
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});

//delete
const deleteCategoryCtrl = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;
    try {
        const category = await Category.findByIdAndDelete(id);
        res.json(category);
    } catch (error) {
        res.json(error);
    }
})

module.exports = {
    createCategoryCtrl,
    fetchCategoryCtrl,
    fetchCategoriesCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl
};