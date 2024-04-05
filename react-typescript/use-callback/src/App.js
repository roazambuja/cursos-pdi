import { useCallback } from 'react';
import './App.css';
import Calculadora from './Calculadora';

function App() {

  const calcularRaizQuadrada = Math.sqrt;

  const calcularHipotenusa = useCallback((ladoA, ladoB) => {
    const quadradoA = Math.pow(ladoA, 2);
    const quadradoB = Math.pow(ladoB, 2);
    return calcularRaizQuadrada(quadradoA + quadradoB);
  }, [calcularRaizQuadrada]);

  return (
    <div className="App">
      <img style={{maxWidth: '500px'}} src='/imagens/triangulo.png' alt="Triângulo retângulo" />
      <Calculadora calcularHipotenusa={calcularHipotenusa}/>
    </div>
  );
}

export default App;
