import React, {useState, useEffect} from 'react'


// source of throught => get parameters in url

// from, to, s, by

// date filter wrapper


const FilterMemories = ({initialValues, onFilter}) => {

    const [s, setS] = useState(initialValues.s)
    const [fromDate, setFromDate] = useState(initialValues.fromDate)
    const [toDate, setToDate] = useState(initialValues.toDate)
    const [orderBy, setOrderBy] = useState(initialValues.orderBy)

    // add delay to filter change

    useEffect(() => {
        onSearchChange()
    }, [s, fromDate, toDate, orderBy])

    const onSearchChange = () => {
       onFilter({
        s,
        fromDate,
        toDate,
        orderBy
       })
    }

    const onSChange = (e) => {setS(e.target.value);}
    const onFromChange = (e) => setFromDate(e.target.value)
    const onToChange = (e) => setToDate(e.target.value)
    const onSortByChange = (e) => setOrderBy(e.target.value)

    return (
        <div className="memory-filter">
            <select name="orderBy" className="memory-filter__sort-by" value={orderBy} onChange={onSortByChange}>
                <option value="newest">newest</option>
                <option value="oldest">oldest</option>
            </select>
            <input type="text" placeholder="search" name="s" className="memory-filter__search" value={s} onChange={onSChange}/>

  
            <input type="date" name="fromDate" className="memory-filter__date-filter" value={fromDate} onChange={onFromChange}/>
            <input type="date" name="toDate" className="memory-filter__date-filter" value={toDate} onChange={onToChange}/>
    
        </div>
    )
}

FilterMemories.defaultProps = {
    initialValues: {
        s: "",
        fromDate: "",
        toDate: "",
        orderBy: "newest"
    }
}

export default FilterMemories