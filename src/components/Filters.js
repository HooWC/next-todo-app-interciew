import React from 'react'

export default function Filters(props) {

    // hooks function
    const { search, setSearch, filter, setFilter, sort, setSort, categoryFilter, setCategoryFilter } = props;

    return (
        <div className="row mb-3">

            {/* Search */}
            <div className="col-md-3 col-12 mb-2">
                <input
                    type="text"
                    placeholder="Search Task Name"
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filter Completed Tasks */}
            <div className="col-md-3 col-6 mb-2">
                <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Type</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>

            {/* Category */}
            <div className="col-md-3 col-6 mb-2">
                <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="Work">Work</option>
                    <option value="Bug Fixing">Bug Fixing</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Study">Study</option>
                    <option value="Personal">Personal</option>
                    <option value="Meetings">Meetings</option>
                    <option value="Research">Research</option>
                    <option value="Design">Design</option>
                    <option value="Code Review">Code Review</option>
                    <option value="Testing">Testing</option>
                    <option value="Documentation Writing">Documentation Writing</option>
                    <option value="API Development">API Development</option>
                    <option value="Project Planning">Project Planning</option>
                    <option value="System Maintenance">System Maintenance</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Event Planning">Event Planning</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Business Strategy">Business Strategy</option>
                </select>
            </div>

            {/* Sort Date */}
            <div className="col-md-3 col-12 mb-2">
                <select
                    className="form-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="startDate-asc">Sort by Start Date (Asc)</option>
                    <option value="startDate-desc">Sort by Start Date (Desc)</option>
                </select>
            </div>

        </div>
    )
}
