"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from 'react-toastify'
import { collection, addDoc, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

interface DateEvent {
    type: string,
    description: string,
    contact: string,
    location: string,
    visible: string
    date: string
}

export default function CalendarComponent() {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [value, setValue] = useState<Date>(new Date());
    const [dateClicked, setDateClicked] = useState<boolean>(false);
    const [eventList, setEventList] = useState<DateEvent[]>([])
    const [newEvent, setNewEvent] = useState<DateEvent>({
        type: 'meeting',
        description: '',
        contact: '',
        location: '',
        visible: 'all',
        date: ''
    })

    useEffect(() => {
        setIsClient(true);
        getEventsList()
    }, []);

    useEffect(() => {
        console.log(newEvent);
    }, [newEvent])

    function onChange(e: any) {
        const event = eventList.find((event: DateEvent) => event.date === e.toString().slice(0, 15))
        if (event?.description) {
            setNewEvent({ ...event })
        } else {
            setNewEvent({
                type: 'meeting',
                description: '',
                contact: '',
                location: '',
                visible: 'all',
                date: e.toString().slice(0, 15)
            })
            console.log(newEvent);
        }
        setDateClicked(true);
        setValue(e)
    }

    async function getEventsList() {
        const querySnapshot = await getDocs(collection(db, "events"));
        const data = [] as any
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        })
        setEventList(data)
    }

    async function submitEvent(e: any) {
        let response: any = ''
        e.preventDefault()
        if ([...Object.values(newEvent)].some((property) => property === '')) {
            toast.error('Popuni sva polja')
        } else {
            const find = eventList.find((event: DateEvent) => event.date === value.toString().slice(0, 15))
            if (find?.description) {
                console.log(find);
                const docRef = doc(db, 'events')
                const newDocs = eventList.filter((event: DateEvent) => event.date !== value.toString().slice(0, 15))
                newDocs.push({
                    type: newEvent.type.trim(),
                    description: newEvent.description.trim(),
                    contact: newEvent.contact.trim(),
                    location: newEvent.location.trim(),
                    visible: newEvent.visible.trim(),
                    date: newEvent.date
                })
                response = await updateDoc(docRef, { ...newDocs })
            } else {
                response = await addDoc(collection(db, 'events'), {
                    type: newEvent.type.trim(),
                    description: newEvent.description.trim(),
                    contact: newEvent.contact.trim(),
                    location: newEvent.location.trim(),
                    visible: newEvent.visible.trim(),
                    date: newEvent.date
                })
            }
            if (response?.id) {
                toast.success('Uspešno sačuvan događaj')
                setNewEvent({
                    type: 'meeting',
                    description: '',
                    contact: '',
                    location: '',
                    visible: 'all',
                    date: ''
                })
            } else {
                toast.error('Desila se greška')
            }
        }
    }

    function generateClassName(arg: any) {
        const { date } = arg
        const find = eventList.find((event: DateEvent) => event.date === date.toString().slice(0, 15))
        switch (find?.type) {
            case 'meeting':
                return find.type
            case 'start':
                return find.type
            case 'end':
                return find.type
            default:
                return ''
        }
    }


    return isClient ? (
        <div className="flex justify-center flex-col items-center">
            <Calendar
                tileClassName={generateClassName}
                className="w-full p-4 rounded-lg"
                value={value}
                onChange={(e) => onChange(e)}
            />
            <div className="flex items-center justify-center mt-3">
                <div className="flex justify-center items-center"><span className="legend bg-yellow-400 m-2"></span>sastanak</div>
                <div className="flex justify-center items-center"><span className="legend bg-blue-800 m-2"></span>pocetak rada</div>
                <div className="flex justify-center items-center"><span className="legend bg-green-800 m-2"></span>kraj rada</div>
            </div>
            {dateClicked && (
                <form className="max-w-md mx-auto mt-5 w-full h-full">
                    <div className="mb-5">
                        <label
                            htmlFor="dropdown"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Odaberi tip događaja
                        </label>
                        <select
                            value={newEvent.type}
                            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                            required
                            id="dropdown"
                            name="dropdown"
                            className="mt-1 block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                        >
                            <option value="meeting">Sastanak</option>
                            <option value="start">Početak rada</option>
                            <option value="end">Kraj rada</option>
                        </select>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            type="text"
                            name="description"
                            id="description"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="description"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Opis
                        </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                value={newEvent.contact}
                                onChange={(e) => setNewEvent({ ...newEvent, contact: e.target.value })}
                                type="text"
                                name="floating_contact"
                                id="floating_contact"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_contact"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Kontakt osoba
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                value={newEvent.location}
                                type="text"
                                name="floating_location"
                                id="floating_location"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_location"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Lokacija
                            </label>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="visible"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Vidljivo
                        </label>
                        <select
                            onChange={(e) => setNewEvent({ ...newEvent, visible: e.target.value })}
                            value={newEvent.visible}
                            required
                            id="visible"
                            name="visible"
                            className="mt-1 block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                        >
                            <option value="all">Svima</option>
                            <option value="me">Samo meni</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={(e) => submitEvent(e)}
                            type="submit"
                            className="text-black bg-yellow-400 hover:bg-yellow-600 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Sačuvaj događaj
                        </button>
                        <button
                            onClick={(e) => submitEvent(e)}
                            type="submit"
                            className="text-black bg-red-400 hover:bg-red-600 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Obriši događaj
                        </button>
                    </div>
                </form>
            )}
        </div>
    ) : (
        <div className="flex justify-center items-center">
            <div role="status">
                <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
