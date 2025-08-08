import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DettaglioEvento = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [giorni, setGiorni] = useState([]);
  const [postazioni, setPostazioni] = useState([]);
  const [nomePostazione, setNomePostazione] = useState("");

  useEffect(() => {
    const fetchEvento = async () => {
      const res = await fetch(`http://localhost:3001/api/eventi/${id}`);
      const data = await res.json();
      setEvento(data);
    };

    const fetchGiorni = async () => {
      const res = await fetch(`http://localhost:3001/api/eventi/${id}/giorni`);
      const data = await res.json();
      setGiorni(data);
    };

    const fetchPostazioni = async () => {
      const res = await fetch(`http://localhost:3001/api/eventi/${id}/postazioni`);
      const data = await res.json();
      setPostazioni(data);
    };

    fetchEvento();
    fetchGiorni();
    fetchPostazioni();
  }, [id]);

  const aggiungiPostazione = async () => {
    if (!nomePostazione.trim()) return;
    const res = await fetch(`http://localhost:3001/api/eventi/${id}/postazioni`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomePostazione })
    });

    if (res.ok) {
      setNomePostazione("");
      const updated = await res.json();
      setPostazioni(prev => [...prev, updated]);
    }
  };

  if (!evento) return <p className="p-4">Caricamento evento...</p>;

  return (
    <div className="w-full inset-y-10 left-50">
      <div className="bg-white rounded-xl m-4 shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center mb-3">
              <i className="fas fa-user-tie text-red-500 mr-2"></i>
              <span className="text-gray-700">
                <span className="font-semibold text-gray-800">Cliente:</span> {evento.cliente}
              </span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-calendar-alt text-red-500 mr-2"></i>
              <span id="event-dates" className="text-gray-600">
                Dal {evento.data_inizio?.split("T")[0]} al {evento.data_fine?.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="m-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-calendar-day text-red-500 mr-2"></i> Giorni dell'evento
        </h2>

        <ul id="days-list" className="grid gap-4">
          {giorni.map((giorno) => {
            const dataObj = new Date(giorno.data);
            const nomeGiorno = dataObj.toLocaleDateString('it-IT', { weekday: 'long' });
            const nomeGiornoCapitalizzato = nomeGiorno.charAt(0).toUpperCase() + nomeGiorno.slice(1);

            return (
              <li
                key={giorno.id}
                className="bg-white rounded-xl shadow-sm px-6 py-5 flex justify-between items-center transition duration-300 hover:shadow-md"
                style={{ minWidth: '400pt' }}
              >
                <span className="font-medium text-gray-800 text-lg">
                  🗓️ {nomeGiornoCapitalizzato} - {giorno.data.split("T")[0]}
                </span>
                <Link
                  to={`/eventi/${id}/giorni/${giorno.id}`}
                  className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  ⊕ DETTAGLI
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-white rounded-xl m-4 shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-map-marker-alt text-red-500 mr-2"></i> Postazioni Evento
        </h2>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            className="flex-1 border text-gray-900 border-gray-300 rounded px-3 py-2"
            placeholder="Nome postazione es. Ingresso A"
            value={nomePostazione}
            onChange={(e) => setNomePostazione(e.target.value)}
          />
          <button
            onClick={aggiungiPostazione}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            + Aggiungi
          </button>
        </div>

        <ul className="space-y-2">
          {postazioni.map((p) => (
            <li key={p.id} className="bg-gray-50 px-4 py-2 rounded border text-gray-700">
              <i className="fas fa-map-pin text-red-500 mr-2"></i> {p.nome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DettaglioEvento;
