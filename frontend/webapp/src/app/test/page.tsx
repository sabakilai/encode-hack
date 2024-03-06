"use client";
import { useAppStore } from "@/shared/storage/storeProvider";

const TestPage = () => {
  const { bears, decrease, increase } = useAppStore((state) => state);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Count: {bears}
      <hr />
      <button type="button" onClick={() => void increase()}>
        increase Count
      </button>
      <button type="button" onClick={() => void decrease()}>
        decrease Count
      </button>
    </main>
  );
};

export default TestPage;
