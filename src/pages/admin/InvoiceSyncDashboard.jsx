import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, XCircle, Clock, Download, Upload, AlertCircle, Lock } from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const STORAGE_KEY = 'admin_authenticated';

const InvoiceSyncDashboard = () => {
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [dashboardPassword, setDashboardPassword] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [syncStatus, setSyncStatus] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [stats, setStats] = useState({
    totalInvoices: 0,
    unpaidInvoices: 0,
    paidInvoices: 0,
    syncedFromCE: 0,
  });

  useEffect(() => {
    if (authenticated) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [authenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginPassword.trim()) {
      setLoginError('Enter the dashboard password.');
      return;
    }
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        setDashboardPassword(loginPassword);
        setAuthenticated(true);
        setLoginPassword('');
      } else {
        setLoginError(data.error || 'Invalid password');
      }
    } catch (err) {
      setLoginError('Could not verify. Try again.');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setDashboardPassword('');
    setSyncStatus(null);
  };

  const authHeader = () => ({
    'Content-Type': 'application/json',
    ...(dashboardPassword ? { Authorization: `Bearer ${dashboardPassword}` } : {}),
  });

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/invoice-stats', {
        method: 'GET',
        headers: dashboardPassword ? { Authorization: `Bearer ${dashboardPassword}` } : {},
      });
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalInvoices: data.totalInvoices ?? 0,
          unpaidInvoices: data.unpaidInvoices ?? 0,
          paidInvoices: data.paidInvoices ?? 0,
          syncedFromCE: data.syncedFromCE ?? 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    if (authenticated) fetchStats();
  }, [authenticated]);

  const triggerSync = async () => {
    setSyncing(true);
    setSyncStatus(null);
    try {
      const response = await fetch('/api/sync/computerease-import', {
        method: 'POST',
        headers: authHeader(),
      });
      const data = await response.json();
      if (response.ok) {
        setSyncStatus({
          success: true,
          ...data.results,
          timestamp: data.timestamp,
        });
        setLastSync(new Date().toLocaleString());
        fetchStats();
      } else {
        setSyncStatus({
          success: false,
          error: data.error || 'Sync failed',
        });
      }
    } catch (error) {
      setSyncStatus({ success: false, error: error.message });
    } finally {
      setSyncing(false);
    }
  };

  const handleCSVUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSyncing(true);
    setSyncStatus(null);
    try {
      const csvText = await file.text();
      const response = await fetch('/api/sync/csv-import', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ csvData: csvText }),
      });
      const data = await response.json();
      if (response.ok) {
        setSyncStatus({
          success: true,
          ...data.results,
          timestamp: data.timestamp,
        });
        setLastSync(new Date().toLocaleString());
        fetchStats();
      } else {
        setSyncStatus({
          success: false,
          error: data.error || 'Import failed',
        });
      }
    } catch (error) {
      setSyncStatus({ success: false, error: error.message });
    } finally {
      setSyncing(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Admin Login</h1>
              <p className="text-secondary-600 text-sm">Invoice Sync Dashboard</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-secondary-700">Password</span>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-secondary-300 px-4 py-2"
                placeholder="Dashboard password"
                autoComplete="current-password"
              />
            </label>
            {loginError && (
              <p className="text-sm text-red-600">{loginError}</p>
            )}
            <Button type="submit" variant="primary" className="w-full">
              Log in
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-12">
        <div className="container-custom flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Invoice Sync Dashboard</h1>
            <p className="text-secondary-200">Manage ComputerEase invoice synchronization</p>
          </div>
          <Button
            variant="outline"
            className="!text-white !border-white hover:!bg-white/10"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Invoices</p>
                  <p className="text-3xl font-bold text-secondary-900">{stats.totalInvoices}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Unpaid</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.unpaidInvoices}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Paid</p>
                  <p className="text-3xl font-bold text-green-600">{stats.paidInvoices}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">From ComputerEase</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.syncedFromCE}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Sync Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">API Sync</h3>
              <p className="text-secondary-600 mb-6">
                Automatically sync invoices from ComputerEase via REST API
              </p>
              <Button
                onClick={triggerSync}
                disabled={syncing}
                variant="primary"
                className="w-full flex items-center justify-center"
              >
                {syncing ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Trigger Sync Now
                  </>
                )}
              </Button>
              {lastSync && (
                <p className="text-sm text-secondary-500 mt-3 text-center">
                  Last sync: {lastSync}
                </p>
              )}
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">CSV Import</h3>
              <p className="text-secondary-600 mb-6">
                Upload CSV file exported from ComputerEase
              </p>
              <label className="block">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  disabled={syncing}
                  className="hidden"
                  id="csv-upload"
                />
                <Button
                  as="label"
                  htmlFor="csv-upload"
                  disabled={syncing}
                  variant="outline"
                  className="w-full flex items-center justify-center cursor-pointer"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload CSV File
                </Button>
              </label>
              <p className="text-xs text-secondary-500 mt-3">
                CSV should include: Invoice Number, Customer Name, Email, Amount
              </p>
            </Card>
          </div>

          {/* Sync Results */}
          {syncStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={syncStatus.success ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}>
                <div className="flex items-start space-x-4">
                  {syncStatus.success ? (
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className={`text-lg font-bold mb-2 ${syncStatus.success ? 'text-green-900' : 'text-red-900'}`}>
                      {syncStatus.success ? 'Sync Completed Successfully' : 'Sync Failed'}
                    </h4>
                    
                    {syncStatus.success && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-secondary-600">Total</p>
                          <p className="text-2xl font-bold text-secondary-900">{syncStatus.total || 0}</p>
                        </div>
                        <div>
                          <p className="text-sm text-green-600">Created</p>
                          <p className="text-2xl font-bold text-green-700">{syncStatus.created || 0}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600">Updated</p>
                          <p className="text-2xl font-bold text-blue-700">{syncStatus.updated || 0}</p>
                        </div>
                        <div>
                          <p className="text-sm text-amber-600">Skipped</p>
                          <p className="text-2xl font-bold text-amber-700">{syncStatus.skipped || 0}</p>
                        </div>
                      </div>
                    )}

                    {syncStatus.error && (
                      <p className="text-red-800 mb-2">{syncStatus.error}</p>
                    )}

                    {syncStatus.errors && syncStatus.errors.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-secondary-900 mb-2">Errors:</p>
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                          {syncStatus.errors.map((err, idx) => (
                            <p key={idx} className="text-sm text-red-700">
                              {err.invoice}: {err.error || err.reason}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {syncStatus.timestamp && (
                      <p className="text-xs text-secondary-500 mt-3">
                        {new Date(syncStatus.timestamp).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Setup Instructions */}
          <Card className="mt-8 bg-blue-50 border-2 border-blue-200">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-blue-900 mb-2">Setup Required</h4>
                <p className="text-blue-800 mb-4">
                  To enable automatic syncing, you need to configure ComputerEase credentials in your environment variables.
                </p>
                <div className="bg-white rounded p-4 text-sm font-mono text-secondary-700">
                  <p>COMPUTEREASE_API_URL=your_url</p>
                  <p>COMPUTEREASE_API_USERNAME=your_username</p>
                  <p>COMPUTEREASE_API_PASSWORD=your_password</p>
                  <p>COMPUTEREASE_SYNC_ENABLED=true</p>
                </div>
                <p className="text-sm text-blue-700 mt-4">
                  See <strong>COMPUTEREASE_INTEGRATION_GUIDE.md</strong> for detailed setup instructions.
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card hover className="text-center">
              <a
                href="https://snyder-mechanical.sanity.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-secondary-900 mb-2">Sanity Studio</h4>
                <p className="text-sm text-secondary-600">Manage invoices and content</p>
              </a>
            </Card>

            <Card hover className="text-center">
              <a
                href="https://dashboard.stripe.com/test/payments"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-secondary-900 mb-2">Stripe Dashboard</h4>
                <p className="text-sm text-secondary-600">View payments and transactions</p>
              </a>
            </Card>

            <Card hover className="text-center">
              <div className="block">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-secondary-900 mb-2">ComputerEase</h4>
                <p className="text-sm text-secondary-600">Export invoices for import</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoiceSyncDashboard;
