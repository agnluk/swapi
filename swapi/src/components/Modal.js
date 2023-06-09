import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.scss';

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
}