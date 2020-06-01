import React from 'react'


const MemoryInput = ({onChange, values}) => {
    return (
        <div className="memory-input">
            <input placeholder="My memory is..." className="memory-input__memory" type="test" name="memory" value={values["memory"]} onChange={onChange}/>
            <input className="memory-input__date" type="date" name="date" value={values["date"]}  onChange={onChange} />
        </div>
    )
}

export default MemoryInput