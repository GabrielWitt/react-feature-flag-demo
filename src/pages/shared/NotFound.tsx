import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import StateCard from '../../components/ui/StateCard';
import { useAuth } from '../../hooks/useAuth';
import { getUserHomePath } from '../../utils/authorization';

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const homePath = getUserHomePath(user);

  return (
    <MainLayout title="Not found" subtitle="The page or resource you requested does not exist">
      <StateCard
        title="Resource not found."
        message="Check the URL or return to your dashboard."
        actionLabel="Go to dashboard"
        onAction={() => navigate(homePath)}
      />
    </MainLayout>
  );
};

export default NotFound;
