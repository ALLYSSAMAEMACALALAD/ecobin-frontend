// type: success | error | info. messages: array of strings.
export default function Alert({ type = 'info', messages = [] }) {
  if (messages.length === 0) return null
  return (
    <div className={`alert alert-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      {messages.length === 1 ? (
        messages[0]
      ) : (
        <ul>
          {messages.map((m) => <li key={m}>{m}</li>)}
        </ul>
      )}
    </div>
  )
}
