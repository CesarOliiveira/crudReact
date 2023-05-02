import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const Tabela = () => {
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

    function clickRemove(id) {
        const url = "http://localhost:8081/remove-cars/" + id
        axios.delete(url)
    };

    return (
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
                    <Link to={`edit/${d.Id}`}>Editar</Link>
                    <input type="button" value="Excluir" onClick={() => clickRemove(d.Id)}/>
                </tr>
            ))}  
            </tbody>
            </table>
            
        </div>
    )
}

export default Tabela;