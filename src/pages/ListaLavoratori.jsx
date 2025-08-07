import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  faPen,
  faTrash,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'cognome', label: 'Cognome' },
  { key: 'data_nascita', label: 'Data Nascita' },
  { key: 'nazionalita', label: 'Nazionalità' },
  { key: 'sesso', label: 'Sesso' },
  { key: 'codice_fiscale', label: 'Codice Fiscale' },
  { key: 'tipo_documento', label: 'Tipo Documento' },
  { key: 'numero_documento', label: 'Numero Documento' },
  { key: 'scadenza_documento', label: 'Scadenza Documento' },
  { key: 'indirizzo', label: 'Indirizzo' },
  { key: 'citta', label: 'Città' },
  { key: 'provincia', label: 'Provincia' },
  { key: 'cap', label: 'CAP' },
];

export default function ListaLavoratori() {
  const [lavoratori, setLavoratori] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    Object.fromEntries(columns.map(col => [col.key, true]))
  );
  const [filters, setFilters] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [lavoratoreDaEliminare, setLavoratoreDaEliminare] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/lavoratori')
      .then(res => setLavoratori(res.data))
      .catch(err => {
        console.error('Errore nel recupero:', err);
        alert('Errore nel recupero lavoratori');
      });
  }, []);

  const toggleColumn = (key) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredLavoratori = lavoratori.filter(lav =>
    columns.every(col => {
      const filterVal = filters[col.key]?.toLowerCase() || '';
      return lav[col.key]?.toLowerCase().includes(filterVal);
    })
  );

  const chiediEliminazioneLavoratore = (lav) => {
    // conferma semplice con alert
    if(window.confirm(`Sei sicuro di voler eliminare ${lav.nome} ${lav.cognome}?`)){
      eliminaLavoratore(lav.id);
    }
  };

  const eliminaLavoratore = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/lavoratori/${id}`);
      if (res.status === 200) {
        setLavoratori(prev => prev.filter(l => l.id !== id));
        alert('Lavoratore eliminato con successo');
      } else {
        alert("Errore durante l'eliminazione");
      }
    } catch (err) {
      console.error(err);
      alert("Errore di rete durante l'eliminazione");
    }
  };

  const [lavoratoreDaModificare, setLavoratoreDaModificare] = useState(null);

const salvaModifiche = async () => {
  try {
    const res = await axios.put(`http://localhost:3001/api/lavoratori/${lavoratoreDaModificare.id}`, lavoratoreDaModificare);
    if (res.status === 200) {
      setLavoratori(prev =>
        prev.map(l =>
          l.id === lavoratoreDaModificare.id ? lavoratoreDaModificare : l
        )
      );
      setLavoratoreDaModificare(null);
      alert("Lavoratore aggiornato con successo");
    } else {
      alert("Errore durante il salvataggio");
    }
  } catch (err) {
    console.error(err);
    alert("Errore di rete durante il salvataggio");
  }
};

  return (
    <div className="p-2 bg-white min-h-screen text-gray-800">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        <i className="fas fa-users text-red-700 mr-2"></i> Lista Lavoratori
      </h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2 text-grey-900">Seleziona colonne da visualizzare:</h2>
        
        <div className=" snap-x space-x-2 flex overflow-x-auto pb-2">
          {columns.map(col => (
            <button
              key={col.key}
              className={`min-w-[120px] h-12 flex items-center justify-center text-sm px-3 rounded shadow whitespace-nowrap transition 
                ${visibleColumns[col.key] ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700'}`}
              onClick={() => toggleColumn(col.key)}
            >
              <FontAwesomeIcon icon={visibleColumns[col.key] ? faEye : faEyeSlash} className="mr-1" />
              {col.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded shadow">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              {columns.map(col =>
                visibleColumns[col.key] && (
                  <th key={col.key} className="p-2 text-left">{col.label}</th>
                )
              )}
              <th className="p-2 text-center">Azioni</th>
            </tr>
            
            <tr className="bg-white text-sm text-gray-700">
              {columns.map(col =>
                visibleColumns[col.key] && (
                  <th key={col.key} className="p-2">
                    <input
                      type="text"
                      placeholder={`...`}
                      className="p-1 w-full border rounded"
                      value={filters[col.key] || ''}
                      onChange={(e) => handleFilterChange(col.key, e.target.value)}
                    />
                  </th>
                )
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredLavoratori.map((lav) => (
              <tr
                key={lav.id} 
                onClick={() => setSelectedId(selectedId === lav.id ? null : lav.id)}  
                className={`border-t cursor-pointer transition-colors 
                ${selectedId === lav.id ? 'bg-amber-200' : 'hover:bg-amber-50' }`}
              >
                {columns.map(col =>
                  visibleColumns[col.key] && (
                    <td key={col.key} className="p-2">{lav[col.key]}</td>
                  )
                )}
                <td className="p-2 text-center space-x-2">
                  <button 
                    className="text-amber-600 hover:text-amber-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLavoratoreDaModificare(lav);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      chiediEliminazioneLavoratore(lav);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {lavoratoreDaModificare && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow w-full max-w-xl relative">
      <h2 className="text-xl font-bold mb-4">Modifica Lavoratore</h2>

      <div className="grid grid-cols-2 gap-4">
        {columns.map(col => (
          <div key={col.key} className="flex flex-col">
            <label className="text-sm font-medium">{col.label}</label>
            <input
              type="text"
              className="border p-2 rounded"
              value={lavoratoreDaModificare[col.key] || ''}
              onChange={(e) =>
                setLavoratoreDaModificare(prev => ({
                  ...prev,
                  [col.key]: e.target.value
                }))
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={() => setLavoratoreDaModificare(null)}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Annulla
        </button>
        <button
          onClick={salvaModifiche}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Salva
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
