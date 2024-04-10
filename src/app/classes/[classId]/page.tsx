"use client";
import PopupAddManyClass from '@/components/PopupAddManyClass/PopupAddManyClass';
import { NextPage } from 'next';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

interface ClassPageProps {
    classId: string;
}
type subjectOfClass = {
    id?: number;
    subject_id?: string;
    lecturer_id?: string;
    groupStudent_id: string;
    block_id: number;
    semester_id: number;
}

function ClassPage({ params }: {
    params: { classId: String; };
}) {

    const [isShowPopup, setIsShowPopup] = useState(false);
    const [subjectId, setSubjectId] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [majorId, setMajorId] = useState("");
    const [schoolYearId, setSchoolYearId] = useState("");


    const [checkChanged, setCheckChanged] = useState(false);

    const [semesterId, setSemesterId] = useState<number>(1);
    const [semesters, setSemesters] = useState<any[]>([]);

    const [blockId, setBlockId] = useState<number>(1);
    const [blocks, setBlocks] = useState<any[]>([]);

    const [classData, setClassData] = useState<any>({});
    const [subjects, setSubjects] = useState<any[]>([]);

    const [subjectOfClass, setSubjectOfClass] = useState<any[]>([]);

    // load all semesters
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/semesters`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setSemesters(jsonData);
             //   setSemesterId(jsonData.reduce((maxId: number, semester: any) => semester.id > maxId ? semester.id : maxId, 0));
            } catch (error) {
                console.error('Error fetching semesters:', error);
            }
        };
        fetchData();
    },
        []);

    // load all blocks
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/blocks`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setBlocks(jsonData);
            } catch (error) {
                console.error('Error fetching blocks:', error);
            }
        };
        fetchData();
    }, []);

    // load group student by class id
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/groupStudents/${params.classId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setClassData(jsonData);
            } catch (error) {
                console.error('Error fetching class:', error);
            }
        };
        fetchData();
    },
        [checkChanged,isShowPopup]);

    // load subject of major by class id 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/subjects/class/${params.classId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setSubjects(jsonData);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchData();
    },
        []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/subjectOfGroupStudent/list?groupStudent_id=${classData.id}&block_id=${blockId}&semester_id=${semesterId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setSubjectOfClass(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchData();
    }
        , [checkChanged]);

    const handleChangeSubjectOfClass = (subjectId: string) => {
        if( semesterId === 0 || blockId === 0 || classData.id === "" || classData.id === undefined || classData.id === null ||subjectId === "" || subjectId === undefined || subjectId === null){ 
            alert("Vui lòng chọn học kỳ, block và lớp");
            return;
        }
        const dataPut = {
            subject_id: subjectId,
            groupStudent_id: classData.id,
            block_id: blockId,
            semester_id: semesterId
        }
        const fetchUrl = `http://localhost:8080/api/subjectOfGroupStudent/change`;
        fetch(fetchUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataPut),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setCheckChanged(!checkChanged);
                return response.json();
            })
            .then((data) => {
                console.log("Subject added to lecturer:", data);

            })
            .catch((error) => {
                console.error("Error adding subject to lecturer:", error);
            });
    }
    useEffect(() => {
        const fetchUrl = `http://localhost:8080/api/subjectOfGroupStudent/list?groupStudent_id=${classData.id}&block_id=${blockId}&semester_id=${semesterId}`;

        fetch(fetchUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setCheckChanged(!checkChanged);
                return response.json();
            })
            .then((data) => {
                console.log("Subject added to lecturer:", data);

            })
    }
        , [checkChanged]);

    const handleChangeSelect = () => {
        const fetchUrl = `http://localhost:8080/api/subjectOfGroupStudent/list?groupStudent_id=${classData.id}&block_id=${blockId}&semester_id=${semesterId}`;

        fetch(fetchUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setCheckChanged(!checkChanged);
                return response.json();
            })
            .then((data) => {
                console.log("Subject added to lecturer:", data);

            })
    }
    const handleAddManyClass = (subjectId: string,subjectName:string, majorId: string, schoolYearId: string) => {
        if( semesterId === 0 || blockId === 0 || classData.id === "" || classData.id === undefined || classData.id === null ||subjectId === "" || subjectId === undefined || subjectId === null){ 
            alert("Vui lòng chọn học kỳ, block và lớp");
            return;
        }
        setMajorId(majorId);
        setSubjectName(subjectName);
        setSchoolYearId(schoolYearId);
        setSubjectId(subjectId);
        setIsShowPopup(true);
    }


    return classData && (
       <> 
            <div>
            {
                isShowPopup && (
                    <div className='size-full p-2 shadow-lg shadow-gray-500 border-gray-600  absolute rounded-xl flex flex-col h-[380px] w-[720px] top-[50%] left-[50%] translate-x-[-50%] transform translate-y-[-50%] bg-blue-600 '>
                       <div className='flex justify-between p-3 pt-1 '> 
                            <h2 className='text-xl text-white font-semibold'>Thêm vào lớp cùng ngành</h2>
                       <button  className='bg-gray-300 py-1 px-4 rounded-xl outline outline-white border border-white shadow-inner shadow-white'
                                onClick={()=>{setIsShowPopup(false)}}>close</button>
                       </div>
                        <PopupAddManyClass 
                                semesterId={semesterId}
                                subjectName={subjectName}
                                blockId={blockId} 
                                subjectId={subjectId} 
                                majorId={majorId} 
                                schoolYearId={schoolYearId} 
                                />
                    </div>
                )
           }
                <Link href="/classes" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'>Back</Link>
                <div  className="block mt-4 mb-1 h-96 p-8">
                    <h2 className="text-xl ">
                        Mã Lớp: {classData.id}
                    </h2>
                    <span className='block pt-4 text-xl italic font-semibold'>Danh sách môn học của Block</span>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            { 
                            subjectOfClass && (subjectOfClass.map((s: any) => {
    
                                return (
                                    <tr key={s.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {s.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {s.name}
                                        </td>
                                    </tr>
                                )
                            }))}
                        </tbody>
                    </table>
                </div>
                <div className='grid grid-cols-2 my-4 gap-4'>
                        <div>
                            <label htmlFor="semester" className="block mt-4 mb-1">
                                <span className='block pt-4 text-xl italic font-semibold'>Chọn học kỳ:</span>
                                <select
                                    id="semester"
                                    name="semester"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={semesterId}
                                    onChange={(e) => {
                                        setSemesterId(parseInt(e.target.value))
                                        handleChangeSelect()
                                    }}
                                >
                                    <option value={0}>Chọn học kỳ</option>
                                    {semesters.map((semester) => (
                                        <option key={semester.id} value={semester.id}>
                                            {semester.name} - {semester.year}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="block" className="block mt-4 mb-1">
                                <span className='block pt-4 text-xl italic font-semibold'>Chọn Block:</span>
                                <select
                                    id="block"
                                    name="block"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={blockId}
                                    onChange={(e) => {
                                        setBlockId(parseInt(e.target.value))
                                        handleChangeSelect()
                                    }}
                                >
                                    <option value={0}>Chọn Block</option>
                                    {blocks.map((block) => (
                                        <option key={block.id} value={block.id}>
                                            {block.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                <div className='border border-gray-300 rounded-lg p-8 shadow-md'>
                    <span className='block text-xl italic font-semibold'>Chọn môn học cho lớp:</span>
                   
                    <div className="grid grid-cols-4 gap-4 mt-4  w-full border">
                        {subjects.map((subject) => (
                            <div
                                className="border min-h-24 flex flex-col overflow-hidden justify-between border-gray-300 rounded-md "
                                key={subject.id}>
                               <div className='p-2  space-x-2'>
                                    <input
                                        type="checkbox"
                                        id={subject.id}
                                        checked={subjectOfClass.some((s: any) => s.id === subject.id)}
                                        onChange={() => handleChangeSubjectOfClass(subject.id)}
                                    />
                                    <label htmlFor={subject.id}>{subject.name} ( {subject.id} )</label>
                               </div>
                                <div className='flex font-semibold hover:cursor-pointer'>
                                    <button onClick={()=> {
                                        handleAddManyClass(subject.id,subject.name, classData.major.id, classData.schoolYear.id)
                                    }} className='p-2 flex-1 border-e  bg-blue-500 text-white space-x-2'> Thêm vào nhiều lớp</button>
                                    <label htmlFor={subject.id} className={` hover:cursor-pointer p-2 px-6 tex text-white space-x-2 ${subjectOfClass.some((s: any) => s.id === subject.id) ? "bg-green-500" : "bg-red-500"}`}>
                                        {subjectOfClass.some((s: any) => s.id === subject.id) ? "Đã thêm" : "Chưa thêm"}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
       </>
    );
}

export default ClassPage;