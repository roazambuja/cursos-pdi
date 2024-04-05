import { useState, useEffect } from 'react'; 

function Calculadora ({ calcularHipotenusa }) {

    const [ladoA, setLadoA] = useState(0);
    const [ladoB, setLadoB] = useState(0);
    const [hipotenusa, setHipotenusa] = useState(0);

    useEffect(() => {
        if (ladoA > 0 && ladoB > 0) {
            setHipotenusa(calcularHipotenusa(ladoA, ladoB));
        }
    }, [ladoA, ladoB, calcularHipotenusa]);

    return (
        <div>
            <div>
                <label>Lado B</label>
                <input 
                    placeholder="Insira o valor de A"
                    value={ladoA}
                    onChange={evento=> setLadoA(evento.target.value)}
                />
            </div>
            <div>
                <label>Lado C</label>
                <input 
                    placeholder="Insira o valor de B"
                    value={ladoB}
                    onChange={evento=> setLadoB(evento.target.value)}
                />
            </div>

            <p>O valor da hipotenusa é: <strong>{hipotenusa}</strong></p>
        </div>
    )
}

export default Calculadora;