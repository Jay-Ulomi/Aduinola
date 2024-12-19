const { render } = require("ejs")

exports.index = async (req,res) => {
    res.render('pages/home/index');
}