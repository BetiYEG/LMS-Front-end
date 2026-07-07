import React from "react";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">

      <div className="
        w-full
        max-w-screen-2xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        xl:px-10
        py-6
      ">

        <WelcomeBanner />

        {/* Continue Learning */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-bold">
              Continue Learning
            </h2>

            <button className="text-[#5B3CC4] font-semibold hover:underline">
              View All
            </button>
          </div>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >
            <div className="h-72 rounded-3xl bg-white shadow"></div>
            <div className="h-72 rounded-3xl bg-white shadow"></div>
            <div className="h-72 rounded-3xl bg-white shadow"></div>
          </div>
        </section>

        {/* Recommended */}
        <section className="mt-10">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl md:text-2xl font-bold">
              Recommended
            </h2>

            <button className="text-[#5B3CC4] font-semibold hover:underline">
              View All
            </button>

          </div>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
          >
            <div className="h-60 rounded-3xl bg-white shadow"></div>
            <div className="h-60 rounded-3xl bg-white shadow"></div>
            <div className="h-60 rounded-3xl bg-white shadow"></div>
          </div>

        </section>

      </div>

    </div>
  );
};

export default Dashboard;