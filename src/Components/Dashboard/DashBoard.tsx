import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const dummyUsers: User[] = [
      { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin', isBlocked: false },
      { id: 2, name: 'Sara Youssef', email: 'sara@example.com', role: 'User', isBlocked: false },
      { id: 3, name: 'Mohamed Nabil', email: 'mohamed@example.com', role: 'User', isBlocked: true },
    ];
    setUsers(dummyUsers);
  }, []);

  const toggleBlockStatus = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  return (
    <div className="p-4 sm:p-6  bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>

      <div className="overflow-x-auto shadow-lg shadow-red-600 w-full rounded-lg  bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">ID</th>
              <th className="px-4 py-3 whitespace-nowrap">Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Email</th>
              <th className="px-4 py-3 whitespace-nowrap">Role</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-sm font-semibold ${
                      user.isBlocked ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleBlockStatus(user.id)}
                    className={`w-full sm:w-auto px-3 py-1 rounded text-white font-medium transition ${
                      user.isBlocked
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
