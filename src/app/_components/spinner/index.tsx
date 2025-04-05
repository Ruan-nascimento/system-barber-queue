import { twMerge } from "tailwind-merge";

export const Spinner = ({border='border-orange-500', ...rest}: {className?:string, border?:string}) => {
    return (
      <div className={twMerge("flex justify-center items-center", rest.className)}>
        <div className={`w-6 h-6 border-4 ${border} border-t-transparent rounded-full animate-spin`}></div>
      </div>
    );
  };
