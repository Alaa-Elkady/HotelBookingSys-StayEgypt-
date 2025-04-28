export function SearchBar ({ search, setSearch })  {
  return (
    <div className="search-bar w-[200px]">
      <input
        type="text"
        placeholder="Search hotels..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-[#2c4c74] rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
      />
    </div>
  );
};


