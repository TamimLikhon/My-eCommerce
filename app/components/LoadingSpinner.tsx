import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
        <p className="mt-2 text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;