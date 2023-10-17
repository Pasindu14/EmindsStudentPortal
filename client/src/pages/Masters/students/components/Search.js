export const SearchField = ({handleFilter}  )=>{


    return (
        <div className="flex justify-end mb-4">
          <input
            type="search"
            placeholder="Search"
            className="input input-bordered w-full input-primary max-w-xs rounded-none h-10"
            onChange={handleFilter}
          />
        </div>);
}