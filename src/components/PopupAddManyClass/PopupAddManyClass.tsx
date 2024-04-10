import type { NextPage } from "next";
import { useEffect, useState } from "react";

function PopupAddManyClass(
    {
        blockId,
        semesterId,
        subjectId,
        subjectName,
        majorId,
        schoolYearId,
        

    }: {
        blockId: number,
        semesterId: number,
        subjectId: string,
        subjectName: string,
        majorId: string,
        schoolYearId: string,
    }

) {
    const [checkChanged, setCheckChanged] = useState(false);
    const [subjectOfClass, setSubjectOfClass] = useState<any[]>([]);
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/subjectOfGroupStudent/list/by-subject?subject_id=${subjectId}&block_id=${blockId}&semester_id=${semesterId}&schoolYear_id=${schoolYearId}&major_id=${majorId}`;
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

    const handleChangeSubjectOfClass = (classId: string) => {
        const dataPut = {
            subject_id: subjectId,
            groupStudent_id: classId,
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

    const [classData, setClassData] = useState<any[]>([]);
    useEffect(() => {
        const fetchUrl = `http://localhost:8080/api/groupStudents/${majorId}/${schoolYearId}`;
        const fetchData = async () => {
            try {

                const response = await fetch(fetchUrl);
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
    }
        , []);

    return (
        <>
            <div className="size-full bg-white rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3 mt-4 w-full ">
                    {classData&&classData.map((cl) => (
                        <label htmlFor={cl.id}>
                            <div
                                className="border min-h-16 flex flex-col overflow-hidden justify-between border-gray-300 rounded-md "
                                key={cl.id}>
                                <div className='p-2 space-x-2'>
                                    <input
                                        type="checkbox"
                                        id={cl.id}
                                        checked={subjectOfClass.some((s: any) => s.id === cl.id)}
                                        onChange={() => handleChangeSubjectOfClass(cl.id)}
                                    />
                                    <span>{cl.id} </span>
                                </div>
                                
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PopupAddManyClass