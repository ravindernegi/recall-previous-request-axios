const UserModel = require('../models/user');
const {  validate, pageMeta} = require('../helpers/common');

// Get all user
const getUsers = async (req,res,next) => {
    try {
        let query = {};
        query.is_deleted = false;

    let page = req.query.page?parseInt(req.query.page):1;
    let limit =  req.query.limit?parseInt(req.query.limit):10;
    let start = ((page - 1) * limit) ;
	if(req.params.search){
		query['$or'] = [{email:{"$regex": req.query.search, "$options": "i"}} ,{first_name:{"$regex": req.query.search, "$options": "i"}},{last_name:{"$regex": req.query.search, "$options": "i"}}];

	}
    const list =  await UserModel.aggregate([
        {'$match': query},
        { $project : {  password:0,is_deleted:0,__v:0,status:0 } } ,
        {
        '$skip': start
        }, {
        '$limit': limit
        }, {
        '$sort': {
            'title': 1
        }
        }
    ]).exec();
    let total = await UserModel.countDocuments(query);
    let page_meta = await pageMeta(total,page,limit);
    return res.send({status:true,data:{list:list,meta:page_meta}});
	} catch (error) {
		next(error);
	}
};

// Get by user id
const getUserById = async (req,res,next) => {

    try {
		let rules = {
			id: 'required',
        };
        const isValid = validate(req.params, rules, res);
		if (isValid) {
		   return isValid
		}
        UserModel.findById(req.params.id,{ password:0,is_deleted:0,__v:0,status:0 })
				.then(item => res.send(item))
                .catch(err =>{
                     next(err)
                })
	} catch (error) {
		next(error);
	}
};

module.exports = {
    getUsers,
    getUserById
};