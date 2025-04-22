import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [result, setResult] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatReply, setChatReply] = useState("Hi! I’m a smart assistant built by Aman 🧠. Ask me anything about AC control based on temperature or humidity!");

  const predict = async () => {
    const res = await axios.post('http://localhost:3001/predict', {
      temperature: temp,
      humidity: humidity
    });
    setResult(res.data.result);
  };

  const askSystem = async () => {
    const res = await axios.post('http://localhost:3001/ask', {
      question: chatInput
    });
    setChatReply(res.data.reply);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: 20, fontFamily: 'Arial' }}>
      <h1 style={{ color: '#4A00E0' }}>Aman's Fuzzy AC Controller ❄️</h1>
      
      <h3>Login (Dummy Gmail & Password)</h3>
      <input placeholder="Email" className="input" />
      <input placeholder="Password" type="password" className="input" />

      <div style={{ marginTop: 20 }}>
        <h3>Enter Temperature & Humidity</h3>
        <input type="number" placeholder="Temperature (°C)" value={temp} onChange={(e) => setTemp(e.target.value)} />
        <input type="number" placeholder="Humidity (%)" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
        <button onClick={predict}>Predict</button>
        <h4>Prediction: {result}</h4>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Ask Assistant (Chat with PA)</h3>
        <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type your question..." />
        <button onClick={askSystem}>Ask</button>
        <div style={{ marginTop: 10, backgroundColor: '#eee', padding: 10 }}>
          <strong>PA:</strong> {chatReply}
        </div>
      </div>
    </div>
  );
}

export default App;
