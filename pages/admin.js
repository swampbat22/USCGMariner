// pages/admin.js
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { data, error } = await supabase.from('users').select('*')
      if (!error) setUsers(data || [])
    }

    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-blue-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="border-b border-blue-800 pb-2">
            <strong>{user.full_name || user.email}</strong><br />
            ID: {user.id}
          </li>
        ))}
      </ul>
    </div>
  )
}
