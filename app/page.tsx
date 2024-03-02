'use client';
import Calendar from './components/Calendar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function Home() {
  const [darkThemeAssist, setDarkThemeAssist] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-arial text-sm">
        <h1 className="lg:text-4xl text-xl p-4 text-center">
          Dean Projekt Gradnja Kalendar
        </h1>
        <div className="flex mb-4 items-center w-full justify-center">
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value=""
              checked={darkThemeAssist}
              onClick={() => setDarkThemeAssist(!darkThemeAssist)}
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Prilagodi na tamnu temu
            </label>
          </div>
        </div>
        <Calendar darkThemeAssist={darkThemeAssist} />
      </div>
      <ToastContainer />
    </main>
  );
}
