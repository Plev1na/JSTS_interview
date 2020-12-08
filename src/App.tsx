import React, { useState } from 'react';
import './App.css';
import { getRepos, getUserData } from "./API/github-api";

function App(this: any) {
  const [username, searchUsername] = useState("");
  const [details, setObject] = useState({});

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchUsername(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username === "") return

    const repos = await getRepos(username);
    const { user, orgs } = await getUserData(username);

    const object = {
      user: user,
      details: {
        repos: repos,
        orgs: orgs
      }
    }
    setObject(object);
    return object;
  };
  return (
    <div className="app">
      <header>
        <h1 className="title">GitHub Repo Scrapper</h1>
      </header>
      <div className="input">
        <h3 className="label">Enter a GitHub nick</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" className="name" onChange={updateName}/>
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className="output">{}</div>
    </div>
  );
}

export default App;
