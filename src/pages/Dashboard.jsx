import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import UserNavBar from '../components/userNavBar';
import UserSideBar from '../components/userSideBar';
import { getLeaveData } from '../Api/userApi';
import { toast } from 'sonner';
ChartJS.register(Title, Tooltip, Legend, ArcElement);
const PieChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await getLeaveData();
        if (response.data.success) {
          setUserData(response.data.userData);
          const userData = response.data.userData;
          const arr = [userData.sickLeave, userData.casualLeave, userData.earnedLeave];
          setChartData(arr);
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };
    fetchLeaveData();
  }, []);
  const data = {
    labels: ['Sick Leave', 'Casual Leave', 'Earned Leave'],
    datasets: [
      {
        label: 'Leave Types',
        data: chartData,
        backgroundColor: ['#4e79e6', '#f4804f', '#FFCE56'],
        borderColor: ['#4e79e6', '#f4804f', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <>
      <UserNavBar />
      <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-2">
            <h2 className="text-lg font-bold">Dashboard:</h2>
            <a
              href="/leave-application"
              className="w-full md:w-44 h-10 border border-green-400 rounded-md text-green-500 text-center flex items-center justify-center"
            >
              Apply Leave
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-400 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-2 md:px-4 py-2">Employee Name</th>
                  <th className="border border-gray-400 px-2 md:px-4 py-2">Sick Leaves</th>
                  <th className="border border-gray-400 px-2 md:px-4 py-2">Casual Leaves</th>
                  <th className="border border-gray-400 px-2 md:px-4 py-2">Earned Leaves</th>
                  <th className="border border-gray-400 px-2 md:px-4 py-2">Total No. of Leaves</th>
                  <th className="border border-gray-400 px-2 md:px-4 py-2">Total No. of Availed Leaves</th>
                  <th className="border border-gray-400 px-2 md:px-4 py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-2 md:px-4 py-2">{userData.name}</td>
                  <td className="border border-gray-400 px-2 md:px-4 py-2 text-center">{userData.sickLeave}</td>
                  <td className="border border-gray-400 px-2 md:px-4 py-2 text-center">{userData.casualLeave}</td>
                  <td className="border border-gray-400 px-2 md:px-4 py-2 text-center">{userData.earnedLeave}</td>
                  <td className="border border-gray-400 px-2 md:px-4 py-2 text-center">{userData.totalLeaves}</td>
                  <td className="border border-gray-400 px-2 md:px-4 py-2 text-center">
                    {parseInt(userData.sickLeave) + parseInt(userData.casualLeave) + parseInt(userData.earnedLeave)}
                  </td>
                  <td className="border border-gray-400 px-2 md:px-4 py-2 text-center">
                    {parseInt(userData.totalLeaves) - (parseInt(userData.sickLeave) + parseInt(userData.casualLeave) + parseInt(userData.earnedLeave))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-10 md:mt-20 w-full">
          <div className="chart-container w-full max-w-md bg-gray-100 rounded-lg shadow-md p-4">
            <h2 className="text-center text-lg font-semibold mb-4">Leave Type Distribution</h2>
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PieChartComponent;
