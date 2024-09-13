import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DataType = {
  normal: "Thấp",
  high: "Cao",
  medium: "Trung Bình"
}

export const Chart = ({ data }) => {
  const newData = data.map((value) => ({name: DataType[value.name], "Tổng": value.total}))
  
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={150} height={40} data={newData}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='Tổng' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
}; 