import React, { useState } from 'react';
import axios from 'axios';

const App = () => 
{

    const [prompt, setPrompt] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = async (event) => {
    
        event.preventDefault();

        const query = "home";

        const res = await axios.get("https://tlvsearch.azurewebsites.net/api/Search?q=" + prompt);
        console.log(res.data);
        setSearchResults(res.data)
    }    

    return (
        <div>
            <h1 className="header"> חיפוש
                <form className="SearchBox" name="myform"  onSubmit = {handleSubmit}>
                        <div className="SearchBox2">
                        <input name="searchText" value={prompt} className="SearchBoxInput" 
                                onChange = {(e) => setPrompt(e.target.value)}/>
                        <a title="Search" className="SearchIcon"/>
                    </div>
                </form>
            </h1>
            <h2>
            {
                searchResults.map( (item, index) => {
                    return (<div className="searchItem" key={index}>
                                <div>{item.title}</div>
                                <a href={item.url}>Link</a>
                            </div>
                        )
                })
            }
            </h2>                        
        </div>           
    )   
}

export default App;
