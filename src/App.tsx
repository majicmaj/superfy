import { useState } from "react";
import "./App.css";
import { useMutation } from "@tanstack/react-query";
import ModeToggle from "./components/system/modeToggle";

const URL = "https://jsonplaceholder.typicode.com/posts";

const usePostQuery = () => {
  return useMutation({
    mutationFn: async (query: string) => {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: query }),
      });
      return response.json();
    },
  });
};

function App() {
  const [query, setQuery] = useState("");

  const { mutate, data } = usePostQuery();
  // mutate allows me to POST the query to the server
  // data allows me to GET (read) the data returned in the response from the server

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(query); // POST request to the server
  };

  return (
    <div className="grid place-items-center w-screen h-screen">
      <ModeToggle />
      <div>
        <input
          type="text"
          placeholder="Type here"
          className="p-2 border rounded px-4"
          onChange={handleChange}
          value={query}
        />
        <button
          className="btn"
          onClick={handleSubmit} // Call the handleSubmit function on button click
        >
          Submit
        </button>
      </div>
      <div>
        {data &&
          data.map((item: { id: number; title: string }) => (
            <div key={item.id} className="p-2 border rounded mt-2">
              {item.title}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
