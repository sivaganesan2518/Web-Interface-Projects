export default function ConfirmDialog({ message, onCancel, onConfirm }) {
  return (
    <div className="dialog-backdrop" role="dialog" aria-modal="true">
      <div className="confirm-dialog">
        <div className="warning-icon">!</div>
        <h3>Remove this record?</h3>
        <p>{message}</p>
        <div className="dialog-actions"><button className="ghost-btn" onClick={onCancel}>Keep it</button><button className="danger-btn" onClick={onConfirm}>Delete</button></div>
      </div>
    </div>
  );
}
