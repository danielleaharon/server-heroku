const Post = require('../models/post');
const User = require('../models/user');
const Calendar = require('../models/calendar');
const Device = require('../models/devices');


const searchUser =  async (req, res) => {
    console.log("search")

    // const results = await Post.aggregate([
    // //   {
    // //     $unwind: { 
    // //         path: "$category",
    // //  }
    // // },
    //   {
    //     $group: {
    //       _id: '$category',
    //       total: { $sum: 1 },
    //       posts: { $push: '$$ROOT' }
    //     },
    //   },
    // ]);
    var serach= req.params.search;
    User.find(
        { "name": { "$regex": serach, "$options": "i" } ,"isCoach":"true"},
        function(err,docs) { 
            console.log(docs)
            res.json(docs)
        } 
    );
//  User.find([req.params.search]).then(result=>{
//     console.log(result)
//     res.json({result
//     });
//   })
  
 
}
const searchCalenderByDate =  async (req, res) => {
    console.log("searchCalenderByDate")

    var category= req.params.search;
    var myCurrentDate=new Date();
    var myfutureDate=new Date(myCurrentDate);
        myfutureDate.setDate(myfutureDate.getDate() + 2);//2 day's befor
    const result=  await Calendar.find({ "meeting_date" : { $gt: myCurrentDate, $lt: myfutureDate} } ).populate('userId');    // value1 < field < value
result.sort((a,b)=>a.published-b.published);
 
    res.json(result);

}   
const searchCalenderByDate2 =  async (req, res) => {
    console.log("searchCalenderByDate2")

 

    var myCurrentDate=req.body[0];
    console.log(myCurrentDate)
    var myfutureDate=new Date(myCurrentDate);
   
    myfutureDate.setDate(myfutureDate.getDate() );
    myfutureDate.setHours(8);
    myfutureDate.setMinutes(0)
    console.log(myfutureDate)

    var myfutureDate2=new Date(myCurrentDate);
  

    myfutureDate2.setDate(myfutureDate2.getDate() );
    myfutureDate2.setHours(25);
    myfutureDate2.setMinutes(0)
    console.log(myfutureDate2)

    const result=  await Calendar.find({ "meeting_date" : { $gt: myfutureDate, $lt: myfutureDate2} } ).populate('userId');    // value1 < field < value

    res.json(result);
  
 
}
const searchCalenderbyCategory =  async (req, res) => {
    console.log("searchCalenderbyCategory")

    var category= req.params.search;
    const result= await Calendar.find({ "category": { "$regex": category, "$options": "i" } }
        // function(err,docs) { 
        //     console.log(docs)
        //     res.json(docs)
        // } 
    ).populate('userId');
    result.sort((a,b)=>a.published-b.published);
    res.json(result);

  
 
}     
  

module.exports = { searchUser,searchCalenderByDate,searchCalenderbyCategory,searchCalenderByDate2};