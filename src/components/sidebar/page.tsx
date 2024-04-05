"use client"
import type { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "../header/page";

type pageLink = {
    href: string,
    named: string,
}

const pages: pageLink[] = [
    {
        href: "/lecturers",
        named: "Quản lý giảng viên"
    },
    {
        href: "/classes",
        named: "Quản lý lớp học"
    }
    ,
    {
        href: "/majors",
        named: "Quản lý Chuyên ngành"
    }
    ,
    // {
    //     href: "/days",
    //     named: "Quản lý ngày"
    // } ,
    // {
    //     href: "/block",
    //     named: "Quản lý block"
    // } ,
    // {
    //     href: "/periods",
    //     named: "Quản lý ca học"
    // },
    // {
    //     href: "/semesters",
    //     named: "Quản lý học kì"
    // },
    {
        href: "/rooms",
        named: "Quản lý phòng học"
    },
    {
        href: "/subjects",
        named: "Quản lý môn học"
    },
    // {
    //     href: "/school-years",
    //     named: "Quản lý Khoa học"
    // },
     {
         href: "/timetables",
         named: "Thoi khoa bieu"
     },
]

const Sidebar: NextPage = () => {
    const pathName = usePathname();
    const handleLogout = () => {
        
    }
    return (
        <>
            <nav className="size-full flex flex-col justify-between">
                <div>
                    <Header></Header>
                    <ul className="w-full  flex flex-col [&>li]:border">
                        {
                            pages.map((link, index) => {
                                const isActive = pathName.startsWith(link.href);
                                return (
                                    <li key={index} className={(isActive ? "font-bold" : "") +
                                        " text-2xl hover:cursor-pointer hover:bg-gray-200"}>
                                        <Link className=" py-6 text-center  block size-full" href={link.href} > {link.named} </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Sidebar