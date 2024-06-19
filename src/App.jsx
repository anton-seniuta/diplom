//Импортируем страницы моего приложения
import MainPage from './pages/MainPage';   
import LoginPage from './pages/LoginPage';  
// Импортирует компоненты для настройки маршрутизации библиотеки react-router-dom
import {  
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";  

//Обворачиваем приложение в Router чтобы включить поддержку маршрутизации.
//Добавляем маршруты для страниц приложения
export default function App() {
  return (  // 
    <Router>  
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
      </Routes >
    </Router>
  );
}
