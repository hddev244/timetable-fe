"use client"
import React, { use, useEffect, useState } from 'react';

interface Block {
  id: number;
  name: string;
}

const BlockManagement: React.FC = () => {
  const [id, setId] = useState<number>();
  const [name, setName] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/blocks';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setBlocks(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching blocks:', error);
      }
    };
    fetchData();
  }
  , []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlock: Block = {
      id: id ?? 0,
      name,
    };
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/blocks';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBlock),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setBlocks([...blocks, jsonData]);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching blocks:', error);
      }
    }
    fetchData();

  };
  const handleDelete = (id: number) => async () => {
    try {
      const url = `http://localhost:8080/api/blocks/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setBlocks(blocks.filter((block) => block.id !== id));
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Block Management</h1>
      <form onSubmit={handleSubmit} className="mb-8  w-3/4 m-auto">
          <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="id" className="block mb-1">ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
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
        </div>
        <div className="flex justify-end p-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          <button type="button" className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
        </div>
      </form>
      <table className="w-full border-collapse w-1/2 m-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{block.id}</td>
              <td className="border border-gray-400 px-4 py-2">{block.name}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                <button onClick={handleDelete(block.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlockManagement;
