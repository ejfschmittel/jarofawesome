import React, {useState, useEffect} from 'react'


// source of throught => get parameters in url

// from, to, s, by

// date filter wrapper


const FilterMemories = ({initialValues, onFilter}) => {

    const [s, setS] = useState(initialValues.s)
    const [from, setFrom] = useState(initialValues.from)
    const [to, setTo] = useState(initialValues.to)
    const [sortBy, setSortBy] = useState(initialValues.sortBy)

    // add delay to filter change

    useEffect(() => {
        onSearchChange()
    }, [s, from, to, sortBy])

    const onSearchChange = () => {
       onFilter({
        s,
        from,
        to,
        sortBy
       })
    }

    const onSChange = (e) => {setS(e.target.value);}
    const onFromChange = (e) => setFrom(e.target.value)
    const onToChange = (e) => setTo(e.target.value)
    const onSortByChange = (e) => setSortBy(e.target.value)

    return (
        <div className="memory-filter">
            <select name="sort_by" className="memory-filter__sort-by" value={sortBy} onChange={onSortByChange}>
                <option value="newest">newest</option>
                <option value="oldest">oldest</option>
            </select>
            <input type="text" placeholder="search" name="s" className="memory-filter__search" value={s} onChange={onSChange}/>

  
            <input type="date" name="from" className="memory-filter__date-filter" value={from} onChange={onFromChange}/>
            <input type="date" name="to" className="memory-filter__date-filter" value={to} onChange={onToChange}/>
    
        </div>
    )
}

FilterMemories.defaultProps = {
    initialValues: {
        s: "",
        from: "",
        to: "",
        sortBy: "newest"
    }
}

export default FilterMemories