"use client"
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function MajorDetailPage({ params }: {
    params: { majorId: String; };
}) {
    const [major, setMajor] = useState<any>({});
    const [subjects, setSubjects] = useState<any[]>([]);
    const [checkChanged, setCheckChanged] = useState(false);
    console.log(params.majorId);
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const url = "http://localhost:8080/api/subjects";
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonData = await response.json();
                setSubjects(jsonData);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };
        fetchSubjects();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/majors/${params.majorId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonData = await response.json();
                setMajor(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error("Error fetching major:", error);
            }
        };
        fetchData();
    }, [checkChanged]);


    const handleChangeSubjectOfLecturer = (subjectId: string) => {
        const fetchUrl = `http://localhost:8080/api/subjectsOfMajor/${major.id}/${subjectId}`;
        fetch(fetchUrl, {
            method: "PUT",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setCheckChanged(!checkChanged)
                return response.json();
            })
            .then((data) => {
                console.log("Subject added to major:", data);

            })
            .catch((error) => {
                console.error("Error adding subject to major:", error);
            });
    };



    return (
        <>
            {major && (
                <div>
                    <Link href="/majors" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'>Back</Link>
                    <label htmlFor="subject" className="block mt-4 mb-1">
                        <h2 className="text-xl ">
                            Mã ngành: {major.id}
                            <br />
                            Tên ngành: {major.name}
                        </h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {major.subjects?.map((s: any) => {
                                    return (
                                        <tr key={s.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {s.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {s.name}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </label>
                    <span className='block pt-4 tex</tr>t-xl italic font-semibold'>Chọn môn học cho ngành:</span>
                    <div className="grid grid-cols-4 gap-4 mt-4  w-full border p-4 rounded-lg shadow-md shadow-gray-300">
                        {subjects.map((subject) => (
                            <div
                                className="border min-h-16 border-gray-300 space-x-2 rounded-md p-2"
                                key={subject.id}>
                                <input
                                    type="checkbox"
                                    id={subject.id}
                                    checked={major.subjects?.some((s: any) => s.id === subject.id)}
                                    onChange={() => handleChangeSubjectOfLecturer(subject.id)} />
                                <label htmlFor={subject.id}>{subject.name} ( {subject.id} )</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );

} // Add this closing curly brace
export default MajorDetailPage;
