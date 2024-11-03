import Layout from '@/src/components/Layout/Layout';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic id from the URL

  return (
    <Layout>
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p className="mt-2">Profile ID: {id}</p>
    </div>
    </Layout>
  );
};

export default ProfilePage;
