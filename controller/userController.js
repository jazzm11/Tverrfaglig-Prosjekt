const User = require('../models/userModel');
// GET
const visLoginside = (req, res) => {
    res.render('login', { title: 'Logg inn' });
}
const visRegistreringsside = (req, res) => {
    res.render('register', { title: 'Registrer' });
}

// POST
const loginPost = async (req, res) => {
    try {
        const { brukernavn, passord } = req.body;
        const userRecord = await User.findOne({ brukernavn });
        if (!userRecord) {
            return res.status(400).send('Brukernavn eller passord er feil');
        }

        const user = await userRecord.comparePassword(passord);
        if (user) {
            req.session.user = userRecord._id; // Store user ID in session
            res.redirect('/');
            console.log('Bruker logget inn:', userRecord.brukernavn);
        } else {
            res.status(400).send('Brukernavn eller passord er feil');
        }
    } catch (error) {
        res.status(500).render('error', { error: error.message, title: 'Feil' });
        console.error('Feil ved innlogging:', error);
    }
}

const registerPost = async (req, res) => {
    try {
        const { brukernavn, passord, passord2} = req.body;
        if (passord !== passord2) {
            return res.status(400).send('Passordene matcher ikke');
        }
        
        const newUser = new User({ brukernavn, passord });
        const saved = await newUser.save();
        if (saved) {
            res.redirect('/login');
            console.log('Ny bruker registrert:', saved.brukernavn);
        } else {
            res.status(400).send('Feil ved registrering');
        }

    } catch (error) {
        res.status(500).render('error', { error: error.message, title: 'Feil' });
        console.error('Feil ved registrering:', error);
    }
};

module.exports = {
    visLoginside,
    visRegistreringsside,
    loginPost,
    registerPost
};