import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Type A", value: 35, color: "#F4A9A0" },
  { name: "Type B", value: 25, color: "#A9C6E8" },
  { name: "Type C", value: 20, color: "#B7E0D3" },
  { name: "Type D", value: 15, color: "#F9D9A0" },
  { name: "Type E", value: 5, color: "#E84C3D" },
];

const ComplaintDistributionChart = () => {
  return (
    <div className="flex flex-col items-start justify-center shadow-md p-4 w-[40%]">
      <p className="text-xl text-[#545454] capitalize font-sans font-semibold w-full text-center">
        Complaint Distribution By Type
      </p>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplaintDistributionChart;
