import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/EditDeck.css';

const EditDeck = () => {
  const [cards, setCards] = useState([]); // Cartas obtenidas de la API
  const [deck, setDeck] = useState([]); // Cartas en el deck
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener las cartas de la API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cards', {
          params: { pageSize: 10 }, // Limitar el número de cartas a 10
        });
        setCards(response.data?.data || []);
      } catch (error) {
        console.error('Error al obtener cartas:', error);
        setError('No se pudieron obtener las cartas. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // Manejadores de eventos Drag-and-Drop
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('card', JSON.stringify(card)); // Guardar los datos de la carta como string
  };

  const handleDropToDeck = (e) => {
    e.preventDefault();
    const card = JSON.parse(e.dataTransfer.getData('card')); // Recuperar la carta
    const cardWithUniqueId = { ...card, uniqueId: Date.now() }; // Agregar un ID único
    setDeck((prevDeck) => [...prevDeck, cardWithUniqueId]); // Agregar la carta al deck
  };

  const handleDropToRemove = (e) => {
    e.preventDefault();
    const uniqueId = e.dataTransfer.getData('uniqueId'); // Recuperar el ID único
    setDeck((prevDeck) => prevDeck.filter((c) => c.uniqueId !== Number(uniqueId))); // Eliminar la carta específica
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Permitir el drop
  };

  const handleDeckDragStart = (e, card) => {
    e.dataTransfer.setData('uniqueId', card.uniqueId); // Usar el ID único al arrastrar desde el deck
  };

  if (loading) return <p>Cargando cartas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card-list-container">
      <h2>Lista de Cartas</h2>

      <div className="card-grid">
        {cards.map((card) => (
          <div
            className="card-item"
            key={card.id || card.name}
            draggable // Hacer la carta "draggable"
            onDragStart={(e) => handleDragStart(e, card)} // Inicia el drag
          >
            <h3>{card.name}</h3>
            <p>Tipo: {card.supertype}</p>
            <img src={card.images.small} alt={card.name} />
          </div>
        ))}
      </div>

      <h2>Deck</h2>
      <div
        className="deck-drop-zone"
        onDrop={handleDropToDeck} // Soltar la carta aquí
        onDragOver={handleDragOver} // Permitir arrastrar sobre este contenedor
      >
        {deck.length === 0 ? (
          <p>Arrastra las cartas aquí para crear tu deck</p>
        ) : (
          deck.map((card) => (
            <div
              className="deck-card"
              key={card.uniqueId} // Usar el uniqueId para la clave única
              draggable // Hacer la carta "draggable"
              onDragStart={(e) => handleDeckDragStart(e, card)} // Inicia el drag desde el deck
            >
              <h3>{card.name}</h3>
              <img src={card.images.small} alt={card.name} />
            </div>
          ))
        )}
      </div>

      <h2>Zona de Eliminación</h2>
      <div
        className="remove-drop-zone"
        onDrop={handleDropToRemove} // Soltar la carta aquí para eliminarla
        onDragOver={handleDragOver} // Permitir arrastrar sobre este contenedor
      >
        <p>Arrastra cartas aquí para eliminarlas del deck</p>
      </div>
    </div>
  );
};

export default EditDeck;
