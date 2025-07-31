import "./App.css";
import MyForm from "./Components/Form";
function App() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Background SVG */}
      <img
        src="./assets/wave-haikei.svg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
  <MyForm />
  </div>
  );
}

export default App;
