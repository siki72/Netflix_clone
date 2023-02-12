import express from "express";
import ejs from "ejs";
import path, { join } from "path";
import { poolConnexion } from "./db/connexion.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import { cwd } from "process";
import { titres } from "./data.js";
import argon2 from "argon2";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// ejs config
app.engine("html", ejs.__express);
app.set("views", path.join(process.cwd(), "templates"));

// session config

app.use(
  session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60,
      secure: false,
    },
  })
);

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// includes statics files
app.use(express.static(path.join(process.cwd(), "public")));

// routres protections
const protection = (req, res, next) => {
  if (!req.session.idutilisateur) {
    res.redirect("/connexion");
  } else {
    next();
  }
};

// stocker user en mémoire tampon
app.use(async (req, res, next) => {
  const { idutilisateur } = req.session;
  if (idutilisateur) {
    const [users] = await poolConnexion().query(
      "SELECT * FROM users WHERE users.id = ?",
      [req.session.idutilisateur]
    );
    res.locals.connectedUser = users;
  }
  next();
});

app.get("/", protection, async (req, res) => {
  const { connectedUser } = res.locals;
  const [td] = await poolConnexion().query(
    `SELECT link FROM Tendances_actuelles`
  );
  const [sv] = await poolConnexion().query(`SELECT link FROM series_violentes`);
  const [av] = await poolConnexion().query(`SELECT link FROM actions_aventure`);
  res.status(200).render("home.html", { td, sv, av, titres, connectedUser });
});

app.post("/inscription", async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const [user] = await poolConnexion().query(
      `SELECT email FROM users WHERE email = ?`,
      [email]
    );

    if (!user.length) {
      const hash = await argon2.hash(password);
      const [info] = await poolConnexion().query(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hash]
      );
      let newUser = {
        id: info.insertId,
        name,
        email,
        hash,
      };

      req.session.idutilisateur = newUser.id;
      return res.redirect("/");
    } else {
      res.redirect("/connexion");
    }
  }
});

app.post("/connexion", async (req, res) => {
  const { connectedUser } = res.locals;
  const { email, password } = req.body;

  if (email && password) {
    const [user] = await poolConnexion().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user) {
      const validPass = await argon2.verify(user[0].password, password);
      if (validPass) {
        req.session.idutilisateur = user[0].id;
        return res.redirect("/");
      } else {
        console.log("mdp incorrect");
      }
    } else {
      console.log("user n'existe pas");
    }
  }
  if (users[0]) {
    req.session.idutilisateur = users[0].id;
    return res.redirect("/");
  }
  res.render("connexion.html", { connectedUser });
});

app.post("/deconnexion", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie(process.env.SESSION_NAME);
    return res.redirect("/");
  });
});

app.get("/connexion", async (req, res) => {
  const { connectedUser } = res.locals;

  if (req.session.idutilisateur) {
    res.redirect("/");
  } else {
    res.render("connexion.html", { connectedUser });
  }
});

app.get("/inscription", async (req, res) => {
  const { connectedUser } = req.session;
  if (req.session.idutilisateur) {
    res.redirect("/");
  }
  res.render("inscription.html", { connectedUser });
});

app.use((req, res) => {
  res.status(404).render("error404.html");
});

app.listen(PORT, () => {
  console.log(`listen on PORT: ${PORT}`);
});
