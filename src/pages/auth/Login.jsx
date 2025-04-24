import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import retaileye from '../../assets/retaileye.png';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log('Login attempt:', data);

        const isValidAdmin = data.username === 'admin' && data.password === 'password';
        const isValidEmployee = (data.username === 'employee1' || data.username === 'employee2') && data.password === 'password';

        if (isValidAdmin) {
            localStorage.setItem(
                'user',
                JSON.stringify({ username: data.username, role: 'admin' })
            );
            navigate('/');
        } else if (isValidEmployee) {
            localStorage.setItem(
                'user',
                JSON.stringify({ username: data.username, role: 'employee', id: data.username === 'employee1' ? 'f66f9522-f48d-47f9-969f-2ce9cd48c002' : 'f5743f51-26c4-42af-a71f-22d4faa0220e' })
            );
            navigate('/pick-up-shifts');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="relative w-full h-screen bg-[#64769b] overflow-hidden">
            {/* Background logo */}
            <img
                src={retaileye}
                alt="RetailEye Logo"
                className="absolute inset-0 w-full h-full object-contain opacity-25"
            />

            {/* Overlay: Login Form */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-white/90 p-8 rounded-2xl shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome to RetailEye</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">Username</label>
                            <input
                                {...register('username', { required: true })}
                                type="text"
                                placeholder="Enter your username"
                                className="placeholder-red-300 text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
                            <input
                                {...register('password', { required: true })}
                                type="password"
                                placeholder="••••••••"
                                className="placeholder-red-300 text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};