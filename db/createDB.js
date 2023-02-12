import { createClassicConnexion } from "./connexion.js";

(async () => {
  try {
    const connexion = await createClassicConnexion();
    await connexion.query("DROP TABLE IF EXISTS Tendances_actuelles");

    //{id: 1, tache: "tach 1", action: "en cours", date: "avant le "}
    await connexion.query(`CREATE TABLE IF NOT EXISTS Tendances_actuelles(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            link VARCHAR(255) NOT NULL

        )`);

    connexion.query(`INSERT INTO Tendances_actuelles (link)
            VALUES
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p1.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p2.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p3.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p4.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p5.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p6.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p7.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p8.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p9.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p10.PNG?raw=true")
        `);

    /*******************Series violentes******************* */
    await connexion.query("DROP TABLE IF EXISTS series_violentes");

    //{id: 1, tache: "tach 1", action: "en cours", date: "avant le "}
    await connexion.query(`CREATE TABLE IF NOT EXISTS series_violentes(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            link VARCHAR(255) NOT NULL

        )`);

    connexion.query(`INSERT INTO series_violentes (link)
            VALUES
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t1.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t2.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t3.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t4.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t5.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t6.PNG?raw=true")

        `);

    /*******************Action_aventure******************* */

    await connexion.query("DROP TABLE IF EXISTS actions_aventure");

    //{id: 1, tache: "tach 1", action: "en cours", date: "avant le "}
    await connexion.query(`CREATE TABLE IF NOT EXISTS actions_aventure(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            link VARCHAR(255) NOT NULL

        )`);
    connexion.query(`INSERT INTO actions_aventure (link)
            VALUES
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m1.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m2.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m3.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m4.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m5.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m6.PNG?raw=true")

        `);
    connexion.query(`INSERT INTO series_violentes (link)
            VALUES

                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m6.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m5.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m3.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p4.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m2.PNG?raw=true"),
                ("https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m1.PNG?raw=true")

    `);

    await connexion.query("DROP TABLE IF EXISTS users");

    //{id: 1, tache: "tach 1", action: "en cours", date: "avant le "}
    await connexion.query(`CREATE TABLE IF NOT EXISTS users(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL

        )`);

    connexion.close();
  } catch (e) {
    console.error(e);
  }
})();
