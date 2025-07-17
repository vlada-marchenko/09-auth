import Link from 'next/link';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import { Metadata } from 'next';
import { getServerMe } from '../../../lib/api/serverApi';


export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'View and edit your profile information',
  openGraph: {
    title: 'Profile Page',
    description: 'View and edit your profile information',
    url: 'https://09-auth-ivory.vercel.app/profile',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'Profile Page'
    }]
}} 


const Profile = async () => {
   const user = await getServerMe()

    return (
        <div><main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
       <Link href="/profile/edit" className={css.editProfileButton}>
         Edit Profile
       </Link>
	   </div>
     <div className={css.avatarWrapper}>
       <Image
        src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      /> 
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>
</div>
    )
}

export default Profile;