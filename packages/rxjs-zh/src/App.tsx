import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from '@infinitex/autocomplete';
import useSearch from './hooks/useSearch';

import '@infinitex/autocomplete/dist/bundle.css';

function App() {
  const [value, setValue] = useState('');
  const { isLoading, options, error, trigger: onSearch } = useSearch();
  return (
    <div>
      <AutoComplete
        error={error}
        value={value}
        onChange={(data) => {
          setValue(data);
          onSearch(data);
        }}
        onSelect={(data) => setValue(data)}
        options={options}
        isLoading={isLoading}
        optionRenderer={(option) => <div style={{ textAlign: 'end' }}>{option}</div>}
        placeholder="type in your content"
      />
      {value && <h3>You type in {value}</h3>}
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
