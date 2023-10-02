import { useContext } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'


const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const { auth } = useContext(AuthContext)
    const autenticado = localStorage.getItem('token')
    return (
        <div className='md:flex md:min-h-screen'>

            <div className='md:w-1/5 bg-gray-800 px-5 py-4 '>

                <h2 className='text-4xl font-black text-center text-slate-200'>HOSPITAL EE</h2>

                <p className='text-slate-400 text-center my-4 text-sm'>
                    <span className='bg-green-600 mx-2 w-3 h-3 inline-block rounded-full'>
                    </span>Bienvenido - {auth?.nombre}</p>

                <hr className="mt-5 border-slate-500" />
                <ul className="mt-5">

                    <li className="text-center">
                        <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>ESPECIALIDADES</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/listar' className={`${urlActual === '/dashboard/listar' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>CITAS</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/crear' className={`${urlActual === '/dashboard/crear' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>PACIENTES</Link>
                    </li>
                </ul>

                <hr className="mt-5 border-slate-500" />
                <ul className="mt-5">

                    <li className="text-center">
                        <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Perfil</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/listar' className={`${urlActual === '/dashboard/listar' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Listar</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/crear' className={`${urlActual === '/dashboard/crear' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Crear</Link>
                    </li>
                </ul>

                <hr className="mt-5 border-slate-500" />

                <ul className="mt-5">

                    <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                            bg-red-800 px-4 py-1 rounded-lg" onClick={() => { localStorage.removeItem('token') }}>Salir</Link>

                </ul>



            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>
            </div>



        </div>
    )
}

export default Dashboard