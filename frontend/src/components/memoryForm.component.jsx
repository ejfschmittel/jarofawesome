import React from 'react'


/*
    fields (data, onChange)

*/

const MemoryForm = ({title}) => {
    return (
        <div className="memory-form">
            <h1 className="memory-form__title">Create Memory</h1>
            <form>
                <div className="memory-form__memory">
                    <input name="memory" placeholder="My memory..."/>
                </div>

                <button className="memory-form__button">Create Memory</button>
            </form>
        </div>
    )
}

export default MemoryForm