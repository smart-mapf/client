import { Service } from "client/state";
import { Inputs } from "leva-controls/Inputs";
import { Leva } from "leva";
import { Playback } from "leva-controls/Playback";
import { Suspense } from "react";
import "./App.css";
import { Stage } from "./components/Stage";
import { Logs } from "Logs";
import { Selection } from "leva-controls/Selection";
import { Examples } from "leva-controls/Examples";

function App() {
  return (
    <Suspense fallback={null}>
      <Service />
      <Suspense fallback={null}>
        <Examples />
        <Inputs />
        <Playback />
        <Selection />
        <Logs />
      </Suspense>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Leva
          theme={{
            fontSizes: { root: "12px" },
            space: { rowGap: "8px" },
            sizes: {
              folderTitleHeight: "32px",
              numberInputMinWidth: "90px",
              rowHeight: "32px",
              rootWidth: "400px",
              controlWidth: "240px",
            },
            fonts: {
              mono: "Geist Mono",
            },
          }}
        />
        <Stage />
      </div>
    </Suspense>
  );
}

export default App;
