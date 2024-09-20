import React, { useEffect, useState } from "react";
import './App.css'; 
import m1 from './4594681.png';     
import m2 from './9413665.png';     
import up from './arrow-up-circle-green-64.webp';     
import down from './11-64.webp';    
import equal from './15658370.png'; 
function App() {
  const [inp, setInp] = useState('');      
  const [cns, setCns] = useState([]);     
  const [test, setTest] = useState([]);    
  const [err, setErr] = useState('');      
  const [prev, setPrev] = useState([]);    
  const [w1, setW1] = useState(0);       
  const [w2, setW2] = useState(0);         
  useEffect(() => {
    let arr = new Set();
    while (arr.size < 4) {
      arr.add(Math.floor(Math.random() * 10));
    }
    setTest([...arr]);
  }, []);
  const handleInput = (event) => {
    const inputVal = event.target.value;
    if (/^\d{0,4}$/.test(inputVal)) {
      setInp(inputVal);
      setErr(''); 
    }
  };
  const check = () => {
    if (inp.length !== 4) {
      setErr('Error: Input must be a 4-digit number');
      return;
    }
    let a = inp[0] - '0';
    let b = inp[1] - '0';
    let c = inp[2] - '0';
    let d = inp[3] - '0';
    if (new Set([a, b, c, d]).size !== 4) {
      setErr('Error: All digits must be unique');
      return;
    }
    let bull = 0, cow = 0;
    [a, b, c, d].forEach((val, index) => {
      if (val === test[index]) bull++;
      else if (test.includes(val)) cow++;
    });
    let previousTotal = w1 * 2 + w2;   
    let currentTotal = bull * 2 + cow;
    let symbol; 
    if (currentTotal > previousTotal) {
      symbol = 'up';
    } else if (currentTotal === previousTotal) {
      symbol = '=';
    } else {
      symbol = 'down';
    }
    setW1(bull);
    setW2(cow);
    const result = {
      number: `${a}${b}${c}${d}`,
      bulls: bull,
      cows: cow,
      symbol: symbol
    };
    if (bull === 4) {
      setErr('You Won');
    }
    setCns(prev => [...prev, result]); 
    setInp(''); 
    setErr('');  
  };
  return (
    <div className="App">
      <h1>Bulls and Cows Game</h1>
      <p>Example:<br /> If Secret is 5379 and entered value is 4972 <br /> Answer is 1 Bull and 1 Cow (The Bull is '7' and Cow is '9')</p>
      <input
        type="text"
        value={inp}
        onChange={handleInput}
        placeholder="Enter 4-digit number"
      />
      <button onClick={check}>Check</button>
      {err && <p className="error">{err}</p>} 
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th><img src={m2} alt="Bull icon" /></th>
            <th><img src={m1} alt="Cow icon" /></th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {cns.map((item, index) => (
            <tr key={index}>
              <td>{item.number}</td>
              <td>{item.bulls}</td>
              <td>{item.cows}</td>
              <td>
                {item.symbol === 'up' && <img src={up} alt="Up icon" />}
                {item.symbol === 'down' && <img src={down} alt="Down icon" />}
                {item.symbol === '=' && <img src={equal} alt="Equal icon" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;