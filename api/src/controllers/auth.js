const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const Message = require('../helpers/constant');
const {generatePassword, hashCode,generateAuthToken, validate, verifyToken, verifyRefreshToken} = require('../helpers/common');


// Auth's login
const login = async (req,res,next) => {
	try {
		let email = req.body.email,
		password = req.body.password;

		// validation rules
		let rules = {
			email: 'required|email',
			password: 'required'
		};

		// check validation
		const isValid = validate(req.body, rules, res);
		if (isValid) {
			return isValid;
		}
		const user = await UserModel.findOne({
			email,
			status:'active'
		},{created_at:0,__v:0,is_deleted:0,status:0}).exec();

		if(user==null){
			throw ({email:Message.EMAIL_NOT_EXISTS});
		}
		if (user && bcrypt.compareSync(password, user.password)) {
			const response = generateAuthToken(user);

		 	res.send({status:true,data:response});
		} else {
			throw ({email:Message.WRONG_INFO});
		}

	} catch (error) {
		next(error);
	}
};


// Get logged in user details
const getAuthUser = async (req,res,next) => {
	try {
		const auth = await verifyToken(req, res, next);
		console.log(auth);
		let id = auth.user._id;
		const user = await UserModel.findOne(
			{
			_id:id,
			status:'active'
		},{password:0,is_deleted:0,__v:0,status:0}).exec();
		res.send({status:true,data:{user:user}});

	} catch (error) {
		next(error);
	}
}

// Refresh auth token
const refreshToken = async (req,res,next) => {
	try {
		const auth = await verifyRefreshToken(req, res, next);
		console.log('console.log(auth);',auth.user);
		const response = generateAuthToken(auth.user);
		res.send({status:true,data:response});
	} catch (error) {
		next(error);
	}
}

// Update profile
const updateProfile = async (req,res,next) => {

    try {
		const auth = await verifyToken(req, res, next);
		let id = auth.user._id;
        let params = req.body;
		let rules = {
			first_name:'required',
			last_name:'required',
			email: 'required|email'
		};
		// check validation
		const isValid = validate(req.body, rules, res);
		if (isValid) {
			return isValid;
            }
        // check for already exist
        const userdata = await UserModel.find({
			email:params.email,
			_id:{$ne:id}
		}).exec();
        let messages = {};
        let error = false;
        if(userdata && userdata.length>0 ){
			messages.email =  Message.EMAIL_EXISTS;
			error = true;
		}

        if(error){
            res.status(421).send({status:false,errors : messages});
        }

        if(Object.keys(params).length>0){
            await UserModel.updateOne({ _id: id },{ $set: params});
        }
        res.send({status:true,data : {user:"success"}});

	} catch (error) {
		next(error);
	}
};



module.exports = {
	login,
	getAuthUser,
	refreshToken,
	updateProfile
}