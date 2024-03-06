import { AppStoreProvider } from "@/shared/storage/storeProvider";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppStoreProvider>{children}</AppStoreProvider>
    </>
  );
};

export default ContextProviders;
