import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import UserNavBar from '../components/userNavBar';
import { fetchRestricteddates, submitLeaveData } from '../Api/userApi';

function LeaveForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comment, setComment] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [restrictedDates, setRestrictedDates] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  const reset = () => {
    setStartDate('');
    setEndDate('');
    setComment('');
    setLeaveType('');
  };

  useEffect(() => {
    const fetchRestrictedDates = async () => {
      try {
        const response = await fetchRestricteddates();
        setRestrictedDates(response.data.restrictedDates.map(date => new Date(date).toISOString().split('T')[0])); 
      } catch (error) {
        toast.error('Something unexpected happened');
      }
    };
    fetchRestrictedDates();
  }, []); 

  const isRestrictedDate = (date) => {
    return restrictedDates.includes(date);
  };

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    if (isRestrictedDate(selectedDate)) {
      toast.error('This date is restricted. Please select another date.');
      setStartDate(''); 
    } else {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;
    if (isRestrictedDate(selectedDate)) {
      toast.error('This date is restricted. Please select another date.');
      setEndDate(''); 
    } else {
      setEndDate(selectedDate);
    }
  };

  const submitLeaveApplication = async (e) => {
    e.preventDefault();
    try {
      if (!startDate.trim() || !endDate.trim() || !comment.trim() || !leaveType.trim()) {
        return toast.error('Please fill all fields before submission');
      }

      const leaveData = { leaveType, startDate, endDate, comment };
      const response = await submitLeaveData(leaveData);
      reset();

      if (response.data.success === false) {
        return toast.error('Number of days should not exceed 25');
      }
      if (response.data.success) {
        return toast.success('Leave application submitted successfully');
      }
    } catch (error) {
      toast.error('Something unexpected happened');
    }
  };

  const cancelLeaveApplication = () => reset();

  return (
    <>
      <UserNavBar />
      <Toaster richColors position="bottom-right" />
      <form className="mt-20 w-full max-w-lg mx-auto px-4 md:px-0">
        <div className="card font-montserrat text-sm mt-12 shadow-2xl bg-white p-6 rounded-lg">
          <div className="chat-header text-md font-semibold mb-4 text-cyan-900">Apply For Leave</div>

          <div className="flex flex-col mb-4">
            <label className="p-2 text-xs text-cyan-900 text-start" htmlFor="leave-type">Leave Type</label>
            <select
              id="leave-type"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="mt-2 px-3 py-2 border rounded-md text-black text-xs"
            >
              <option value="" disabled>Select Leave Type</option>
              <option value="sick">Sick</option>
              <option value="casual">Casual</option>
              <option value="earned">Earned</option>
            </select>
          </div>

          <div className="flex flex-col text-xs mb-4">
            <label className="p-2 text-cyan-900 text-start" htmlFor="start-date">Start Date</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={handleStartDateChange}
              min={today}
              max={endDate || ''}
              className="focus:outline-none border text-xs p-2 h-10 rounded-md placeholder:text-xs"
              placeholder="Start Date"
            />
          </div>

          <div className="flex flex-col text-xs mb-4">
            <label className="p-2 text-cyan-900 text-start" htmlFor="end-date">End Date</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate || today}
              className="focus:outline-none border text-xs p-2 h-10 rounded-md placeholder:text-xs"
              placeholder="End Date"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="p-2 text-xs text-cyan-900 text-start" htmlFor="comments">Comments</label>
            <textarea
              id="comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="focus:outline-none border p-2 text-xs h-24 rounded-md resize-none placeholder:text-xs placeholder:text-black"
              placeholder="Add your comments"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0">
            <button
              onClick={submitLeaveApplication}
              className="send-button bg-gradient-to-tr from-black to-cyan-900 hover:to-cyan-700 text-white py-2 px-4 rounded-md transition duration-500"
            >
              Save
            </button>
            <button
              onClick={cancelLeaveApplication}
              className="send-button bg-gradient-to-tr from-black to-cyan-900 hover:to-cyan-700 text-white py-2 px-4 rounded-md transition duration-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default LeaveForm;
