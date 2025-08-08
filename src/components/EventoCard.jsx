import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faCalendarAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const EventoCard = ({ evento, onApri, onElimina }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border hover:border-red-600 transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between mt-4">
        <h2 className="mt-2 text-xl font-semibold text-red-700">{evento.nome_evento}</h2>
        <button className="px-4 py-1 text-gray-700  hover:bg-gray-400 transition"
          onClick={() => onElimina(evento)}
          title="Elimina evento">
          <FontAwesomeIcon icon={faTrash} />
      </button>
      </div>
        <p className="text-gray-600 mb-1">{evento.descrizione}</p>
        <p className="text-sm text-gray-900 flex items-center gap-1">
          <FontAwesomeIcon className="text-red-700" icon={faUserTie} /><b>Cliente: </b> {evento.cliente}
        </p>
        <p className="text-sm text-gray-900 flex items-center gap-1">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <b>Dal</b> {evento.data_inizio?.split('T')[0]}<b>al</b> {evento.data_fine?.split('T')[0]}
        </p>
      </div>
      <div >
      <div className=" flex justify-center ">
        <button className="w-full bg-red-500 text-white rounded hover:bg-red-700 transition"
          onClick={() => navigate(`/eventi/${evento.id}`)}>Apri dettagli evento</button></div>
      
      </div>
    </div>
  );
};

export default EventoCard;
