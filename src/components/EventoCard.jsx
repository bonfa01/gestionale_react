import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faCalendarAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const EventoCard = ({ evento, onApri, onElimina }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border hover:border-red-400 transition-all flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold text-red-600">{evento.nome_evento}</h2>
        <p className="text-gray-600 mb-1">{evento.descrizione}</p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <FontAwesomeIcon icon={faUserTie} /> Cliente: {evento.cliente}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <FontAwesomeIcon icon={faCalendarAlt} />
          Dal {evento.data_inizio?.split('T')[0]} al {evento.data_fine?.split('T')[0]}
        </p>
      </div>
      <div className="flex justify-between mt-4">
      <button
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => navigate(`/eventi/${evento.id}`)}
        >
          Apri evento
        </button>
        <button
          className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          onClick={() => onElimina(evento)}
          title="Elimina evento"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default EventoCard;
