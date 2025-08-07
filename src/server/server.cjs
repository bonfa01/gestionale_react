const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3001;

// Connessione al database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123Password',
  database: 'lavoratori_db',
});

db.connect((err) => {
  if (err) {
    console.error('Errore di connessione al DB:', err);
    return;
  }
  console.log('✅ Connesso al database MySQL');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

/* ------------------------------------------
   CRUD LAVORATORI
------------------------------------------ */

// Crea lavoratore
app.post('/api/lavoratori', (req, res) => {
  const {
    nome, cognome, dataNascita, nazionalita, sesso, codiceFiscale,
    tipoDocumento, numeroDocumento, scadenzaDocumento,
    indirizzo, citta, provincia, cap
  } = req.body;

  const query = `
    INSERT INTO lavoratori 
    (nome, cognome, data_nascita, nazionalita, sesso, codice_fiscale,
    tipo_documento, numero_documento, scadenza_documento,
    indirizzo, citta, provincia, cap)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      nome, cognome, dataNascita, nazionalita, sesso, codiceFiscale,
      tipoDocumento, numeroDocumento, scadenzaDocumento,
      indirizzo, citta, provincia, cap
    ],
    (err) => {
      if (err) {
        console.error('❌ Errore nel salvataggio lavoratore:', err);
        return res.status(500).json({ message: 'Errore nel salvataggio lavoratore' });
      }
      res.status(201).json({ message: 'Lavoratore salvato con successo' });
    }
  );
});

// Recupera tutti i lavoratori
app.get('/api/lavoratori', (req, res) => {
  db.query('SELECT * FROM lavoratori', (err, results) => {
    if (err) {
      console.error('❌ Errore nel recupero lavoratori:', err);
      return res.status(500).json({ message: 'Errore nel recupero lavoratori' });
    }
    res.json(results);
  });
});

// Modifica lavoratore
app.put('/api/lavoratori/:id', (req, res) => {
  const id = req.params.id;
  const { nome, cognome, codice_fiscale } = req.body;

  const query = `
    UPDATE lavoratori
    SET nome = ?, cognome = ?, codice_fiscale = ?
    WHERE id = ?
  `;

  db.query(query, [nome, cognome, codice_fiscale, id], (err) => {
    if (err) {
      console.error('❌ Errore aggiornamento lavoratore:', err);
      return res.status(500).json({ message: 'Errore aggiornamento lavoratore' });
    }
    res.json({ message: 'Lavoratore aggiornato' });
  });
});

// Elimina lavoratore
app.delete('/api/lavoratori/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM lavoratori WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('❌ Errore eliminazione lavoratore:', err);
      return res.status(500).json({ message: 'Errore eliminazione lavoratore' });
    }
    res.json({ message: 'Lavoratore eliminato' });
  });
});

/* ------------------------------------------
   CRUD EVENTI
------------------------------------------ */

// Crea evento e genera giorni
app.post('/api/eventi', (req, res) => {
  const { nomeEvento, descrizione, cliente, dataInizio, dataFine } = req.body;

  const query = `
    INSERT INTO eventi (nome_evento, descrizione, cliente, data_inizio, data_fine)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [nomeEvento, descrizione, cliente, dataInizio, dataFine],
    (err, result) => {
      if (err) {
        console.error('❌ Errore salvataggio evento:', err);
        return res.status(500).json({ message: 'Errore salvataggio evento' });
      }

      const eventoId = result.insertId;
      const inizio = new Date(dataInizio);
      const fine = new Date(dataFine);

      const giorni = [];
      let current = new Date(inizio);

      while (current <= fine) {
        const formatted = current.toISOString().split('T')[0];
        giorni.push([eventoId, formatted]);
        current.setDate(current.getDate() + 1);
      }

      db.query(
        'INSERT INTO giorni_evento (evento_id, data) VALUES ?',
        [giorni],
        (err2) => {
          if (err2) {
            console.error('❌ Errore inserimento giorni evento:', err2);
            return res.status(500).json({ message: 'Errore giorni evento' });
          }

          res.status(201).json({
            message: 'Evento e giorni salvati con successo',
            eventoId,
          });
        }
      );
    }
  );
});

// Recupera tutti gli eventi
app.get('/api/eventi', (req, res) => {
  db.query('SELECT * FROM eventi', (err, results) => {
    if (err) {
      console.error('❌ Errore nel recupero eventi:', err);
      return res.status(500).json({ message: 'Errore nel recupero eventi' });
    }
    res.json(results);
  });
});

// Recupera giorni di un evento
app.get('/api/eventi/:id/giorni', (req, res) => {
  const eventoId = req.params.id;

  db.query(
    'SELECT * FROM giorni_evento WHERE evento_id = ? ORDER BY data',
    [eventoId],
    (err, results) => {
      if (err) {
        console.error('❌ Errore nel recupero giorni:', err);
        return res.status(500).json({ message: 'Errore nel recupero giorni' });
      }
      res.json(results);
    }
  );
});

/* ------------------------------------------
   AVVIO SERVER
------------------------------------------ */

app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
