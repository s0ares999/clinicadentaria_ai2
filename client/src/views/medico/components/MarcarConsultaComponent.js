import React, { useState } from 'react';

function MarcarConsultaComponent() {
  const [paciente, setPaciente] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consulta marcada:', { paciente, data, hora });
    alert('Consulta marcada com sucesso!');
    setPaciente('');
    setData('');
    setHora('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Paciente:</label><br />
        <input 
          type="text" 
          value={paciente} 
          onChange={(e) => setPaciente(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Data:</label><br />
        <input 
          type="date" 
          value={data} 
          onChange={(e) => setData(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Hora:</label><br />
        <input 
          type="time" 
          value={hora} 
          onChange={(e) => setHora(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" style={{ marginTop: '1rem' }}>Marcar Consulta</button>
    </form>
  );
}

export default MarcarConsultaComponent;
