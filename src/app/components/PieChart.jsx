import React from 'react'
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const data = [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
    { name: 'C', value: 200 },
    { name: 'D', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const PieChart1 = () => {
    return (
        <div className='w-[100%] flex justify-center bg-[#f7f9fb] rounded-[20px]'>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    data={data}
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}

export default PieChart1