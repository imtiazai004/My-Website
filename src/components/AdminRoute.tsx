import AdminPage from './AdminPage';
import { AuthProvider } from '../context/AuthContext';
import { usePageSeo } from '../lib/seo';

/** The admin console is the only place Firebase Auth is loaded. */
export default function AdminRoute() {
  usePageSeo({ title: 'Admin', noindex: true });
  return (
    <AuthProvider>
      <AdminPage />
    </AuthProvider>
  );
}
