React Notes:
|| Ganpati Bappa Morya: ||

import { useState, useEffect } from "react";

export default function App() {
const [advice, setAdvice] = useState(""); // To update the UI
const [count, setCount] = useState(0);
async function getAdvice() {
const res = await fetch("https://api.adviceslip.com/advice");
console.log(res);
if (!res || res.status === 404) {
setAdvice("Failed");
return;
}
const data = await res.json();
console.log(data);
if (!data) return;
console.log(data.slip.advice);

    // setCount(count + 1);

    if (advice === data.slip.advice) {
      return;
    } else {
      setAdvice(data.slip?.advice ?? "Default Value");
      setCount((c) => c + 1);
    }

}

// To load any data initially
useEffect(function () {
getAdvice();
}, []);

return (

<div>
<h1>{advice}</h1>
<button onClick={getAdvice}>Get Advice</button>
<Message adviceCount={count} default="Default Value" />
</div>
);
}

//Props: To pass parent data to the child
function Message(props) {
console.log(props);
return <p>Count: {props.adviceCount}</p>;
}

======== Server Side & Client Side Rendering ===================

Client-Side Rendering (CSR)
Definition:
In Client-Side Rendering, the browser (client) downloads a mostly empty HTML file and then uses JavaScript to render the content dynamically.

Server-Side Rendering (SSR)
Definition:
In Server-Side Rendering, the server prepares and sends a fully rendered HTML page for each request.
