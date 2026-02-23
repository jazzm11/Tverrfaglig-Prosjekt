const visHjemmeside = (req, res) => {
    res.render('register', { title: 'Hjemmeside' });
}

module.exports = {
    visHjemmeside
};