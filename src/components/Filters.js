import React from 'react'

export default function Filters(props) {

    // hooks function
    const { search, setSearch, filter, setFilter, sort, setSort } = props;

    return (
        <div className="row mb-3">

            {/* Search */}
            <div className="col-md-4 col-12 mb-2">
                <input type="text" placeholder="Search Task Name" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* Filter Completed Tasks */}
            <div className="col-md-4 col-6 mb-2">
                <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>

            {/* Sort Date */}
            <div className="col-md-4 col-6 mb-2">
                <select className="form-select" value={sort} onChange={(e) => setSoft(e.target.value)}>
                    <option value="startDate-asc">Sort by Start Date (Asc)</option>
                    <option value="startDate-desc">Sort by Start Date (Desc)</option>
                </select>
            </div>

        </div>
    )
}
