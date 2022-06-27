const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://root:daBallerSquad98$@dacluster0.x22ip.mongodb.net/ballersquad?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(error) {
    if (error) {
        console.error('Unable to connect: ', error);
    } else {
        console.log('Connected to MongoDB');
    }
});




//Schema for the users "table" in our mongodb
let Schema = mongoose.Schema;
let userSchema = new Schema({
    email: String,
    user: String,
    password: String
}, {
    collection: 'users'
});

//Schema for the highscores "table" in our mongodb
let highscoreSchema = new Schema({
    user: String,
    score: Number,
    level: String,
    time: String
}, {
    collection: 'highscores'
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.Highscore = mongoose.model('Highscore', highscoreSchema);

