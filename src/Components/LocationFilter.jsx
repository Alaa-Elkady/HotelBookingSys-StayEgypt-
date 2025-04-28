export function LocationFilter  ({ locationFilter, setLocationFilter, uniqueLocations }) {
  return (
    <select
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      className="w-1/4 border border-[#2c4c74] rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
    >
      <option value="">All Locations</option>
      {uniqueLocations.map((loc, index) => (
        <option key={index} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};