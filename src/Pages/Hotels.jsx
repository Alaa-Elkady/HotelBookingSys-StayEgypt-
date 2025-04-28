import React, { useState } from 'react';
import { Hotels as AllHotels } from "../APIs/hotels";
import {SearchBar} from '../Components/Search';
import {LocationFilter} from '../Components/LocationFilter';
import {HotelCard} from '../Components/HotelCard';

export function HotelsPage () {
  const [visible, setVisible] = useState(4);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Get unique locations
  const uniqueLocations = [...new Set(AllHotels.map((hotel) => hotel.HotelLocation))];

  // Filtered hotels based on search & location
  const filteredHotels = AllHotels.filter(
    (hotel) =>
      hotel.HotelName.toLowerCase().includes(search.toLowerCase()) &&
      (locationFilter ? hotel.HotelLocation === locationFilter : true)
  );

  const showMore = () => {
    setVisible((prev) => prev + 4);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-1/2 flex flex-col md:flex-row justify-center gap-4 m-6 px-4 ">
        {/* Search and Filter Components */}
        <SearchBar search={search} setSearch={setSearch} />
        <LocationFilter
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          uniqueLocations={uniqueLocations}
        />
      </div>

      {/* Hotels Cards */}
      <div className="flex flex-wrap items-center justify-center p-4 gap-6">
        {filteredHotels.slice(0, visible).map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>

      {/* Load More Button */}
      {visible < filteredHotels.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={showMore}
            className="bg-[#2c4c74] text-white px-6 py-2 m-4 rounded-lg hover:bg-[#1b3657] transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
