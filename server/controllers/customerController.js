const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
    const locals = {
        title: 'NodeJs',
        description: 'Free NodeJs User Management System',
    }

    let perPage = 5;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([{ $sort: { lastName: 1, firstName: 1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await Customer.count();

        res.render('index', {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET /
 * New Customer Form
 */
exports.addCustomer = async (req, res) => {
    const locals = {
        title: 'Add New Customer - NodeJs',
        description: 'Free NodeJs User Management System',
    };

    res.render('customer/add', locals);
};

/**
 * POST /
 * Create New Customer
 */
exports.postCustomer = async (req, res) => {
    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email,
    });

    try {
        await Customer.create(newCustomer);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};

/**
 * GET /
 * Customer Data 
*/
exports.viewCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id });

        const locals = {
            title: 'View Customer Data',
            description: 'Free NodeJs User Management System',
        };

        res.render('customer/view', {
            locals,
            customer,
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET /
 * Update Customer Form
 */
exports.editCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id });
        const locals = {
            title: 'Edit Customer Data',
            description: 'Free NodeJs User Management System',
        };

        res.render('customer/edit', {
            locals,
            customer,
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * PUT /
 * Update Customer
 */
exports.putCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            updatedAt: Date.now(),
        });
        await res.redirect(`/edit/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
};

/**
 * DELETE /
 * Delete Customer Data 
 */
exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

/**
 * POST /
 * Search Customer Data 
*/
exports.searchCustomers = async (req, res) => {

    const locals = {
        title: "Search Customer Data",
        description: "Free NodeJs User Management System",
    };

    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const customers = await Customer.find({
            $or: [
                { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            ]
        });

        res.render("search", {
            customers,
            locals,
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
    const locals = {
        title: 'About',
        description: 'Free NodeJs User Management System',
    };

    try {
        res.render('about', locals);
    } catch (error) {
        console.log(error);
    }
}
