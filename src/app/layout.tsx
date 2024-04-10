
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./styles.css"
import Sidebar from "../components/sidebar/page";

export const metadata: Metadata = {
    title: {
        default: "Admin-Mihalen",
        template: "Aminj-Mihalen | %s"
    },
    description: "admin page"
}
const inter = Inter({ subsets: ["latin"] });
let sidebarActive: number;
export default function AdminLayout(
    { children }: {
        children: React.ReactNode,
    }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                
                    <div className="flex w-dvw h-dvh bg-orange-200">
                        <div className="w-96 h-dvh p-2 ">
                            <div className=" size-full flex flex-col justify-between shadow-lg bg-white rounded-md overflow-hidden border  border-orange-400  border-2">
                                <Sidebar></Sidebar>
                            </div>
                        </div>
                        <main className="flex-1 p-2">
                            <div className="overflow-y-auto size-full shadow-lg rounded-md p-6 pb-0  bg-white border-orange-400  border-2 [&>*>.title]:text-2xl [&>*>.title]:p-4 [&>*>.title]:mb-8 [&>*>.title]:border-b   [&>*>.title]:font-bold">
                                {children}
                            </div>
                        </main>
                    </div>
            </body>
        </html>
    )
}