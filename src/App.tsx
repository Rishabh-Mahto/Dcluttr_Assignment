import AppSideBar from "./components/layout/AppSideBar";
import MainSection from "./components/layout/MainSection";

function App() {
  return (
    <div className="flex w-full h-screen">
      <AppSideBar />
      <MainSection />
    </div>
  );
}

export default App;
