import ProviderRoute from "@/components/routes/ProviderRoute";

const ProviderIndex = () => {
  return (
    <ProviderRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient rounded-0">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-center">
            Provider Dashboard Page
          </h1>
        </div>
      </div>
    </ProviderRoute>
  );
};

export default ProviderIndex;
