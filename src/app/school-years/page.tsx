"use client"
import React, { useEffect, useState } from 'react';

interface SchoolYear {
    id: number;
    name: string;
    groupStudents: GroupStudent[];
}

interface GroupStudent {
    // Define the properties of GroupStudent here
}

function SchoolYearPage() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);

    // Fetch data for schoolYears list
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/schoolYears');
                const data = await response.json();
                setSchoolYears(data);
            } catch (error) {
                console.error('Error fetching schoolYears:', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!id.trim() || !name.trim()) {
            return;
        }
        const newSchoolYear: SchoolYear = { id: parseInt(id), name, groupStudents: [] };
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/schoolYears', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newSchoolYear),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSchoolYears([...schoolYears, data]);
                setId('');
                setName('');
            } catch (error) {
                console.error('Error creating schoolYear:', error);
            }
        }
        fetchData();
    };

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold">Create School Year</h1>
                <form onSubmit={handleSubmit} className="mt-4 w-3/4 m-auto grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="id" className="block mb-1">ID:</label>
                        <input
                            type="number"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
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
                    {/* Add form fields for creating a school year */}
                   <div className='col-span-2 flex justify-end'>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Create
                        </button>
                        <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Cancel
                        </button>
                   </div>
                </form>

                <h2 className="text-xl font-bold mt-8">All School Years</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">ID</th>
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            {/* Add table headers for other properties */}
                        </tr>
                    </thead>
                    <tbody>
                        {schoolYears.map((schoolYear) => (
                            <tr key={schoolYear.id}>
                                <td className="border border-gray-400 px-4 py-2">{schoolYear.id}</td>
                                <td className="border border-gray-400 px-4 py-2">{schoolYear.name}</td>
                                {/* Add table cells for other properties */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SchoolYearPage;