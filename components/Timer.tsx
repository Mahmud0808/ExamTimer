import { getFormattedTime } from "@/lib/utility/methods";

const Timer = ({ time }: { time: number }) => {
  const timeLeft = getFormattedTime(time);

  return (
    <div className="grid w-full grid-cols-3 flex-row justify-center lg:justify-start mt-10 gap-3 md:gap-5 lg:gap-8 px-4 lg:px-12">
      <span className="flex flex-col flex-1 flex-grow justify-center items-center bg-black text-yellow text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] min-w-28 sm:min-w-40 md:min-w-52 lg:min-w-64 xl:min-w-80 px-6 pt-3 pb-5 md:pt-4 md:pb-6 lg:pt-5 lg:pb-7 shadow-lg rounded-3xl md:rounded-[2.5rem] xl:rounded-[3.5rem] select-none">
        {timeLeft.hours}
        <small className="text-xs md:text-lg xl:text-xl uppercase font-medium text-white select-none">
          Hour
          {timeLeft.hours !== "00" && timeLeft.hours !== "01" ? "s" : ""}
        </small>
      </span>
      <span className="flex flex-col flex-1 flex-grow justify-center items-center bg-black text-yellow text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] min-w-28 sm:min-w-40 md:min-w-52 lg:min-w-64 xl:min-w-80 px-6 pt-3 pb-5 md:pt-4 md:pb-6 lg:pt-5 lg:pb-7 shadow-lg rounded-3xl md:rounded-[2.5rem] xl:rounded-[3.5rem] select-none">
        {timeLeft.minutes}
        <small className="text-xs md:text-lg xl:text-xl uppercase font-medium text-white select-none">
          Minute
          {timeLeft.minutes !== "00" && timeLeft.minutes !== "01" ? "s" : ""}
        </small>
      </span>
      <span className="flex flex-col flex-1 flex-grow justify-center items-center bg-black text-yellow text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] min-w-28 sm:min-w-40 md:min-w-52 lg:min-w-64 xl:min-w-80 px-6 pt-3 pb-5 md:pt-4 md:pb-6 lg:pt-5 lg:pb-7 shadow-lg rounded-3xl md:rounded-[2.5rem] xl:rounded-[3.5rem] select-none">
        {timeLeft.seconds}
        <small className="text-xs md:text-lg xl:text-xl uppercase font-medium text-white select-none">
          Second
          {timeLeft.seconds !== "00" && timeLeft.seconds !== "01" ? "s" : ""}
        </small>
      </span>
    </div>
  );
};

export default Timer;
