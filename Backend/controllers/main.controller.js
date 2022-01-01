const User = require("../models/user.model");
const Blog = require("../models/post.model");
const bcrypt = require("bcrypt");
const JwtSign = require("../services/jwt.service");
const mongoose = require("mongoose");

const mainController = {};

mainController.getAdminStatus = async (req, res, next) => {
    try {
        User.findOne({ type: 'Admin' }).then((admin) => {
            if (admin) {
                res.status(200).json({ success: true, exist: true, msg: 'admin exist' });
            } else {
                res.status(200).json({ success: true, exist: false, msg: 'admin not exist' });
            }
        }).catch((error) => {
            res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in admin catch' });
        });
    } catch (error) {
        res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in main catch' });
    }
};

/**
 * new user registeration
 * @param {*} req
 * @param {*} res
 */
mainController.registeration = async (req, res) => {
    try {
        let { email, password, type } = req.body;
        email = email.toLowerCase();
        await User.findOne({ email: email }).then(async (findUser) => {
            if (findUser) {
                res.status(200).json({
                    success: false,
                    msg: "This email address/username is already exist. Please provide another.",
                    tye: "user already",
                });
            } else {
                let salt = await bcrypt.genSaltSync(10);
                let userPassword = await bcrypt.hashSync(password, salt);
                let newUser = new User({
                    email: email,
                    password: userPassword,
                    type: type,
                });
                newUser
                    .save()
                    .then(async (savedUser) => {
                        JwtSign({ email: savedUser.email, type: savedUser.type }, async (err, token) => {
                            console.log('token value', token)
                            res.status(200).json({
                                success: true,
                                msg: "You have successfully registered!",
                                token: token
                            });
                        });
                    })
                    .catch((error) => {
                        res.status(200).json({
                            success: false,
                            msg: "Something went wrong!",
                            type: "in save user catch",
                        });
                    });
            }
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};

/**
 * user login
 * @param {*} req
 * @param {*} res
 */
mainController.login = async (req, res) => {
    try {
        let { email, password, type } = req.body;
        email = email.toLowerCase();
        await User.findOne({ email: email, type: type }).then(async (user) => {
            if (user) {
                await bcrypt
                    .compare(password, user.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            JwtSign(
                                {
                                    id: user._id,
                                    email: user.email,
                                    type: user.type
                                },
                                async (err, token) => {
                                    if (err) {
                                        res.status(200).json({
                                            success: false,
                                            msg: "Your credentails could be wrong!",
                                            type: "no user found username",
                                        });
                                    } else {
                                        res.status(200).json({
                                            success: true,
                                            msg: "You have login successfully!",
                                            token: token,
                                        });
                                    }
                                }
                            );
                        } else {
                            res.status(200).json({
                                success: false,
                                msg: "Your credentails could be wrong!",
                                type: "no password match",
                            });
                        }
                    })
                    .catch((error) => {
                        res.status(200).json({
                            success: false,
                            msg: "Something went wrong!",
                            type: "compare password match catch",
                        });
                    });
            } else {
                res.status(200).json({
                    success: false,
                    msg: "Your credentails could be wrong!",
                    type: "no user found",
                });
            }
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};



mainController.saveBlog = async (req, res, next) => {
    try {
        const { title, description, userId } = req.body;
        let newBlog = new Blog({
            title: title,
            description: description,
            userId: userId,
            status: false
        });
        newBlog.save().then(async (Blog) => {
            res.status(200).json({
                success: true,
                msg: "Blog Saved Successfully!",
            });
        }).catch((error) => {
            res.status(200).json({
                success: false,
                msg: "Something went wrong!",
                type: "in blog catch",
                error: error
            });
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};


mainController.getBlog = async (req, res, next) => {
    try {
        const { id, type } = req.query;
        let filter = {};
        if (type == 'Content-Writer') {
            filter = { userId: id }
        }
        Blog.find(filter).then(async (list) => {
            if (list.length >= 0) {
                res.status(200).json({
                    success: true,
                    msg: "data fetch successfully!",
                    list: list,
                });
            } else {
                res.status(200).json({
                    success: false,
                    msg: "No Blog Found!",
                });
            }
        }).catch((error) => {
            res.status(200).json({
                success: false,
                msg: "Something went wrong!",
                type: "in list catch",
            });
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }

}


/**
 * get All Users
 * @param {*} req
 * @param {*} res
 */
mainController.getAllUser = async (req, res, next) => {
    try {
        User.find({ type: 'Content-Writer' })
            .then(async (allUser) => {
                if (allUser) {
                    res.status(200).json({
                        success: true,
                        msg: "User Fetched Successfull!",
                        result: allUser,
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        msg: "No Data Found!",
                    });
                }
            })
            .catch((error) => {
                res.status(200).json({
                    success: false,
                    msg: "Something went wrong!",
                    type: "in save user catch",
                });
            });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};


/**
 * approve blog
 * @param {*} req
 * @param {*} res
 */
mainController.approveBlog = async (req, res, next) => {
    try {
        const { id, status } = req.query;
        Blog.findByIdAndUpdate(id, { status: status }, { new: true })
            .then(async (updateBlog) => {
                if (updateBlog) {
                    res.status(200).json({
                        success: true,
                        msg: "Blog Approved!",
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        msg: "Blog not found!",
                    });
                }
            })
            .catch((error) => {
                res.status(200).json({
                    success: false,
                    msg: "Something went wrong!",
                    type: "in updateBlog catch",
                });
            });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};


/**
 * remove blog
 * @param {*} req
 * @param {*} res
 */
mainController.removeBlog = async (req, res, next) => {
    try {
        const { blogId } = req.query;
        Blog.findByIdAndDelete(blogId)
            .then(async (removeBlog) => {
                if (removeBlog) {
                    res.status(200).json({
                        success: true,
                        msg: "Blog Removed!",
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        msg: "Blog not found!",
                    });
                }
            })
            .catch((error) => {
                res.status(200).json({
                    success: false,
                    msg: "Something went wrong!",
                    type: "in removeBlog catch",
                });
            });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};


/**
* remove user
* @param {*} req
* @param {*} res
*/
mainController.removeUser = async (req, res, next) => {
    try {
        const { id } = req.query;
        User.findByIdAndDelete(id)
            .then(async (removeUser) => {
                if (removeUser) {
                    res.status(200).json({
                        success: true,
                        msg: "User Removed!",
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        msg: "User not found!",
                    });
                }
            })
            .catch((error) => {
                res.status(200).json({
                    success: false,
                    msg: "Something went wrong!",
                    type: "in removeUser catch",
                });
            });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};

module.exports = mainController;
