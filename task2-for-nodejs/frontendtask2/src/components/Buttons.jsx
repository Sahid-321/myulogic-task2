import axios from "axios"
import { useState } from "react"
const Button = () => {
    const [showData, setShowData] = useState([])
    const [check, setCheck] = useState("true")


    const handleExcel = () => {
 
            axios.get("http://localhost:8000/readexcelfile?filename=sahid")
            .then((res) => res.data)
            .catch((err) => console.log('error'))
        alert("Excell data added on mongoDB")
        } 
      
    

    const handleFetch = () => {
       
         
            axios.get("http://localhost:8000/get")
            .then((res) => setShowData(res.data))
            .catch((err) => console.log('error'))
        
        
    }

    const handleDelete = () => {
        
        alert("User data deleted from MongoDB");
        axios.delete('http://localhost:8000/delete')
        .then((res)=> console.log('User Data delete in your MongoDB', res))
        .catch((err)=> console.log('Something went wrong', err))
        window.location.reload()
    }
    return (
        <div >
            <div>
                <h3>The excel file is already present in nodejs file. Name of the file is sahid.xlsx</h3>
                <button onClick={handleExcel}>add excel file to mongodb</button>
                <button onClick={handleFetch}>Fetch data from Mongo</button>
                <button onClick={handleDelete}>Delete All data from Mongo</button>

            </div>
            <div>
                {
                    showData.map((elem) => {
                        return (
                            <div style={{border:"solid 1px"}} key={elem.id}>
                                <p>Name: {elem.Name}</p>
                                <p>Email: {elem.Email}</p>
                                <p>Mobile: {elem.Mobile}</p>
                                <p>Salary: {elem.Salary}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Button;