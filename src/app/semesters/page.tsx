"use client"
import React, { use, useEffect, useState } from 'react';

interface Semester {
  id: number;
  name: string;
  year: number;
}
const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029];

const SemesterManagement: React.FC = () => {
  const [id, setId] = useState<number>(); // [1
  const [name, setName] = useState('');
  const [year, setYear] = useState<number>(0);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/semesters');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setSemesters(jsonData);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };
    fetchSemesters();
  }
  , []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSemester: Semester = { id: id ?? 0, name, year }; // [2]
    const fetchUrl = 'http://localhost:8080/api/semesters';
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSemester),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setSemesters([...semesters, jsonData]);
        setName('');
        setYear(0);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    }
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Semester Management</h1>
      <form onSubmit={handleSubmit} className="mb-8 w-3/4 m-auto">
      <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="id" className="block mb-1">ID:</label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setId(parseInt(e.target.value))}
              className="w-full border-gray-300 border rounded-md p-2"
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
              className="w-full border-gray-300 border rounded-md p-2"
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label htmlFor="year" className="block mb-1">Year:</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full border-gray-300 border rounded-md p-2"
            >
              <option value="">Select Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          <button type="button" className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
        </div>
      </form>
      <table className="w-full border-collapse p-4">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">#</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Year</th>
          </tr>
        </thead>
        <tbody>
          {semesters.map((semester, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{semester.name}</td>
              <td className="border border-gray-400 px-4 py-2">{semester.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SemesterManagement;
