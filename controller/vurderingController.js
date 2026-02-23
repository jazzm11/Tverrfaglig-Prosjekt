const Website = require('../models/websiteModel');

// GET
const visOpprettNettsted = (req, res) => {
    res.render('opprett', {
        title: 'Opprett Nettsted',
        user: req.session.username,
        css: 'opprett.css'
    });
};

const visNettsider = async (req, res) => {
    try {
        const nettsider = await Website.find().sort({ createdAt: -1 });
        res.render('nettsider', {
            title: 'Nettsider',
            user: req.session.username,
            css: 'nettsider.css',
            nettsider
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Feil',
            message: 'Det oppsto en feil ved innlastning av nettsider.',
            css: null
        });
    }
};

// POST
const opprettNettsted = (req, res) => {
    try {
        const { navn, lenke, bilde, beskrivelse, dato } = req.body;
        const nyttNettsted = new Website({
            navn,
            lenke,
            bilde,
            beskrivelse,
            timestamps: dato,
            publisertAv: req.session.username
        });
        nyttNettsted.save();
        console.log('Nettsiden lagt inn')
        res.redirect('/nettsider');

    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Feil',
            message: 'Det oppsto en feil ved opprettelse av nettstedet.',
            css: null
        });
    }
};


module.exports = {
    visOpprettNettsted,
    opprettNettsted,
    visNettsider
};