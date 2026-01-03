import './App.css'
import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import useTheme from './hooks/useTheme';


function App() {
  const { theme, setTheme } = useTheme();
  const localTheme = localStorage.getItem('theme') as 'light' | 'dark' ;
  if (localTheme && localTheme !== theme) {
    setTheme(localTheme);
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
