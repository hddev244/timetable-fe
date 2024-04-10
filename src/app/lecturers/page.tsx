"use client";
import Link from "next/link";
import { ReactEventHandler, use, useEffect, useState } from "react";

function LecturersPage() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [lecturers, setLecturer] = useState<any[]>([]);
    const [checkCreated, setCheckCreated] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "http://localhost:8080/api/lecturers";
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonData = await response.json();
                setLecturer(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error("Error fetching lecturers:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = () => {
        const lecturerData = {
            id: id,
            name: name,
            subjects: selectedSubjects
        };
        fetch("http://localhost:8080/api/lecturers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lecturerData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setId("");
                setName("");
                setSelectedSubjects([]);
                return response.json();
            })
            .then((data) => {
                console.log("New lecturer created:", data);
                setCheckCreated(!checkCreated);
            })
            .catch((error) => {
                console.error("Error creating lecturer:", error);
            });
    };

    return (
        <>
        <h1 className="text-3xl uppercase mb-4 font-semibold">Quản lý giảng viên</h1>
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="id" className="block mb-1">
                                ID:
                            </label>
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
                            <label htmlFor="name" className="block mb-1">
                                Name:
                            </label>
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
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Save
                        </button>
                        <button type="button" className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                            Cancel
                        </button>
                    </div>
                </form>
                <hr />
                <h2 className="text-xl p-4 mb-4">Danh sách giảng viên</h2>
                <table className="w-full border-collapse mb-8">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">#</th>
                            <th className="border border-gray-400 px-4 py-2">ID</th>
                            <th className="border border-gray-400 px-4 py-2">Họ và Tên</th>
                            <th className="border border-gray-400 px-4 py-2">Môn học có thể dạy</th>
                            <th className="border border-gray-400 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lecturers &&
                            lecturers.map((lecturer, index) => (
                                <tr key={lecturer.id}>
                                    <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-400 px-4 py-2">{lecturer.id}</td>
                                    <td className="border border-gray-400 px-4 py-2">{lecturer.name}</td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <div>
                                            <ul>
                                                {
                                                    lecturer.subjects.map((subject: any) => (
                                                        <li key={subject.id}><span className="font-medium">( {subject.id} )</span> {subject.name} </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md">Sửa</button>
                                        <Link href={`/lecturers/${lecturer.id}`} className="bg-gray-500 mx-2 text-white p-2 rounded-md ">Thay đổi môn</Link>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-md  ">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
        </>
    );
}

export default LecturersPage;