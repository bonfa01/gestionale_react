import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DettaglioEvento = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [giorni, setGiorni] = useState([]);

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

    fetchEvento();
    fetchGiorni();
  }, [id]);

  if (!evento) return <p className="p-4">Caricamento evento...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        {evento.nome_evento}
      </h1>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Cliente:</span> {evento.cliente}
      </p>
      <p className="text-gray-700 mb-1">{evento.descrizione}</p>
      <p className="text-sm text-gray-500 mb-6">
        Dal {evento.data_inizio?.split("T")[0]} al {evento.data_fine?.split("T")[0]}
      </p>

      <h2 className="text-xl font-semibold mb-4 text-red-500">📅 Giorni dell'evento</h2>
      <ul className="space-y-3">
        {giorni.map((giorno) => (
          <li
            key={giorno.id}
            className="border rounded-xl p-4 bg-white flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            <span className="font-medium text-gray-800">🗓️ {giorno.data}</span>
            <Link
              to={`/eventi/${id}/giorni/${giorno.id}`}
              className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
            >
              ➕ Aggiungi postazioni/lavoratori
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DettaglioEvento;
