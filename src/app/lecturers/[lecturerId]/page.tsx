"use client"
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
    params : {
      productId : string;
    }
  }
function LecturePage({ params }: {
    params: { lecturerId: String; };
}) {
    const [lecturer, setLecturer] = useState<any>({});
    const [subjects, setSubjects] = useState<any[]>([]);
    const [checkChanged, setCheckChanged] = useState(false);
    console.log(params.lecturerId);
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

                console.log(jsonData);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };
        fetchSubjects();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/lecturers/${params.lecturerId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonData = await response.json();
                setLecturer(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error("Error fetching lecturer:", error);
            }
        };
        fetchData();
    }, [checkChanged]);

    const handleChangeSubjectOfLecturer = (subjectId: string) => {
        const fetchUrl = `http://localhost:8080/api/subjectsoflecturer/${lecturer.id}/${subjectId}`;
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
                console.log("Subject added to lecturer:", data);

            })
            .catch((error) => {
                console.error("Error adding subject to lecturer:", error);
            });
    };



    return (
        <>
            {lecturer && (
                <div>
                <Link href="/lecturers" 
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'>Back</Link>
                <div className="block mt-4 border p-4 mb-4">
                    <h2> Mã giảng viên: </h2>
                        <br />
                    <h2>Tên giảng viên: <span className='font-semibold'>{lecturer.name}</span></h2>
                    
                </div>
                <span className='font-semibold text-2xl my-10'>Môn học có thể dạy:</span>
                <div className="grid grid-cols-4 gap-4 mt-4  w-full">
                    {subjects.map((subject) => (
                        <div
                            className="border min-h-16 border-gray-300 space-x-2 rounded-md p-2"
                            key={subject.id}>
                            <input
                                type="checkbox"
                                id={subject.id}
                                checked={lecturer.subjects?.some((s: any) => s.id === subject.id)}
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
export default LecturePage;
