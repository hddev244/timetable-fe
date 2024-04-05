"use client"
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';

interface Major {
  id: string;
  name: string;
}

const MajorManagement: React.FC = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [majors, setMajors] = useState<Major[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/majors';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setMajors(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    };
    fetchData();
  }
  , []);

  const saveMajor = async (major: Major) => {
    const response = await fetch('http://localhost:8080/api/majors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(major),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !name.trim()) {
      return;
    }
    const newMajor: Major = { id, name };
    setMajors([...majors, newMajor]);
    saveMajor(newMajor).catch(e => console.error(e));
    setId('');
    setName('');
  };

  return (
    <div className="p-6 flex flex-col">
      <h1 className="text-2xl mb-4">Major Management</h1>
      <form onSubmit={handleSubmit} className="mb-8 w-3/4 m-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="id" className="block mb-1">ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
      <table className=" border-collapse table-row m-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">#</th>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {majors.map((major, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{major.id}</td>
              <td className="border border-gray-400 px-4 py-2">{major.name}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                <Link className='mx-2 bg-blue-500 text-white px-4 py-2 inline-block rounded-md ' href={`/majors/${major.id}`}>Add Subject</Link>
                <button className=" bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MajorManagement;
