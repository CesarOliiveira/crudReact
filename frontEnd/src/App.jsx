import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [carro, setCarro] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  const [data, setData] = useState([])

 
  const handleCarro = (event) => {
    const { value } = event.target;
    setCarro(value);
  }
  const handleModelo = (event) => {
    const { value } = event.target;
    setModelo(value);
  }

  const handleAno = (event) => {
    const { value } = event.target;
    setAno(value);
  }
  const handleSubmit = () =>{
    const dados = {
      "Marca": carro,
      "Modelo": modelo,
      "Ano": ano,
    }

    const requestOptions = {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(dados)
    }

    fetch(`http://localhost:8081/add-cars`, requestOptions)
      .then( data => console.log(data))
      .catch(err => console.log(err))
  }
 
  
   
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8081/cars");
      setData(res.data.sort((a, b) => (a.Carro > b.arro ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() =>{
    getUsers();
  }, [setData])

  return (
    <>
      <div>
        <h2>Carro</h2>
        <input type="text" id="carro" value={carro} placeholder='Digite o Carro' onChange={handleCarro}/>
        <h2>Modelo</h2>
        <input type="text" id="modelo" value={modelo} placeholder='Digite o Modelo do Carro' onChange={handleModelo}/>
        <h2>Ano</h2>
        <input type="text" id="ano" value={ano} placeholder='Digite o Ano do Carro' onChange={handleAno}/>
        <input type="submit" onClick={handleSubmit}/>
      </div>
      <div>
      <table>
        <thead>
          <th>ID</th>
          <th>MARCA</th>
          <th>MODELO</th>
          <th>ANO</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.Id}</td>
              <td>{d.Marca}</td>
              <td>{d.Modelo}</td>
              <td>{d.Ano}</td>
              <input type="button" value="Editar"/>
              <input type="button" value="Excluir"/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}




export default App;
