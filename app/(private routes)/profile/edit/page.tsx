'use client'

import css from './EditProfilePage.module.css'
// import Image from 'next/image'
import { updateUser, getMe } from '../../../../lib/api/clientApi'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


const ProfileEdit = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe()
        setUsername(user.username || '')
        setEmail(user.email || '')
      } catch (error) {
        console.error('Failed to load user', error)
      }
    }

    fetchUser()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setUsername(event.target.value)
  }
  
  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
    await updateUser({ username })
    router.push('/profile') 
  } catch (err) {
    console.error('Failed to update user', err)
  }
  }

    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    {/* <Image src="avatar"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    /> */}

    <form onSubmit={handleSaveUser} className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
          onChange={handleChange}
        />
      </div>

      <p>Email: {email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" onClick={() => router.push('/profile')} className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

    )
}

export default ProfileEdit;