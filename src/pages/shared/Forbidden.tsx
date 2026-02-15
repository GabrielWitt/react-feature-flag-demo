import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import StateCard from '../../components/ui/StateCard';
import { useAuth } from '../../hooks/useAuth';
import { getUserHomePath } from '../../utils/authorization';

const Forbidden = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const homePath = getUserHomePath(user);

  return (
    <MainLayout title="Access denied" subtitle="You do not have permission to view this page">
      <StateCard
        title="Access denied."
        message="Your account does not have access to this resource."
        actionLabel="Go to dashboard"
        onAction={() => navigate(homePath)}
        tone="warning"
      />
    </MainLayout>
  );
};

export default Forbidden;
