import React from "react";
import { ArrowRight } from "lucide-react";


const WelcomeBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#F3F0FF] px-8 py-8 shadow-sm">

      {/* Decorative Circles */}
      <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-purple-100 opacity-40"></div>
      <div className="absolute bottom-0 right-40 h-24 w-24 rounded-full bg-purple-100 opacity-30"></div>

      <div className="relative flex flex-col-reverse items-center justify-between gap-8 lg:flex-row">

        {/* Left Content */}
        <div className="max-w-xl">

          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back,
            <span className="text-[#5B3CC4]"> Abbee</span>
          </h1>

          <p className="mt-3 text-gray-600 text-lg">
            Keep going! You are doing great.
            Continue learning and complete your courses.
          </p>

          <button className="mt-8 flex items-center gap-2 rounded-xl bg-[#5B3CC4] px-6 py-3 font-semibold text-white transition hover:bg-[#4C31AE]">
            Continue Learning
            <ArrowRight size={18} />
          </button>

        </div>

        {/* Right Image */}
        <div className="flex justify-center">

         <img
  src="https://placehold.co/400x260"
  alt="Banner"
  className="w-[380px] max-w-full rounded-xl"
/>

        </div>

      </div>

    </div>
  );
};

export default WelcomeBanner;