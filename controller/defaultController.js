const visHjemmeside = (req, res) => {
    res.render('index', { title: 'Hjemmeside' });
}

module.exports = {
    visHjemmeside
};