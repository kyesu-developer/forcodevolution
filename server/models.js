const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://satish:satishkumar1@ds263248.mlab.com:63248/dailypromise",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
var Schema = mongoose.Schema;
var activatedListsSchema = new Schema({
  name: String,
  chatId:String,
  username:String,
 created_at: {type: Date, default: Date.now},
 updated_at: {type: Date, default: Date.now}
});

var newpromisesSchema = new Schema({
    today: String,
    telugu_promise: String,
    english_promise: String,
    telugu_chapter:String,
    english_chapter:String,
    verse:String,
    status: { type: Boolean ,default:false},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  var newpromisesList = mongoose.model("new_promises_lists", newpromisesSchema);

var promisesSchema = new Schema({
    today: String,
    promise: String,
    status: { type: Boolean ,default:false},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  var promisesList = mongoose.model("promises_lists", promisesSchema);
  //  let a1 = new promisesList({
  //   today: 17,
  //   promise: "నీవు నడవవలసిన త్రోవను నిన్ను నడిపించుదును. \n1.యెషయా  48:17"
  // });

var activatedLists = mongoose.model("activated_lists", activatedListsSchema);




module.exports = {"activatedLists":activatedLists,"promisesList":promisesList,"newpromisesList":newpromisesList};
