import { useContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form';
import AuthContext from "../context/AuthProvider"
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";

export const Formulario = ({ paciente }) => {

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control, setValue } = useForm();
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        if (paciente) {
            Object.keys(paciente).forEach(key => {
                setValue(key, paciente[key]);
            });
        }
    }, [paciente, setValue]);

    const onSubmit = async (data) => {
        try {
          // Elimina espacios al inicio y al final para registrar en el json
          const trimmedData = Object.keys(data).reduce((acc, key) => {
            acc[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
            return acc;
          }, {});
      
          // Obtener la lista actual de pacientes
          const token = localStorage.getItem("token");
          const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`;
          const options = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(url, options);
          const pacientesExistente = response.data;
      
          // Validar paciente duplicado solo al crear uno nuevo
          if (!paciente?._id) {
            const duplicado = pacientesExistente.some(
              (pacienteExistente) =>
                pacienteExistente.nombre.toLowerCase() === data.nombre.toLowerCase() &&
                pacienteExistente.propietario.toLowerCase() === data.propietario.toLowerCase()
            );
      
            if (duplicado) {
              setMensaje({
                respuesta: "Ya existe un paciente con el mismo nombre y dueño.",
                tipo: false,
              });
              return;
            }
          }
      
          // Solicitud al endpoint
          if (paciente?._id) {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente._id}`;
            const options = {
              headers: {
                method: "PUT",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
            await axios.put(url, trimmedData, options);
            navigate("/dashboard/listar");
          } else {
            const token = localStorage.getItem("token");
            trimmedData.id = auth._id;
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
            const options = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
            await axios.post(url, trimmedData, options);
            navigate("/dashboard/listar");
          }
        } catch (error) {
          setMensaje({ respuesta: error.response.data.msg, tipo: false });
          setTimeout(() => {
            setMensaje({});
          }, 3000);
        }
      };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la mascota: </label>
                <Controller
                    name='nombre'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Ingresa solo letras en este campo',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='nombre de la mascota'
                                maxLength={40}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='propietario:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del propietario: </label>
                <Controller
                    name='propietario'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Ingresa solo letras en este campo',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='nombre del propietario'
                                maxLength={40}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Formato de correo electrónico inválido',
                        },
                        validate: value => value.trim() === value
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="email"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='email del propietario'
                                maxLength={60}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='celular:'
                    className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
                <Controller
                    name='celular'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'Ingresa solo números en este campo',
                        },
                        maxLength: {
                            value: 15,
                            message: 'El número de celular debe tener un máximo de 15 dígitos',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="number"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='celular del propietario'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='convencional:'
                    className='text-gray-700 uppercase font-bold text-sm'>Convencional: </label>
                <Controller
                    name='convencional'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'Ingresa solo números en este campo',
                        },
                        maxLength: {
                            value: 15,
                            message: 'El número de celular debe tener un máximo de 15 dígitos',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="number"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='convencional del propietario'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='Salida:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de salida: </label>
                <Controller
                    name='salida'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Este campo es obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="date"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='salida'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='sintomas:'
                    className='text-gray-700 uppercase font-bold text-sm'>Síntomas: </label>
                <Controller
                    name='sintomas'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Este campo es obligatorio'
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <textarea
                                {...field}
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Ingrese los síntomas de la mascota'
                                maxLength={150}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all'
                value={paciente?._id ? 'Actualizar paciente' : 'Registrar paciente'}
            />

        </form>
    )
}