import micheal from "../../assets/Benefitsicons/micheal.png";
const MyTeam = () => {
  const founders = [
    {
      name: "jordan micheal",
      role: "founder",
      avatar: micheal,
    },
    {
      name: "jordan micheal",
      role: "founder",
      avatar: micheal,
    },
    {
      name: "jordan micheal",
      role: "founder",
      avatar: micheal,
    },
    {
      name: "jordan micheal",
      role: "founder",
      avatar: micheal,
    },
  ];
  return (
    <div className=" flex flex-col  rounded-xl bg-[#fff] shadown-xl">
      <p className="text-xl font-bold capitalize">my teams</p>
      {founders.map((founder) => (
        <div
          key={founder.id}
          className="bg-[#E1E1E1]/50 py-2 flex mb-3 justify-between rounded-full mx-2 shadow-lg"
        >
          <span className="flex gap-1 items-center">
            <img
              src={founder.avatar}
              alt={founder.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="flex items-start flex-col">
              <p className="text-[#000] capitalize text-base  font-bold">
                {founder.name}
              </p>
              <p className="text-[#000] text-xs  capitalize">{founder.role}</p>
            </span>
          </span>
          <button className="bg-[#D6F2F5] text-[#545454] px-4 mr-4 rounded-2xl">
            contact
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyTeam;
