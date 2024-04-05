"use client"
import React, { useEffect, useState } from 'react';

interface Day {
  id: number;
  name: string;
}

const DayManagement: React.FC = () => {
  const [id, setId] = useState<number>();
  const [name, setName] = useState('');
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/days';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setDays(jsonData);
      } catch (error) {
        console.error('Error fetching days:', error);
      }
    };
    fetchData();
  }
    , []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name.trim()) {
      return;
    }
    const newDay: Day = { id, name };
    const fetchUrl = 'http://localhost:8080/api/days';
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDay),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setDays([...days, jsonData]);
        setId(0);
        setName('');
      } catch (error) {
        console.error('Error fetching days:', error);
      }
    }
    fetchData();
  };

  const handleDelete = (id: number) => async () => {
    const fetchUrl = `http://localhost:8080/api/days/${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setDays(days.filter(day => day.id !== id));
      } catch (error) {
        console.error('Error fetching days:', error);
      }
    };
    fetchData();
  }
  const handleEdit = (day: Day) => () => {
    setId(day.id);
    setName(day.name);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Day Management</h1>
      <form onSubmit={handleSubmit} className="mb-8 w-3/4 m-auto ">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="id" className="block mb-1">ID:</label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2"
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
        <div className="flex justify-end p-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          <button type="button" className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
        </div>
      </form>
      <table className="w-2/3 m-auto border-collapse table-fixed">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{day.id}</td>
              <td className="border border-gray-400 px-4 py-2">{day.name}</td>
              <td className="border border-gray-400 px-4 py-2 ">
                <button onClick={handleEdit(day)}
                 className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                <button onClick={handleDelete(day.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DayManagement;
