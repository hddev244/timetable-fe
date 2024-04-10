"use client"
import React, { use, useEffect, useState } from 'react';

interface Room {
  id: number;
  roomOrdinalNumber: number;
  name: string;
}

const RoomManagement: React.FC = () => {
  const [id, setId] = useState<number>(); // [1
  const [roomOrdinalNumber, setRoomOrdinalNumber] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [checkChanged, setCheckChanged] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rooms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setRooms(jsonData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }
    , [checkChanged]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoom: Room = { id: id ?? 0, roomOrdinalNumber, name }; // [2]
    console.log(newRoom);
    const fetchUrl = 'http://localhost:8080/api/rooms';
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRoom),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        const updatedRooms = rooms.map(room => {
          if (room.id === jsonData.id) {
            return jsonData;
          }
          return room;
        });
        setRooms(updatedRooms);
        setId(0);
        setName('');
        setRoomOrdinalNumber(roomOrdinalNumber + 1);
        setCheckChanged(!checkChanged);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }
    fetchData();
  };

  const handleEdit = (room: Room) => () => {
    setId(room.id);
    setRoomOrdinalNumber(room.roomOrdinalNumber);
    setName(room.name);
  };
  const handleDelete = (id: number) => async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/rooms/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedRooms = rooms.filter(room => room.id !== id);
      setRooms(updatedRooms);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Room Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="id" className="block mb-1">ID:</label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setId(parseInt(e.target.value))}
              className="w-full border-gray-300  border rounded-md p-2"
              placeholder="Enter ID"
            />
          </div>
          <div>
            <label htmlFor="roomOrdinalNumber" className="block mb-1">Room Ordinal Number:</label>
            <input
              type="number"
              id="roomOrdinalNumber"
              value={roomOrdinalNumber}
              onChange={(e) => setRoomOrdinalNumber(parseInt(e.target.value))}
              className="w-full border-gray-300  border rounded-md p-2"
              placeholder="Enter Room Ordinal Number"
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-300  border rounded-md p-2"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          <button type="button" className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
        </div>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">#</th>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Ordinal Number</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{room.id}</td>
              <td className="border border-gray-400 px-4 py-2">{room.roomOrdinalNumber}</td>
              <td className="border border-gray-400 px-4 py-2">{room.name}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={handleEdit(room)} className="bg-blue-500 text-white px-4 py-1 rounded-md">Edit</button>
                <button onClick={handleDelete(room.id)} className="bg-red-500 text-white px-4 py-1 rounded-md ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomManagement;
