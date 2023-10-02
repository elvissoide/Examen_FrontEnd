import logoDarkMode from '../assets/dark.png'
import img1 from "../assets/img1.jpeg"
import { useState } from 'react'
import {Link} from 'react-router-dom'


export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div className={darkMode ? "dark" :""}>

            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-2xl font-bold dark:text-white'>HOSPITAL-EE</h1>
                        <ul className='flex items-center'>
                            <li><img onClick={()=>setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40}/></li>
                            <li><Link to="/login" className='bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">LOG IN</Link></li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Hospital Eugenio Espejo</h2>
                        <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>Porque la salud es un derecho universal.</h3>
                    </div>

                    <div className='relative mx-auto bg-gradient-to-b from-indigo-400 rounded-full w-96 h-96 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <img src={img1} alt="vet" className='w-full h-full object-cover' />
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}