export default function ScheduleTable({ rows, showAddress = false }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Point</th>
            {showAddress && <th>Address</th>}
            <th>Waste type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.schedule_id}>
              <td>{row.collection_date}</td>
              <td>{row.time_window}</td>
              <td>{row.point_name}</td>
              {showAddress && <td>{row.point_address}</td>}
              <td>{row.waste_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
