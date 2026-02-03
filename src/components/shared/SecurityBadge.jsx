import { Lock, Shield } from 'lucide-react';

const SecurityBadge = () => {
  return (
    <div className="flex items-center justify-center space-x-4 text-xs text-secondary-500">
      <div className="flex items-center space-x-1">
        <Lock className="w-3 h-3" />
        <span>256-bit SSL Encrypted</span>
      </div>
      <div className="flex items-center space-x-1">
        <Shield className="w-3 h-3" />
        <span>PCI DSS Compliant</span>
      </div>
    </div>
  );
};

export default SecurityBadge;
