import { HashRouter, Routes, Route } from "react-router-dom";

function Home() {
  return <h1>App Working ✅</h1>;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}