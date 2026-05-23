import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Wrench, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold flex items-center"><Wrench className="mr-2"/> MySkill</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span>{user.name}</span>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 flex items-center">
            <LogOut className="w-4 h-4 mr-1"/> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
