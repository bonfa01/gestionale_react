import { useState } from "react";


const NuovoLavoratore = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    dataNascita: "",
    nazionalita: "",
    sesso: "",
    codiceFiscale: "",
    tipoDocumento: "",
    numeroDocumento: "",
    scadenzaDocumento: "",
    fileDocumento: "",
    indirizzo: "",
    citta: "",
    provincia: "",
    cap: "",
  });

  const [modalInfo, setModalInfo] = useState({ isOpen: false, message: "" });
  const [modalErrore, setModalErrore] = useState({ isOpen: false, message: "" });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0]?.name || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/lavoratori", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      

      if (response.ok) {
        setModalInfo({ isOpen: true, message: "Lavoratore salvato con successo!" });
        resetForm();
      } else {
        setModalErrore({
          isOpen: true,
          message: data.message || "Errore durante il salvataggio.",
        });
      }
    } catch (error) {
      console.error("Errore:", error);
      setModalErrore({
        isOpen: true,
        message: "Errore di rete o server non disponibile.",
      });
    }
  };

  const Select = ({ label, name, value, onChange, options, icon }) => (
    <div>
      <label htmlFor={name} className="block font-medium mb-2 text-gray-600">
        {icon && <i className={`fas ${icon} mr-1 text-red-600`}></i>} {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-700"
      >
        <option value="">Seleziona</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="mt-2 w-max bg-white min-h-screen transition-[margin-left] duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        <i className="fas fa-user-plus text-red-700 mr-2"></i> Nuovo Lavoratore
      </h1>

      <div className="bg-white rounded-xl  p-8 transition-all duration-300 max-w-7xl mx-auto">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>

          {/* Sezione dati personali */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input label="Nome" name="nome" value={formData.nome} onChange={handleChange} icon="fa-user" />
            <Input label="Cognome" name="cognome" value={formData.cognome} onChange={handleChange} icon="fa-user" />
            <Input label="Data di Nascita" name="dataNascita" type="date" value={formData.dataNascita} onChange={handleChange} icon="fa-calendar-alt" />
            <Input label="Nazionalità" name="nazionalita" value={formData.nazionalita} onChange={handleChange} icon="fa-globe" />
            <Select label="Sesso" name="sesso" value={formData.sesso} onChange={handleChange} options={["Maschio", "Femmina", "Altro"]} icon="fa-venus-mars" />
            <Input label="Codice Fiscale" name="codiceFiscale" value={formData.codiceFiscale} onChange={handleChange} icon="fa-barcode" />
          </div>

          {/* Sezione documenti */}
          <div className="border-t border-gray-300 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <i className="fas fa-file-alt text-red-700 mr-2"></i> Documenti
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Select label="Tipo Documento" name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} options={["Carta d'Identità", "Passaporto", "Patente"]} icon="fa-id-card-alt" />
              <Input label="Numero Documento" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} icon="fa-hashtag" />
              <Input label="Scadenza Documento" name="scadenzaDocumento" type="date" value={formData.scadenzaDocumento} onChange={handleChange} icon="fa-calendar-check" />
              <Input label="Carica Documento" name="fileDocumento" type="file" onChange={handleChange} icon="fa-upload" />
            </div>
          </div>

          {/* Sezione residenza */}
          <div className="border-t border-gray-300 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <i className="fas fa-home text-red-700 mr-2"></i> Residenza
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input label="Indirizzo" name="indirizzo" value={formData.indirizzo} onChange={handleChange} icon="fa-map-marker-alt" />
              <Input label="Città" name="citta" value={formData.citta} onChange={handleChange} icon="fa-city" />
              <Input label="Provincia" name="provincia" value={formData.provincia} onChange={handleChange} icon="fa-map" />
              <Input label="CAP" name="cap" value={formData.cap} onChange={handleChange} icon="fa-mail-bulk" />
            </div>
          </div>

          {/* Azioni form */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              onClick={() =>
                setFormData({
                  nome: "",
                  cognome: "",
                  dataNascita: "",
                  nazionalita: "",
                  sesso: "",
                  codiceFiscale: "",
                  tipoDocumento: "",
                  numeroDocumento: "",
                  scadenzaDocumento: "",
                  fileDocumento: "",
                  indirizzo: "",
                  citta: "",
                  provincia: "",
                  cap: "",
                })
              }
            >
              Annulla
            </button>
            <button type="submit" className="px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors duration-200">
              Salva Lavoratore
            </button>
          </div>
        </form>
      </div>

      
    </div>
  );
};

const Input = ({ label, name, type = "text", value, onChange, icon }) => (
  <div>
    <label htmlFor={name} className="block font-medium mb-2 text-gray-600">
      {icon && <i className={`fas ${icon} mr-1 text-red-600`}></i>} {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={type === "file" ? undefined : value}
      onChange={onChange}
      className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-700"
    />
  
  </div>
);



export default NuovoLavoratore;
