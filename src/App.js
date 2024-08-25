import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
    const [inputValue, setInputValue] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
      try {
          const jsonData = JSON.parse(inputValue); 
          setError('');
  
   
          const response = await axios.post('https://sekhar-bajaj-backend.onrender.com/bfhl', jsonData, {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
        );

        console.log(response);
  
        
          setResponseData(response.data);
      } catch (e) {
          setError('Invalid JSON format.');
          console.error(e); 
      }
  };
  

    const handleDropdownChange = (selectedList) => {
        setSelectedOptions(selectedList.map(item => item.value));
    };

    const renderResponse = () => {
        if (!responseData) return null;

        const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

        const filteredData = {
            Alphabets: selectedOptions.includes('alphabets') ? alphabets : [],
            Numbers: selectedOptions.includes('numbers') ? numbers : [],
            'Highest lowercase alphabet': selectedOptions.includes('highest_lowercase_alphabet') ? highest_lowercase_alphabet : []
        };

        return (
            <div>
                {Object.keys(filteredData).map(key => (
                    filteredData[key].length > 0 && (
                        <div key={key}>
                            <h3>{key}</h3>
                            <pre>{JSON.stringify(filteredData[key], null, 2)}</pre>
                        </div>
                    )
                ))}
            </div>
        );
    };

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
    ];

    return (
        <div style={{ padding: '20px' }}>
        {responseData&&<h1>{responseData.user_id}</h1>}
            <h1>Data Filter</h1>
            <textarea
                rows="4"
                cols="50"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Enter JSON here...'
                style={{ marginBottom: '10px' }}
            />
            <button onClick={handleSubmit} style={{ marginBottom: '20px' }}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseData && (
                <>
                    <Select
                        options={options}
                        isMulti
                        onChange={handleDropdownChange}
                        style={{ marginBottom: '20px' }}
                    />
                    {renderResponse()}
                </>
            )}
        </div>
    );
};

export default App;