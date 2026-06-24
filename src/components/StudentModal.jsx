import { useEffect } from 'react'
import { X } from 'lucide-react'
import { getStatusClass } from '../utils/format'

function StudentModal({ student, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    // Lock background scroll when modal is active
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Prevent crashing if student object isn't loaded yet
  if (!student) return null

  // Closes modal safely if user clicks the overlay background
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="student-modal" role="dialog" aria-modal="true" aria-labelledby="student-modal-title">
        <button className="modal-close" onClick={onClose} aria-label="Close student details">
          <X size={20} />
        </button>
        <div className="modal-profile">
          <span className="avatar large">{student.avatar}</span>
          <div>
            <h2 id="student-modal-title">{student.name}</h2>
            <p>{student.department} - {student.year}</p>
          </div>
        </div>
        <div className="modal-stats">
          <div>
            <span>Progress</span>
            <strong>{student.progress}%</strong>
          </div>
          <div>
            <span>Attendance</span>
            <strong>{student.attendance}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className={getStatusClass(student.status)}>{student.status}</strong>
          </div>
        </div>
        <div className="detail-block">
          <span>Project</span>
          <strong>{student.project}</strong>
        </div>
        <div className="detail-block">
          <span>Mentor</span>
          <strong>{student.mentor}</strong>
        </div>
      </div>
    </div>
  )
}

export default StudentModal