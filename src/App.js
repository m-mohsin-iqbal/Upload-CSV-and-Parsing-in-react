import './App.css';
import ReactFileReader from 'react-file-reader';
import { useState } from 'react';
function App() {
  const [data, setdata] = useState([])
  function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    console.log(rows)
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
  }
  const handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function(e) {
        // Use reader.result
        const result = csvToArray(reader.result,',')
        setdata(result)
        console.log(result)
      
    }
    reader.readAsText(files[0]);
}
  return (
    <div className="App">
    <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
    <button className='btn'>Upload</button>
    </ReactFileReader>
    {data && data.map((val)=>{
      return  <p>{Object.keys(val)[0] } : {Object.values(val)[0]}</p>
      })
    }
    </div>
  );
}

export default App;
