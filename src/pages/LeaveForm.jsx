import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import UserNavBar from '../components/userNavBar'
import UserSideBar from '../components/userSideBar'
import { submitLeaveData } from '../Api/userApi'

function LeaveForm() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [comment, setComment] = useState('')
  const [leaveType, setleaveType] = useState('')
  const today = new Date().toISOString().split("T")[0]

  const reset = () => {
    setStartDate('')
    setEndDate('')
    setComment('')
    setleaveType('')
  }

  const submitLeaveApplication = async (e) => {
    try {
      e.preventDefault()
      if (!startDate.trim() && !endDate.trim() && !comment.trim() && !leaveType.trim()) {
        return toast.error("Please fill all fields before submission")
      }
      if (!startDate.trim()) {
        return toast.error("start-date field can't be empty")
      }
      if (!endDate.trim()) {
        return toast.error("End-date name can't be empty")
      }
      if (!comment.trim()) {
        return toast.error("Comment can't be empty")
      }
      if (!leaveType.trim()) {
        return toast.error("Leave-type can't be empty")
      }
      const LeaveData = {
        leaveType,
        startDate,
        endDate,
        comment
      }
      const response = await submitLeaveData(LeaveData)
      reset()
      if (response.data.success === false) {
        return toast.error("No of days should not be exceeded than 25")
      }
      if (response.data.success) {
        return toast.success("Leave application submitted successfully")
      }
    } catch (error) {
      return toast.error("Something unexpected happened")
    }
  }

  const cancelLeaveApplication = async () => {
    try {
      reset()
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <UserNavBar />
      {/* <UserSideBar /> */}
      <Toaster richColors position='bottom-right' />
      <form className="mt-20 w-full max-w-lg mx-auto px-4 md:px-0">
        <div className="card font-montserrat text-sm mt-12 shadow-2xl bg-white p-6 rounded-lg">
          <div className="chat-header text-md font-semibold mb-4 text-cyan-900">Apply For Leave</div>

          <div className="flex flex-col mb-4">
            <label className="p-2 text-xs text-cyan-900 text-start" htmlFor="task name">Leave Type</label>
            <select
              id="leave-type"
              value={leaveType}
              onChange={(e) => setleaveType(e.target.value)}
              className="mt-2 px-3 py-2 border rounded-md text-black text-xs"
            >
              <option value="" disabled>Select Leave Type</option>
              <option value="sick">Sick</option>
              <option value="casual">Casual</option>
              <option value="earned">Earned</option>
            </select>
          </div>

          <div className="flex flex-col text-xs mb-4">
            <label className="p-2 text-cyan-900 text-start" htmlFor="duedate">Start Date</label>
            <input
              type='date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              className="focus:outline-none border text-xs p-2 h-10 rounded-md placeholder:text-xs"
              placeholder="Start Date"
            />
          </div>

          <div className="flex flex-col text-xs mb-4">
            <label className="p-2 text-cyan-900 text-start" htmlFor="duedate">End Date</label>
            <input
              type='date'
              value={endDate}
              min={startDate ? startDate : today}
              onChange={(e) => setEndDate(e.target.value)}
              className="focus:outline-none border text-xs p-2 h-10 rounded-md placeholder:text-xs"
              placeholder="End Date"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="p-2 text-xs text-cyan-900 text-start" htmlFor="description">Comments</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="focus:outline-none border p-2 text-xs h-24 rounded-md resize-none placeholder:text-xs placeholder:text-black"
              placeholder="Add your comments"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0">
            <button onClick={submitLeaveApplication} className="send-button bg-gradient-to-tr from-black to-cyan-900 hover:to-cyan-700 text-white py-2 px-4 rounded-md transition duration-500">
              save
            </button>
            <button onClick={cancelLeaveApplication} className="send-button bg-gradient-to-tr from-black to-cyan-900 hover:to-cyan-700 text-white py-2 px-4 rounded-md transition duration-500">
              cancel
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default LeaveForm
