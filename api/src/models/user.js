/*
Objective: Schema created for users
Author: me@ravindernegi.com
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String
    },
    first_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        default: 'admin'
    },
    image: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "archived"],
        default: 'active'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


UserSchema.pre("save", function (next) {
    let user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err1, hash) => {
                console.log(err1);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

mongoose.set("useCreateIndex", true);

module.exports = mongoose.model("User", UserSchema);