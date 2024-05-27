const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://pc032003:6S8orUvkYtSjtt8Z@rentify.dkvyynw.mongodb.net/?retryWrites=true&w=majority&appName=Rentify', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
