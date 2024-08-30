import React, { createContext, useState, useEffect, useContext } from 'react';

export const SSEContext = createContext();

export const useSSE = () => {
    const context = useContext(SSEContext);
    if(!context) {
        throw new Error('useSSE must be used within an SSEProvider');
    }
    return context;
}

export const SSEProvider = ({ children }) => {
  const [addEvents, setAddEvents] = useState([]);
  const [deleteEvents, setDeleteEvents] = useState([]);
  const [updateEvents, setUpdateEvents] = useState([]);


  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3002/events');

    eventSource.onmessage = (event) => {
      // Manejar los mensajes entrantes
      const newEvent = JSON.parse(event.data);
      console.log(newEvent);
      if (newEvent.type === 'addProduct') {
        setAddEvents((prevEvents) => [...prevEvents, newEvent]);
        }
      if (newEvent.type === 'deleteProduct') {
        setDeleteEvents((prevEvents) => [...prevEvents, newEvent]);
        console.log(newEvent);
      }
      if (newEvent.type === 'updateProduct') {
        setUpdateEvents((prevEvents) => [...prevEvents, newEvent]);
        console.log(newEvent);
      }
    };

    eventSource.onerror = (error) => {
      console.error('Error en la conexión SSE:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <SSEContext.Provider value={{ updateEvents, deleteEvents, addEvents }}>
      {children}
    </SSEContext.Provider>
  );
};
