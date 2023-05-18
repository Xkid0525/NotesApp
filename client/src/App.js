import React, { useEffect, useState }  from 'react'
function App() {
  const [backendData, setBackendData] = useState([]);
  
  useEffect(() => {
   fetch("http://localhost:3000/notes", {mode: 'cors'}).then(
          response => {return response.json()}
      ).then(
          data => {
              setBackendData(data);
          }
      )
  }, [])
  return (
    <div>
      {backendData.map((dataobj, index) =>{
        return(
          <div>
            {index+1}. {dataobj.title} : {dataobj.content} : {dataobj.author} 
            </div>
        )
      })}
    </div>
  )
}

export default App
