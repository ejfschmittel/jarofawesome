import React from 'react'


/*
    fields (data, onChange)

*/

const MemoryForm = ({title}) => {
    return (
        <div>
            <h1>Create Memory</h1>
            <form>
                <div>
                    <input name="memory"/>
                </div>

                <button>Create Memory</button>
            </form>
        </div>
    )
}

export default MemoryForm