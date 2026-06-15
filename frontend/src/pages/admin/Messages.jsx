import { useState, useEffect } from 'react';
import { db } from '../../utils/db';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(db.getMessages());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      db.deleteMessage(id);
      setMessages(db.getMessages());
      toast.success("Message deleted");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-secondary mb-8">Form Submissions</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-secondary font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                    No messages received yet.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        msg.type === 'Partner' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {msg.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-secondary">
                      {msg.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs">{msg.email}</div>
                      <div className="text-xs text-gray-400">{msg.phone}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      {msg.type === 'Partner' ? (
                        <div className="text-xs">
                          Role: {msg.type || msg.role}<br/>
                          Exp: {msg.experience} | City: {msg.city}
                        </div>
                      ) : (
                        <div className="text-xs truncate" title={msg.message}>
                          Role: {msg.role}<br/>
                          {msg.message}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(msg.id)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
