"use client"
import React, { useState } from 'react';

interface Period {
  id: number;
  name: string;
}

const PeriodManagement: React.FC = () => {
  const [id, setId] = useState<number>(); // [1]
  const [name, setName] = useState('');
  const [periods, setPeriods] = useState<Period[]>([]);

  React.useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/periods');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setPeriods(jsonData);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };
    fetchPeriods();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPeriod: Period = { id: id ?? 0, name }; // [2]
    const fetchUrl = 'http://localhost:8080/api/periods';
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPeriod),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setPeriods([...periods, jsonData]);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    }
    fetchData();
    
    setPeriods([...periods, newPeriod]);
    setName('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Period Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="id" className="block mb-1">ID:</label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setId(parseInt(e.target.value))}
              className="w-full border  border-gray-300 rounded-md p-2"
              placeholder="Enter ID"
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Name"
            />
          </div>
       </div>
        <div className="flex justify-end m-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          <button type="button" className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
        </div>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">#</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((period, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{period.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeriodManagement;
