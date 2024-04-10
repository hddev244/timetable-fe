"use client"
import Spinner from '@/components/Spinner/Spriner';
import React, { useEffect, useState } from 'react';

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5;
function TimetablePage() {
    const numOfPeriod = 6; // replace with your actual value
    const [timetable, setTimetable] = useState<any[][][]>();
    const [rooms, setRooms] = useState<any[]>();
    const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(0);

    const [checkChanged, setCheckChanged] = useState(false);

    const [semesterId, setSemesterId] = useState<number>(0);
    const [semesters, setSemesters] = useState<any[]>([]);

    const [blockId, setBlockId] = useState<number>(0);
    const [blocks, setBlocks] = useState<any[]>([]);

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
        , []);

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
    // useEffect(() => {
    //     const fetchUrl = "http://localhost:8080/generate-timetable";
    //     fetch(fetchUrl, {
    //         method: 'POST',
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data[0]);
    //             setTimetable(data);
    //         });
    // }
    //     , []);
    // replace with your actual timetable

    const handleGenerateTimetable = (blockId: number, semesterId : number ) => {
        if (semesterId === 0 || blockId === 0) {
            alert('Chọn học kỳ và block');
            return;
        }
        const fetchUrl = "http://localhost:8080/generate-timetable";
        // const fetchUrl = `http://localhost:8080/generate-timetable?semesterId=${semesterId}&blockId=${blockId}`;
        fetch(fetchUrl, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data[0]);
                setTimetable(data);
            });
    }

    return (
        <div>
            <h1 className='text-3xl uppercase text-center font-bold '>Thời khóa biêu</h1>
            <div className='grid grid-cols-2 gap-4 w-3/4 m-auto p-4'>
                <div className='' >
                    <label htmlFor="semester" className="block mt-4 mb-1">
                        <span className='block pt-4 text-xl italic font-semibold'>Chọn học kỳ:</span>
                        <select
                            id="semester"
                            name="semester"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={semesterId}
                            onChange={(e) => {
                                setSemesterId(parseInt(e.target.value))
                                // handleChangeSelect()
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
                                // handleChangeSelect()
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
            <div className='border p-4 rounded-xl m-auto'>
                <div className='space-x-8 p-4 flex'>
                    <div className='space-x-4 '>
                        <label htmlFor="dayOfWeek" className='inline-block text-center'>Chọn ngày trong tuần: </label>
                        <select id="dayOfWeek" className='inline-block mx-auto mb-8 p-2 px-4 border rounded-md' onChange={(e) => setDayOfWeek(parseInt(e.target.value) as DayOfWeek)}>
                            <option value={0}>Thứ 2</option>
                            <option value={1}>Thứ 3</option>
                            <option value={2}>Thứ 4</option>
                            <option value={3}>Thứ 5</option>
                            <option value={4}>Thứ 6</option>
                            <option value={5}>Thứ 7</option>
                        </select>
                    </div>
                    <div >
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
                        onClick={() => handleGenerateTimetable(blockId,semesterId)}>Tạo thời khóa biểu</button>
                    </div>
                </div>
               {timetable ?(<table>
                    <thead className='text-center w-full overflow-x-auto' >
                        <tr>
                            <th></th>
                            {numOfPeriod && Array.from(Array(numOfPeriod).keys()).map((i) => (
                                <th key={i} className='border-2 border-gray-300 p-4 font-semibold'>Ca {i + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timetable && timetable[dayOfWeek].map((room, i) => (
                            <tr key={i}>
                                <td className='border-2 border-gray-300 p-4 font-semibold '> {room[0]?.room?.name}</td>
                                {room.map((slot, j) =>
                                    <td className='border-2 border-gray-300 px-16 py-6 text-center text-green-500 font-bold' key={j}>
                                        <span className='block'>{slot?.subjectOfGroupStudent?.groupStudent.id}</span>
                                        <span className='block'>{slot?.subjectOfGroupStudent?.lecturer.id}</span>
                                        <span className='block'>{slot?.subjectOfGroupStudent?.subject.id}</span>
                                    </td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>):(<Spinner />)}
            </div>
        </div>
    );
}

export default TimetablePage;