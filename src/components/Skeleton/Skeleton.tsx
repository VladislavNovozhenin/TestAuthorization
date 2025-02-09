const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-6 p-6 h-[470px] mx-auto flex flex-col w-96 items-center">
      <div className="h-8 w-1/2 bg-gray-500 rounded mb-9"></div>
      <ul className="space-y-4 flex flex-col w-full">
        <li className="flex flex-col justify-between mb-9">
          <span className="h-5 w-1/3 bg-gray-500 rounded mb-3"></span>
          <span className="h-5 w-1/2 bg-gray-500 rounded"></span>
        </li>
        <li className="flex flex-col justify-between">
          <span className="h-5 w-1/3 bg-gray-500 rounded mb-3"></span>
          <span className="h-5 w-1/2 bg-gray-500 rounded"></span>
        </li>
      </ul>
      <div className="h-10 bg-gray-500 rounded w-full mt-auto"></div>
    </div>
  );
};

export default Skeleton;
