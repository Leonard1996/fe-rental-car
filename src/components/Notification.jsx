export default function Notification({ backgroundColor, children }) {
  return (
    <div
      style={{
        backgroundColor,
        padding: '1rem',
        borderRadius: '.75rem',
        cursor: 'pointer'
      }}
    >
      {children}
    </div>
  );
}
