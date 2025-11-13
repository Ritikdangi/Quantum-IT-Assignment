import React, { useMemo, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-GB')

const users = [
  { id: 1, name: 'Michael Holz', date: '2013-10-04', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=12' },
  { id: 2, name: 'Paula Wilson', date: '2014-08-05', role: 'Publisher', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=32' },
  { id: 3, name: 'Antonio Moreno', date: '2015-11-05', role: 'Publisher', status: 'Suspended', avatar: 'https://i.pravatar.cc/80?img=56' },
  { id: 4, name: 'Mary Saveley', date: '2016-09-06', role: 'Reviewer', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=47' },
  { id: 5, name: 'Martin Sommer', date: '2017-08-12', role: 'Moderator', status: 'Inactive', avatar: 'https://i.pravatar.cc/80?img=15' },
  { id: 6, name: 'Sophia Turner', date: '2018-02-19', role: 'Editor', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=21' },
  { id: 7, name: 'Liam Carter', date: '2018-09-30', role: 'Viewer', status: 'Inactive', avatar: 'https://i.pravatar.cc/80?img=5' },
  { id: 8, name: 'Olivia Brown', date: '2019-04-11', role: 'Publisher', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=25' },
  { id: 9, name: 'Ethan Walker', date: '2019-12-02', role: 'Reviewer', status: 'Suspended', avatar: 'https://i.pravatar.cc/80?img=29' },
  { id: 10, name: 'Ava Thompson', date: '2020-07-18', role: 'Moderator', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=35' },
  { id: 11, name: 'Noah Scott', date: '2021-01-07', role: 'Editor', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=41' },
  { id: 12, name: 'Isabella Clark', date: '2021-10-23', role: 'Viewer', status: 'Inactive', avatar: 'https://i.pravatar.cc/80?img=44' },
  { id: 13, name: 'James Lewis', date: '2022-05-12', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=52' },
  { id: 14, name: 'Mia Hall', date: '2022-11-29', role: 'Reviewer', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=60' },
  { id: 15, name: 'Lucas Young', date: '2023-08-03', role: 'Publisher', status: 'Suspended', avatar: 'https://i.pravatar.cc/80?img=62' },
]

const statusColor = {
  Active: '#35c777',
  Suspended: '#f04747',
  Inactive: '#f0a938',
}

function StatusBadge({ status }) {
  const color = statusColor[status] || '#8a96b5'
  return (
    <div className="dashboard-status">
      <span
        className="inline-block w-[10px] h-[10px] rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span>{status}</span>
    </div>
  )
}

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.05.05a2 2 0 0 1-2.82 2.82l-.05-.05a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.1a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.05.05a2 2 0 1 1-2.82-2.82l.05-.05a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.1a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.05-.05a2 2 0 1 1 2.82-2.82l.05.05a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.1a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.05-.05a2 2 0 1 1 2.82 2.82l-.05.05a1.65 1.65 0 0 0-.33 1.82V9c0 .73.43 1.39 1.11 1.69.22.1.47.15.72.11H21a2 2 0 0 1 0 4h-.1a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="m6 6 12 12M6 18 18 6" />
    </svg>
  )
}

export default function Dashboard({ user, onLogout }) {
  const pageSize = 5
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(users.length / pageSize)
  const startIndex = (page - 1) * pageSize
  const pageItems = useMemo(() => users.slice(startIndex, startIndex + pageSize), [startIndex])

  function changePage(next) {
    if (next < 1 || next > totalPages) return
    setPage(next)
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <h2 className="text-2xl font-semibold text-[#1c2c4c]">User Overview</h2>
            <p className="text-sm text-[#7b89a8] mt-1">Static dataset shown after successful authentication</p>
          </div>
          <div className="flex items-center gap-3">
            {user ? <span className="text-sm text-[#7b89a8]">{user.name}</span> : null}
            <button type="button" className="dashboard-logout" onClick={onLogout}>Logout</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date Created</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item, idx) => (
                <tr key={item.id}>
                  <td>{startIndex + idx + 1}</td>
                  <td>
                    <div className="dashboard-name">
                      <div className="dashboard-avatar">
                        <img src={item.avatar} alt={item.name} />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{formatter.format(new Date(item.date))}</td>
                  <td>{item.role}</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td>
                    <div className="dashboard-actions">
                      <button type="button" className="dashboard-action settings" aria-label="Settings">
                        <SettingsIcon />
                      </button>
                      <button type="button" className="dashboard-action delete" aria-label="Remove">
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="dashboard-pagination" aria-label="Table pagination">
          <button
            type="button"
            className="page-btn prev"
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={"page-btn number" + (page === n ? " active" : "")}
              onClick={() => changePage(n)}
              aria-current={page === n ? 'page' : undefined}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="page-btn next"
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}
