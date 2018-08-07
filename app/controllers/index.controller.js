exports.render = function(req, res) {
    var isLoggedIn = false;
    var title = 'Hello World';

    //Check cookis sessions ------------------------------------>
    if (typeof req.session.remember !== 'undefined') {
        isLoggedIn = req.session.remember;
        title = title + req.session.email;
    }
    // --------------------------------------------------------->

    res.render('index', {
        'title': title,
        isLoggedIn: isLoggedIn
    })
}