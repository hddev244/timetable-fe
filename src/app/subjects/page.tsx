"use client"
import React, { useEffect, useState } from 'react';

interface Subject {
  id: string;
  name: string;
  numOfPeriods: number;
}

const SubjectManagement: React.FC = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [numOfPeriods, setNumOfPeriods] = useState<number>(3);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [checkCreated, setCheckCreated] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/subjects';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setSubjects(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchData();
  }
  , [checkCreated]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !numOfPeriods) {
      return;
    }
    const newSubject: Subject = { id , name, numOfPeriods };
    const fetchUrl = 'http://localhost:8080/api/subjects';
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSubject),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setCheckCreated(!checkCreated);
        setId('');
        setName('');
        setNumOfPeriods(3);
      } catch (error) {
        console.error('Error creating subject:', error);
      }
    }
    fetchData();

  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold  mb-4">Quản lý môn học</h1>
      <form onSubmit={handleSubmit} className="mb-8 w-1/2 m-auto">
        <div>
          <label htmlFor="id" className="block mb-1">Mã môn:</label>
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
          <label htmlFor="name" className="block mb-1">Tên môn học:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter Name"
          />
        </div>
        <div>
          <label htmlFor="numOfPeriods" className="block mb-1">Số ca / tuần:</label>
          <input
            type="number"
            id="numOfPeriods"
            value={numOfPeriods}
            onChange={(e) => setNumOfPeriods(parseInt(e.target.value))}
            className="w-full border-gray-300 border rounded-md p-2"
            placeholder="Enter Number of Periods"
          />
        </div>
        <div className="flex justify-end p-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          <button type="button" className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
        </div>
      </form>
      <table className="  border-collapse m-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">#</th>
            <th className='border border-gray-400 px-4 py-2'>ID</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Number of Periods</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td className="border border-gray-400 text-center px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 text-center px-4 py-2">{subject.id}</td>
              <td className="border border-gray-400 px-4 py-2">{subject.name}</td>
              <td className="border border-gray-400 px-4 py-2">{subject.numOfPeriods}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectManagement;
