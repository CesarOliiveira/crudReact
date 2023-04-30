import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Edited = () => {
    const [data, setData] = useState([]);
    const [carro, setCarro] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');

    const { id } = useParams();
    
    const getCarros = () => {
        
    };
    

    useEffect(() => {
        getCarros();
    }, [data]);
   
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
        axios.put(`http://localhost:8081/edit-cars/` + id, {
            Marca: carro,
            Modelo: modelo,
            Ano: ano
        });
    }
    return (
        <>
            <div>
                <form>
                    <h1>Alterar Dados</h1>
                    <h3>Carro</h3>
                    <input type="text" name="marca" placeholder='Alterar Carro' value={carro} onChange={handleCarro}/>
                    <h3>Modelo</h3>
                    <input type="text" name="modelo" placeholder='Alterar Modelo' value={modelo} onChange={handleModelo}/>
                    <h3>Ano</h3>
                    <input type="text" name="ano" placeholder='Alterar Ano' value={ano} onChange={handleAno}/>
                    <input type="submit" value="Alterar" onClick={() => editCarro(data.Id)}/>
                </form>
            </div>
        </>
    );
}


export default Edited;