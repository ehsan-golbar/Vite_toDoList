import  React, { useState , useEffect } from 'react'

export const DateTime = (props) => {

    const [date,setDate] = useState(new Date());
    
    useEffect(() => {
        let timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div>
            
            
            <p> {props.flag ==="date" ? date.toLocaleDateString() : date.toLocaleTimeString() } </p>

        </div>
    )
}

export default DateTime