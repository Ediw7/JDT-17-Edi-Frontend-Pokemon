export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-3xl border-[3px] border-black shadow-[4px_4px_0_0_#000] overflow-hidden relative animate-pulse">
      <div className="pt-[100%] border-b-[3px] border-black bg-gray-200"></div>
      <div className="p-4 flex flex-col items-center">
        <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
      </div>
    </div>
  );
};
