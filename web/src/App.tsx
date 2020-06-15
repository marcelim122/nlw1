import React from 'react';
import './App.css';

import Routes from './routes';

/*import Header from './HeaderTeste';

//jsx: sintaxe de xml dentro de js

function App() {
  const [counter, setCounter] = useState(0); //[valor do estado, função para att o valor do estado]

  function handleButtonClick(){
    setCounter(counter+1); //alterando o valor counter indiretamente
  }

  return (
    <div>
      <Header  title={`Contador: ${counter}`}/>

      <h1>{counter}</h1>
      <button type="button" onClick={handleButtonClick}>Aumentar</button>
    </div>
  );
}*/

function App(){
  return(
    <Routes />
  );
}

export default App;
