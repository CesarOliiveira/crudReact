import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Edited = () => {
    const [ID, setID] = useState('');
    const [carro, setCarro] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');

    const [data, setData] = useState([]);

    const getCarros = async () => {
        try {
        const res = await axios.get("http://localhost:8081/cars");
        setData(res.data.sort((a, b) => (a.Marca > b.Marca ? 1 : -1)));
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getCarros();
    }, [data]);
    const handleID = (event) => {
        const { value } = event.target;
        setID(value);
    }
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

    const editCarro = (id) => {
        
        axios.put("http://localhost:8081/edit-cars/" + ID, {
          Marca: carro,
          Modelo: modelo,
          Ano: ano,
          
        })
        .then(({ data }) => console.log(data))
        .catch(({ data }) => console.log(data));
    }
    return (
        <>
            <div>
                <form>
                    <h1>Alterar Dados</h1>
                    <h3>ID:</h3>
                    <input type="number" name="id" placeholder='Informe ID' value={ID} onChange={handleID}/>
                    <h3>Carro</h3>
                    <input type="text" name="marca" placeholder='Alterar Carro' value={carro} onChange={handleCarro}/>
                    <h3>Modelo</h3>
                    <input type="text" name="modelo" placeholder='Alterar Modelo' value={modelo} onChange={handleModelo}/>
                    <h3>Ano</h3>
                    <input type="text" name="ano" placeholder='Alterar Ano' value={ano} onChange={handleAno}/>
                    <input type="submit" value="Alterar" onClick={() => editCarro(ID)}/>
                </form>
            </div>
        </>
    );
}

export default Edited;