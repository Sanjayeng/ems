import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InternSubmissionsReview = () => {
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      intern: "Rahul",
      task: "Dashboard Design",
      submittedOn: "Feb 10, 2026",
      status: "pending",
    },
    {
      id: 2,
      intern: "Priya",
      task: "API Integration",
      submittedOn: "Feb 12, 2026",
      status: "approved",
    },
  ]);

  const updateStatus = (id, status) => {
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Review All Intern Submissions
        </h1>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition"
        >
          ← Back
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Intern</th>
              <th className="p-4">Task</th>
              <th className="p-4">Submitted On</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {submissions.map((item) => (
              <tr key={item.id}>
                <td className="p-4 font-medium">{item.intern}</td>
                <td className="p-4">{item.task}</td>
                <td className="p-4">{item.submittedOn}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : item.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 space-x-2">
                  {item.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(item.id, "approved")
                        }
                        className="bg-green-500 text-white px-3 py-1 text-xs rounded-md hover:bg-green-600"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(item.id, "rejected")
                        }
                        className="bg-red-500 text-white px-3 py-1 text-xs rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default InternSubmissionsReview;
