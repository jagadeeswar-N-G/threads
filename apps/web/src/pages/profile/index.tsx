import Layout from '@/src/components/Layout/Layout';
import TwitterProfile from '@/src/components/TwitterProfile';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic id from the URL

  return (
    <Layout>
    <TwitterProfile/>
    </Layout>
  );
};

export default ProfilePage;
