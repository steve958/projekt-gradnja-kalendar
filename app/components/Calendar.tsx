"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarComponent() {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [value, setValue] = useState<Date>(new Date());
    const [dateClicked, setDateClicked] = useState<boolean>(false)

    useEffect(() => {
        setIsClient(true);
    }, []);

    function onChange(e: any) {
        setDateClicked(true)
        console.log(e);
    }

    return isClient ? (
        <div className="flex justify-center flex-col items-center">
            <Calendar className="w-full p-4 rounded-lg" value={value} onChange={(e) => onChange(e)} />
            {dateClicked &&
                <form className="max-w-md mx-auto mt-20 w-full">
                    <div className="mb-5">
                        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Odaberi tip događaja</label>
                        <select id="dropdown" name="dropdown" className="mt-1 block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                            <option value="option1">Sastanak</option>
                            <option value="option2">Početak rada</option>
                            <option value="option3">Kraj rada</option>
                        </select>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Opis</label>
                    </div>
                    <div className="mb-5">
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">Vidljivo</span>
                        <div className="mt-1 flex items-center">
                            <input type="radio" id="radioOption1" name="radioOptions" className="h-4 w-4 text-yellow-400 focus:ring-yellow-300 dark:focus:ring-yellow-500 border-gray-300 dark:border-gray-600 dark:focus:border-yellow-400" />
                            <label htmlFor="radioOption1" className="ml-2 text-sm text-gray-700 dark:text-gray-400">Svima</label>
                        </div>
                        <div className="mt-1 flex items-center">
                            <input type="radio" id="radioOption2" name="radioOptions" className="h-4 w-4 text-yellow-400 focus:ring-yellow-300 dark:focus:ring-yellow-500 border-gray-300 dark:border-gray-600 dark:focus:border-yellow-400" />
                            <label htmlFor="radioOption2" className="ml-2 text-sm text-gray-700 dark:text-gray-400">Samo meni</label>
                        </div>
                    </div>
                    <button type="submit" className="text-black bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sačuvaj</button>
                </form>}
        </div>
    ) : (
        <div className="flex justify-center items-center">
            <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
