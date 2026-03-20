# TopRox Project SRL – Website

Website oficial TopRox Project SRL, construit în React.

## 🚀 Deploy pe Netlify via GitHub

### Pasul 1 – Adaugă logo-ul
Copiază fișierul `Logo_TopRoxProject_transparent_1.png` în:
```
public/images/logo.png
```

### Pasul 2 – Inițializează Git local
```bash
git init
git add .
git commit -m "Initial commit – TopRox Website"
```

### Pasul 3 – Creează repo pe GitHub
1. Mergi pe [github.com](https://github.com) → **New repository**
2. Numește-l `toprox-website` (sau orice alt nume)
3. Nu bifa README / .gitignore (le avem deja)
4. Apasă **Create repository**

### Pasul 4 – Push pe GitHub
```bash
git remote add origin https://github.com/USERNAME/toprox-website.git
git branch -M main
git push -u origin main
```

### Pasul 5 – Conectează Netlify
1. Mergi pe [app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import an existing project** → **GitHub**
3. Selectează repo-ul `toprox-website`
4. Setările de build sunt detectate automat din `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Apasă **Deploy site**

### Pasul 6 – Domeniu propriu
1. În Netlify → **Domain settings** → **Add custom domain**
2. Introdu domeniul tău (ex: `toproxproject.ro`)
3. Urmează instrucțiunile DNS (sunt deja configurate dacă ai setat domeniul anterior)

---

## 🔗 Social Media – Actualizare linkuri
Deschide fișierul `src/components/Social.js` și înlocuiește `href: '#'` cu linkurile reale:

```js
link: 'https://facebook.com/TopRoxProject',
link: 'https://linkedin.com/company/toprox-project',
link: 'https://instagram.com/toproxproject',
link: 'https://youtube.com/@TopRoxProject',
```

Apoi fă un nou commit și push — Netlify va redeploya automat.

---

## 📬 Formular de contact – Netlify Forms
Formularul folosește **Netlify Forms** (gratuit, inclus în Netlify).
Mesajele primite vor apărea în Netlify Dashboard → **Forms**.
Poți activa notificări pe email din **Forms → Form notifications**.

---

## 🛠️ Development local
```bash
npm install
npm start
```

## 📦 Build pentru producție
```bash
npm run build
```

---

## 📁 Structura proiectului
```
toprox-website/
├── public/
│   ├── index.html
│   └── images/
│       └── logo.png          ← adaugă logo-ul aici!
├── src/
│   ├── components/
│   │   ├── Navbar.js / .css
│   │   ├── Hero.js / .css
│   │   ├── About.js / .css
│   │   ├── Services.js / .css
│   │   ├── Portfolio.js / .css
│   │   ├── Testimonials.js / .css
│   │   ├── Social.js / .css
│   │   ├── Contact.js / .css
│   │   └── Footer.js / .css
│   ├── App.js / .css
│   ├── index.js
│   └── index.css
├── netlify.toml
├── package.json
└── .gitignore
```

---

*© 2026 TopRox Project SRL · toproxproject@gmail.com · Sibiu, România*
