# WCAG Vurderingssystem

Et nettsted hvor brukere kan dele og lese WCAG-vurderinger av nettsteder. Systemet tillater brukere å publisere nettsteder, gi vurderinger og reagere på andres vurderinger, med administrator-moderering av innhold.

---

## 🌐 Nettverksarkitektur

```
┌─────────────────────────────────────────────────────────────┐
│                     INTERNET / BRUKERE                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         ▼
        ┌────────────────────────────────┐
        │   Webserver (Node.js/Express)  │
        │      IP: 10.12.9.60:3000       │
        │    - app.js                    │
        │    - Controllers               │
        │    - Routes                    │
        │    - Views (EJS)               │
        └────────┬───────────────────────┘
                 │
                 │ MONGO_URI
                 │ Connection
                 ▼
        ┌────────────────────────────────┐
        │      MongoDB Database          │
        │    IP: 10.12.9.40:27017        │
        │    Database: vurderingDB       │
        │  - Users                       │
        │  - Websites                    │
        │  - Reviews (WCAG)              │
        │  - Reports/Reactions           │
        └────────────────────────────────┘

        ┌────────────────────────────────┐
        │        DNS Server              │
        │      IP: 10.12.9.65:53         │
        │    - Domain Resolution         │
        └────────────────────────────────┘
```

---

## 🏗️ Teknisk Infrastruktur

| Komponent | IP-adresse | Port | Funksjon |
|-----------|-----------|------|----------|
| **Webserver** | 10.12.9.60 | 3000 | Node.js Express-applikasjon |
| **MongoDB** | 10.12.9.40 | 27017 | Database – brukerdata, vurderinger, nettsteder |
| **DNS** | 10.12.9.65 | 53 | Navnoppløsning og domenehåndtering |

### Miljøvariabler (.env)
```env
MONGO_URI=mongodb://10.12.9.40:27017/vurderingDB
SESSION_SECRET=jazzjazzjazz
```

---

## 🚀 Installasjon og Setup

### Forutsetninger
- Node.js v14+ (eller høyere)
- MongoDB kjørende på `10.12.9.40:27017`
- NPM eller Yarn
- Git (for versjonskontroll)

### Steg 1: Klone eller last ned prosjektet
```bash
git clone <repository-url>
cd tverrfaglig_prosjekt
```

### Steg 2: Installer avhengigheter
```bash
npm install
```

### Steg 3: Konfigurer miljøvariabler
Opprett eller rediger `.env`-fil i rotmappen:
```env
MONGO_URI=mongodb://10.12.9.40:27017/vurderingDB
SESSION_SECRET=din_hemmelighet_her
```

### Steg 4: Verifiser MongoDB-tilkobling
Sjekk at MongoDB kjører på:
```
mongodb://10.12.9.40:27017
```

### Steg 5: Start serveren
```bash
node app.js
```

**Output:**
```
Server is running on port 3000
```

Åpne nettleseren og gå til:
```
http://10.12.9.60:3000
```

---

## 📞 Brukerstøtte

### Kommunikasjonsplan
Brukere kan få hjelp via tre kanaler:

| Kanal | Bruk | Responstid |
|-------|------|------------|
| **FAQ-side** | Vanlige spørsmål – `/faq` | Umiddelbar |
| **Kontakt-epost** | Generelle henvendelser | 24–48 timer |
| **Administrator** | Moderering og problemer | 24–48 timer |

### Innebygget hjelpesystem

#### 📚 **FAQ-side** (`/faq`)
Inneholder svar på:
- Hvordan publisere et nettsted?
- Hva er WCAG og vurderingskriterier?
- Hvordan opprettet jeg en bruker?
- Hvordan gir jeg en vurdering?

#### 📝 **Forklarende tekster**
Hver side har:
- Klare instruksjoner under overskrifter
- Hjelpetekster og tooltips i skjemaer
- Brukervennlige feiltilbakemeldinger

#### 🎯 **Skjema med instruksjoner**
- **Registrering:** Krav til brukernavn (3-20 tegn) og passord (8+ tegn)
- **Nettsted-opprettelse:** Fyll inn URL, navn og beskrivelse
- **WCAG-vurdering:** Velg nivå (A / AA / AAA) og skriv kommentarer

### Forebyggende tiltak
- Valideringsfeil vises umiddelbart i skjemaer
- Passord sjekkes for styrke
- Duplikate brukernavn avvises

---

## 📋 Systembeskrivelse

### Formål
Systemet tillater:
- **Publisering av nettsteder** – Brukere kan legge til nettsteder som skal vurderes
- **WCAG-vurderinger** – Brukere gir tilgjengelighetsanmeldelser av nettsteder
- **Interaksjon** – Brukere kan reagere på og kommentere på vurderinger
- **Modereringsystem** – Administratorer modererer innhold for kvalitetskontroll

### Beregnet tidsbruk
| Oppgave | Tid |
|---------|-----|
| Planlegging | 5 t |
| Frontend | 10 t |
| Testing | 5 t |
| Dokumentasjon | 5 t |
| **Totalt** | **25 t** |

---

## 🏗️ Prosjektstruktur

```
.
├── app.js                          # Hovedapplikasjon
├── package.json                    # Avhengigheter
├── .env                            # Miljøvariabler
├── config/
│   └── db.js                       # MongoDB-konfigurasjon
├── controller/
│   ├── defaultController.js        # Visning av statiske sider (FAQ, hjem, error)
│   ├── userController.js           # Brukerautentisering og profil
│   └── vurderingController.js      # WCAG-vurderinger
├── middleware/
│   └── auth.js                     # Autentiserings-middleware
├── models/
│   ├── userModel.js                # Brukermodell
│   ├── reportModel.js              # Nettsted-rapportmodell
│   ├── websiteModel.js             # Nettsted-modell
│   └── vurderModel.js              # Vurderingsmodell
├── router/
│   ├── defaultRouter.js            # Ruter for statiske sider
│   ├── userRouter.js               # Ruter for brukeroperasjoner
│   └── vurderingRouter.js          # Ruter for vurderinger
├── views/                          # EJS-templates
│   ├── index.ejs                   # Hjemmeside
│   ├── login.ejs                   # Innloggingsform
│   ├── register.ejs                # Registreringsform
│   ├── profil.ejs                  # Brukerprofil
│   ├── nettsider.ejs               # Liste over nettsteder
│   ├── rapporter.ejs               # Vurderinger
│   ├── vurdering.ejs               # Vurderingsskjema
│   ├── faq.ejs                     # FAQ-side
│   ├── error.ejs                   # Feilside
│   └── partials/                   # Gjenbrukbare komponenter
│       ├── header.ejs
│       ├── navbar.ejs
│       └── footer.ejs
└── public/                         # Statiske filer
    ├── css/                        # Stilark
    └── js/                         # Klientside-JavaScript
```

---

## 💻 Kodeforklaring

### **app.js** – Hovedapplikasjon
Setter opp Express-serveren med:
- Session-håndtering for autentisering
- EJS som template-motor
- Static file-serving fra `/public`
- MongoDB-tilkobling
- Rute-registrering

```javascript
const app = express();
app.set("view engine", "ejs");
app.use(session({ secret: process.env.SESSION_SECRET, ... }));
```

### **config/db.js** – Database
Kobler til MongoDB via URI fra `.env`:
```javascript
MONGO_URI='mongodb://10.12.9.40:27017/vurderingDB'
```

### **Models** – Datamodeller

#### **userModel.js**
Brukermodell med:
- `brukernavn` – Unik identifikator
- `passord` – Kryptert (bcrypt)
- `role` – (admin / bruker)
- `comparePassword()` – Verifiserer passord

#### **websiteModel.js**
Nettsted som skal vurderes:
- URL
- Navn
- Beskrivelse
- Opprettet av bruker

#### **vurderModel.js**
WCAG-vurdering:
- Referanse til nettsted
- Opprettet av bruker
- Vurderingskriteria (WCAG A/AA/AAA)
- Kommentarer

#### **reportModel.js**
Reaksjoner/rapporter på vurderinger:
- Kommentarer
- Likes/nedlasting

### **Controllers** – Forretningslogikk

#### **defaultController.js**
Handler statiske sider:
- `visHjemmeside()` – Render hjemmeside
- `visFaqSide()` – FAQ-side
- `visErrorSide()` – Feilside

#### **userController.js**
Håndterer autentisering:
- `loginPost()` – Innlogging med sessjon
- `registerPost()` – Ny brukerregistrering
- `logout()` – Logg ut og ødelegg sessjon
- `visProfilSide()` – Vis brukerprofil

**Merk:** Sessjondata lagres i `req.session`:
```javascript
req.session.userID = userId;
req.session.username = username;
req.session.role = role;
```

#### **vurderingController.js**
Håndterer WCAG-vurderinger:
- Opprettelse av vurdering
- Lesing av vurderinger
- Reactions/kommentarer

### **Routes** – URL-mapping

#### **defaultRouter.js**
```javascript
GET  /          → vis hjemmeside
GET  /faq       → vis FAQ
GET  /error     → vis feilside
```

#### **userRouter.js**
```javascript
GET  /login     → vis login-form
POST /login     → prosess login
GET  /register  → vis register-form
POST /register  → prosess registrering
GET  /logout    → logg ut
GET  /profil    → vis profil (auth-beskyttet)
```

#### **vurderingRouter.js**
```javascript
GET  /nettsider          → lista nettsteder
POST /nettsider/opprett  → legg til nettsted
GET  /vurdering/:id      → vis vurderinger for nettsted
POST /vurdering          → opprett vurdering
GET  /rapporter          → lista alle vurderinger
```

### **Middleware** – auth.js
Autentiseringsmiddleware:
```javascript
const auth = (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect('/login');
  }
  next();
};
```

Brukes på beskyttede ruter som `/profil` og `/vurdering`.

---

## 👥 Brukerroller

### **Vanlig bruker**
- Registrer deg
- Publiser nettsteder
- Opprett WCAG-vurderinger
- Kommentér andres vurderinger

### **Administrator**
- Moderer innhold
- Kan slette misbrukende vurderinger
- Administrerer brukere

---

## 🔒 Sikkerhet

- **Passord:** Kryptert med bcrypt
- **Sesjoner:** Express-session med hemmelighet
- **Autentisering:** Session-basert
- **HTTPS:** Anbefalt for produksjon (sett `cookie: { secure: true }` i app.js)

---

## 🐛 Kjente problemer og løsninger

### Problem: "Brukeren finnes ikke" ved login
**Løsning:** Sjekk at brukernavn og passord er riktig registrert.

### Problem: Sessjon blir ikke lagret
**Løsning:** Sjekk at `SESSION_SECRET` er satt i `.env`

### Problem: Kan ikke koble til MongoDB
**Løsning:** Verifiser at MongoDB kjører på `10.12.9.40:27017` og databasenavn er `vurderingDB`

---

## 📝 Lisens

Tverrfaglig prosjekt – 2026

---

## 📞 Kontakt

For spørsmål eller support, kontakt administrator eller bes om hjelp via FAQ-siden.
