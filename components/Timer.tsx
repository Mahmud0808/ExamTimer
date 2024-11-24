import { getFormattedTime } from "@/libs/utility/methods";

const Timer = ({ time }: { time: number }) => {
  const timeLeft = getFormattedTime(time);

  return (
    <div className="grid w-full grid-cols-3 flex-row justify-center lg:justify-start mt-10 gap-3 lg:gap-8">
      <span className="flex flex-col flex-1 flex-grow justify-center items-center bg-black text-yellow text-5xl lg:text-9xl min-w-28 lg:min-w-64 px-6 pt-3 pb-5 shadow-lg rounded-3xl">
        {timeLeft.hours}
        <small className="text-xs lg:text-lg uppercase font-medium text-white">
          Hours
        </small>
      </span>
      <span className="flex flex-col flex-1 flex-grow justify-center items-center bg-black text-yellow text-5xl lg:text-9xl min-w-28 lg:min-w-64 px-6 pt-3 pb-5 shadow-lg rounded-3xl">
        {timeLeft.minutes}
        <small className="text-xs lg:text-lg uppercase font-medium text-white">
          Minutes
        </small>
      </span>
      <span className="flex flex-col flex-1 flex-grow justify-center items-center bg-black text-yellow text-5xl lg:text-9xl min-w-28 lg:min-w-64 px-6 pt-3 pb-5 shadow-lg rounded-3xl">
        {timeLeft.seconds}
        <small className="text-xs lg:text-lg uppercase font-medium text-white">
          Seconds
        </small>
      </span>
    </div>
  );
};

export default Timer;
