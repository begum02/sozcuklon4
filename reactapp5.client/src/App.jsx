import './App.css';
import Navbar from '../components/Navbar'; // named de�il, default export yapm��s�n
import AdSense from '../components/AdSense'

function App() {
    return (
        <div className="App" >
            <Navbar />
            <AdSense data-ad-client="ca-pub-9070289581248556"
                data-ad-slot="7674816160" />
        </div>
    );
}

export default App;
