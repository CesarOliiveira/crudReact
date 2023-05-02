import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

type Details = {
    marca: string,
    modelo: string,
    ano: string,
}   


const Edited = () => {
    const { id } = useParams();
    const [values, setValues] = useState<Details>({
        marca: '',
        modelo: '',
        ano: '',
    });

      useEffect(() => {
        axios.get(`http://localhost:8081/cars/${id}`)
        .then(response => setValues({
            marca: response.data[0].Marca, 
            modelo: response.data[0].Modelo, 
            ano: response.data[0].Ano
        }));
      }, []);


    const editCarro = async() => {
               await axios.put(`http://localhost:8081/edit-cars/${id}`, {
                 Marca: values.marca,
                 Modelo: values.modelo,
                 Ano: values.ano
               })
               .then((data) => console.log(data))
               .catch((data) => console.log(data)); 
    }
    return (
        <>
            <div>
            
                <form>
                    <h1>Alterar Dados</h1>
                    <h3>Carro</h3>
                    <input type="text" name="marca" placeholder='Alterar Carro' value={values.marca} onChange={e => setValues({...values, marca: e.target.value })}/>
                    <h3>Modelo</h3>
                    <input type="text" name="modelo" placeholder='Alterar Modelo' value={values.modelo} onChange={e => setValues({...values, modelo: e.target.value })}/>
                    <h3>Ano</h3>
                    <input type="text" name="ano" placeholder='Alterar Ano' value={values.ano} onChange={e => setValues({...values, ano: e.target.value })}/>
                    <input type="button" value="Alterar" onClick={() => editCarro()}/>
                </form>
            
            </div>
        </>
    );
}


export default Edited;