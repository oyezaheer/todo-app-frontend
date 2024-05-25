import { createContext, useState, useEffect } from 'react';
import { getTasks } from '../api/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  return (
    <DataContext.Provider value={{ tasks, setTasks }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
