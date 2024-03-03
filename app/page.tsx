import Calendar from './components/Calendar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 relative">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-arial text-sm">
        <h1 className="lg:text-4xl text-xl p-4 text-center">
          Dean Projekt Gradnja Kalendar
        </h1>
        <Calendar />
      </div>
      <ToastContainer />
    </main>
  );
}
