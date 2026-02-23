const visHjemmeside = (req, res) => {
    res.render('index', { title: 'Hjemmeside', user: req.session.username});
}

module.exports = {
    visHjemmeside
};