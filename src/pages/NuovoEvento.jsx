import { useState } from "react";

const NuovoEvento = () => {
  const [formData, setFormData] = useState({
    nomeEvento: "",
    descrizione: "",
    cliente: "",
    dataInizio: "",
    dataFine: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/eventi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Evento salvato con successo!");
        setFormData({
          nomeEvento: "",
          descrizione: "",
          cliente: "",
          dataInizio: "",
          dataFine: "",
        });
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      alert("Errore di rete o server non disponibile.");
    }
  };

  return (
    <div className=" mt-4 min-w-4xl bg-white min-h-screen transition-[margin-left] duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        <i className="fas fa-calendar-alt text-red-700 mr-2"></i> Nuovo Evento
      </h1>

      <div className=" p-8 transition-all duration-300 max-w-3xl mx-auto">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <Input
            label="Nome Evento"
            name="nomeEvento"
            value={formData.nomeEvento}
            onChange={handleChange}
          />
          <Input
            label="Descrizione"
            name="descrizione"
            value={formData.descrizione}
            onChange={handleChange}
            type="textarea"
          />
          <Input
            label="Cliente"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
          />
          <Input
            label="Data Inizio"
            name="dataInizio"
            value={formData.dataInizio}
            onChange={handleChange}
            type="date"
          />
          <Input
            label="Data Fine"
            name="dataFine"
            value={formData.dataFine}
            onChange={handleChange}
            type="date"
          />

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              onClick={() =>
                setFormData({
                  nomeEvento: "",
                  descrizione: "",
                  cliente: "",
                  dataInizio: "",
                  dataFine: "",
                })
              }
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors duration-200"
            >
              Salva Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, name, type = "text", value, onChange }) => {
  if (type === "textarea") {
    return (
      <div>
        <label htmlFor={name} className="block font-medium mb-2 text-gray-600">
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-700"
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={name} className="block font-medium mb-2 text-gray-600">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-700"
      />
    </div>
  );
};

export default NuovoEvento;