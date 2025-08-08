import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import EventoCard from "../components/EventoCard";


const ListaEventi = () => {
  const [eventi, setEventi] = useState([]);
  const [eventoDaEliminare, setEventoDaEliminare] = useState(null);
  const [modalErrore, setModalErrore] = useState({ isOpen: false, message: "" });

  useEffect(() => {
    fetch("http://localhost:3001/api/eventi")
      .then((res) => res.json())
      .then((data) => setEventi(data))
      .catch((err) => console.error("Errore nel recupero eventi:", err));
  }, []);

  const apriEvento = (evento) => {
    console.log("Evento selezionato:", evento);
  };

  const chiediEliminazioneEvento = (evento) => {
    setEventoDaEliminare(evento);
  };

  const confermaEliminazione = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/eventi/${eventoDaEliminare.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setEventi(prev => prev.filter(e => e.id !== eventoDaEliminare.id));
        setEventoDaEliminare(null);
      } else {
        const data = await res.json();
        setModalErrore({ isOpen: true, message: data.message || "Errore durante l'eliminazione" });
        setEventoDaEliminare(null);
      }
    } catch (err) {
      console.error('Errore:', err);
      setModalErrore({ isOpen: true, message: "Errore di rete" });
      setEventoDaEliminare(null);
    }
  };

  const annullaEliminazione = () => {
    setEventoDaEliminare(null);
  };

  const chiudiErrore = () => {
    setModalErrore({ isOpen: false, message: "" });
  };

  return (
    <div className="w-screen px-8 py-10 bg-white min-h-screen transition-[margin-left] duration-300 ease-in-out">
      <div className="sticky top-0 z-10 bg-white py-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          <FontAwesomeIcon icon={faList} className="text-red-700 mr-2" />
          Lista Eventi
        </h1>
      </div>

      {eventi.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">Nessun evento trovato.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {eventi.map((evento) => (
            <EventoCard 
              key={evento.id} 
              evento={evento} 
              onApri={apriEvento} 
              onElimina={() => chiediEliminazioneEvento(evento)} 
            />
          ))}
        </div>
      )}
      {eventoDaEliminare && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white text-gray-900 p-6 rounded shadow-md max-w-md w-full">
          <h2 className="text-lg  font-semibold mb-4">Conferma eliminazione</h2>
          <p>Sei sicuro di voler eliminare l'evento <strong>{eventoDaEliminare.nome}</strong>?</p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={annullaEliminazione}
            >
              Annulla
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={confermaEliminazione}
            >
              Elimina
            </button>
          </div>
        </div>
      </div>
    )}

    </div>
  );
};

export default ListaEventi;
 