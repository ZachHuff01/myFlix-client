// import { createRoot } from 'react-dom/client';

// // Import statement to indicate that you need to bundle `./index.scss`
// import "./index.scss";

// // Main component (will eventually use all the others)
// const MyFlixApplication = () => {
//   return (
//     <div className="my-flix">
//       <div>Good morning</div>
//     </div>
//   );
// };

// // Finds the root of your app
// const container = document.querySelector("#root");
// const root = createRoot(container);

// // Tells React to render your app in the root DOM element
// root.render(<MyFlixApplication />);

import { createRoot } from "react-dom/client";
import { MainView } from "./components/MainView/main-view";

import "./index.scss";

const App = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);