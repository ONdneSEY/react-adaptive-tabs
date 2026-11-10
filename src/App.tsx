import { HeaderList } from "./components/header-list/headerList";
// import { Sandbox } from "./components/header-list/Sandbox";

import "./style/App.scss";

function App() {
  return (
    <div className="conteinet">
      <aside className="side_bar"></aside>
      <main className="main">
        <header></header>
        <HeaderList />
        <section className="canvas">{/* <Sandbox /> */}</section>
      </main>
    </div>
  );
}

export default App;
