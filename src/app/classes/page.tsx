"use client"
import type { NextPage } from "next";
import Link from "next/link";
import { use, useEffect, useState } from "react";

type Major = {
  id: string;
  name: string;
};

type SchoolYear = {
  id: number;
  name: string;
};

const ClassesPage: NextPage = () => {
  const [majors, setMajors] = useState<Major[]>([]);
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);

  const [id, setId] = useState('');
  const [name, setName] = useState('class name');
  const [major, setMajor] = useState('');
  const [schoolYear, setSchoolYear] = useState('');

  const [groupStudents, setGroupStudents] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/schoolYears';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setSchoolYears(jsonData);
      } catch (error) {
        console.error('Error fetching school-years:', error);
      }
    };
    fetchData();
  }
    , []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/groupStudents';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setGroupStudents(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching group-students:', error);
      }
    };
    fetchData();
  }
    , []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !name.trim() || !major || !schoolYear) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    } else if (id.length !== 2 || isNaN(Number(id))) {
      alert('ID phải có 2 ký tự số !');
      return;
    }
    const newId = major + schoolYear + id;
    const newGroupStudent = { id: newId, name, major, schoolYear };
    const fetchUrl = 'http://localhost:8080/api/groupStudents';
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGroupStudent),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setGroupStudents([...groupStudents, jsonData]);
        setId('');
        setName('asdasd');
        setMajor('');
        setSchoolYear('');
        alert('Thêm thành công!');
      } catch (error) {
        console.error('Error fetching group-students:', error);
      }
    };
    fetchData();
  };
  const handleEdit = (groupStudent: any) => () => {
    const id = groupStudent?.id.slice(-2);
    setId(id);
    setName(groupStudent?.name);
    setMajor(groupStudent.major?.id);
    setSchoolYear(groupStudent.schoolYear?.id);
  }
  const handleDelete = (id: string) => () => {
    const fetchUrl = `http://localhost:8080/api/groupStudents/${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setGroupStudents(groupStudents.filter(groupStudent => groupStudent.id !== id));
      } catch (error) {
        console.error('Error fetching group-students:', error);
      }
    };
    fetchData();
  }
  return (
    <>
    {}
      <div className="p-6">
        <h1 className="text-3xl font-semibold uppercase mb-4">Quản lý lớp học</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="id" className="block mb-1">Mã lớp:</label>
              <div className=" flex items-center space-x-2">
                <span>{major}{schoolYear}</span><input
                  type="text"
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full  border border-gray-500 rounded-md p-2"
                  placeholder="Enter ID"
                />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block mb-1">Tên  lớp:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-500 rounded-md p-2"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label htmlFor="major" className="block mb-1">Ngành học:</label>
              <select
                id="major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full border border-gray-500 rounded-md p-2"
              >
                <option value="">Chọn ngành</option>
                {
                  majors.map((major, index) => (
                    <option key={index} value={major.id}>{major.name} ({major.id})</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor="schoolYear" className="block mb-1">Khóa</label>

              <select
                id="schoolYear"
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                className="w-full border border-gray-500 rounded-md p-2"
              >
                <option value="">Chọn khóa học</option>
                {
                  schoolYears.map((schoolYear, index) => (
                    <option key={index} value={schoolYear.id}>{schoolYear.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="flex justify-end p-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
            <button type="button" className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
          </div>
        </form>
        <h1 className="m-4 text-xl font-semibold"> Danh sách lớp học</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">#</th>
              <th className="border border-gray-400 px-4 py-2">Khóa</th>
              <th className="border border-gray-400 px-4 py-2">Ngành học</th>
              <th className="border border-gray-400 px-4 py-2">Mã lớp</th>
              <th className="border border-gray-400 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {groupStudents && groupStudents.map((groupStudent, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-400 px-4 py-2">{groupStudent.schoolYear?.name}</td>
                <td className="border border-gray-400 px-4 py-2">{groupStudent.major?.name}</td>
                <td className="border border-gray-400 px-4 py-2">{groupStudent.id}</td>
                <td className="border border-gray-400 px-4 py-2 ">
                  <Link href={`/classes/${groupStudent.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >Thêm môn học</Link>
                  <button type="button" onClick={handleEdit(groupStudent)} className="ml-2 bg-emerald-500 text-white px-4 py-2 rounded-md">Sửa</button>
                  <button type="button" onClick={handleDelete(groupStudent.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md">xóa</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ClassesPage