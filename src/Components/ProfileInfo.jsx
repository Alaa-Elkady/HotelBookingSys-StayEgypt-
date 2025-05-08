import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export function ProfileInfo() {
  const guest = useSelector((state) => state.guest.guest);
  return (
    <>
      <h1
        style={{ fontFamily: "Kaushan Script" }}
        className="text-2xl font-bold text-[#2c4c74] text-center m-4"
      >
        User Information
      </h1>
      <div>
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">ID:</span>
        {guest.id}
      </div>
      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">Email:</span>
        <Link to={`mailto:${guest.Email}`}>{guest.Email}</Link>
      </div>
      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">Phone:</span>
        <Link to={`tel:${guest.Phone}`}>{guest.Phone}</Link>
      </div>
      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">Gender:</span>
        {guest.Gender}
      </div>
      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">DoB:</span>
        {guest.DateOfBirth}
      </div>
      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">Address:</span>
        {guest.Address}
      </div>
      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">
          Marital Status:
        </span>
        {guest.MaritalStatus}
      </div>
      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">Country:</span>
        {guest.Country}
      </div>
      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">City:</span>
        {guest.City}
      </div>

      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">
          Nationality:
        </span>
        {guest.Nationality}
      </div>
      <div className="flex my-2">
        <span className="font-bold mr-2 text-[#2c4c74] text-lg">
          National ID:
        </span>
        {guest.NationalID}
      </div>
    </>
  );
}
