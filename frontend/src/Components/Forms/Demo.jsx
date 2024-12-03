import React, { useState } from 'react'

function Demo() {
    const [inputVal, setInputVal] = useState({ name1: '', name2: '' });
    const demoFtn = (e) => {
        const { name, value } = e.target;
        setInputVal(...inputVal, {[name]:value});
        setInputVal([{name1:'7',name2:'6'},{}])
    }
    return (
        <div>
            <input type="text" name="name1" id="" onChange={demoFtn} />//7
            <input type="text" name="name2" id="" onChange={demoFtn} />//6
        </div>
    )
}

export default Demo