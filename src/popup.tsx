import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { useCharacterStorage } from './hooks/useCharacterStorage';
import './styles/main.css';

const Popup = () => {
  const { character, setCharacter, loading } = useCharacterStorage();
  if (loading) return <div className="loading">Загрузка...</div>;
  return <App character={character} setCharacter={setCharacter} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
