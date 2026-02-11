'use client'

import { useState, useEffect } from 'react'
import { supabase, User } from '@/lib/supabase'
import styles from './users.module.css'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchTerm, users])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('user')
        .select('*')
        .order('id', { ascending: false })

      if (error) throw error
      setUsers(data || [])
      setFilteredUsers(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const { data, error } = await supabase
        .from('user')
        .insert([formData])
        .select()

      if (error) throw error

      setSuccess('用户添加成功！')
      setFormData({ name: '', email: '', address: '' })
      setShowAddModal(false)
      fetchUsers()

      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>用户</span>管理系统
          </h1>
          <p className={styles.subtitle}>
            数据库连接 · 实时同步 · {users.length} 条记录
          </p>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <div className={styles.searchSection}>
            <label className={styles.searchLabel}>搜索用户</label>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="姓名或邮箱..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
                <path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{users.length}</div>
              <div className={styles.statLabel}>总用户数</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{filteredUsers.length}</div>
              <div className={styles.statLabel}>搜索结果</div>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className={styles.addButton}
          >
            <span className={styles.addButtonIcon}>+</span>
            添加新用户
          </button>
        </div>

        <div className={styles.tableSection}>
          {error && (
            <div className={styles.alert} data-type="error">
              {error}
            </div>
          )}
          {success && (
            <div className={styles.alert} data-type="success">
              {success}
            </div>
          )}

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>加载数据中...</p>
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>姓名</th>
                    <th>邮箱</th>
                    <th>地址</th>
                    <th>创建时间</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} style={{ animationDelay: `${index * 0.05}s` }}>
                      <td className={styles.idCell}>{user.id}</td>
                      <td className={styles.usernameCell}>{user.name || '-'}</td>
                      <td className={styles.emailCell}>{user.email || '-'}</td>
                      <td className={styles.addressCell}>{user.address || '-'}</td>
                      <td className={styles.dateCell}>
                        {user.created_at ? new Date(user.created_at).toLocaleString('zh-CN') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>∅</div>
                  <p>没有找到匹配的用户</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className={styles.modal} onClick={() => setShowAddModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>添加新用户</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddUser} className={styles.form}>
              <div className={styles.formGroup}>
                <label>姓名</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="输入姓名"
                />
              </div>

              <div className={styles.formGroup}>
                <label>邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="user@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>地址（可选）</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="输入地址"
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={styles.cancelButton}
                >
                  取消
                </button>
                <button type="submit" className={styles.submitButton}>
                  创建用户
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
