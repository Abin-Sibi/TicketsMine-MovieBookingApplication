import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import  { ApexChart } from '../Chart/ApexChart'

function DashBoard() {
  const [movies, setmovies] = useState([]);
  const [TopBooked, setTopBooked] = useState([]);
  const [Users, setUsers] = useState([])
  const [Theater, setTheater] = useState([])
  useEffect(() => {
    async function getReservation() {
      await axios
        .get("/api/admin/reservationDetails")
        .then(({ data }) => {
          setmovies(data);
        });
      await axios
        .get("/api/admin/topReserved")
        .then(({ data }) => {
          setTopBooked(data);
        });
      await axios
        .get("/api/admin/userList")
        .then(({ data }) => {
          setUsers(data);
        });
        await axios.get("/api/admin/theaterList").then(({data}) => {
        setTheater(data);
  });
    }
    getReservation();
  }, []);
  const reservationsPerDay = movies?.reduce((acc, cur) => {
    const showDate = cur.showDate;
    if (!acc[showDate]) {
      acc[showDate] = 1;
    } else {
      acc[showDate]++;
    }
    return acc;
  }, {});
  
  
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
const reservationsData = Object.keys(reservationsPerDay).map((showDate) => {
  const date = new Date(showDate);
  const formattedDate = date.toLocaleDateString('en-US', options);
  return { x: formattedDate, y: reservationsPerDay[showDate] };
});

  const xData = reservationsData?.map((reservation) => reservation.x);
const yData = reservationsData?.map((reservation) => reservation.y);

  

  const totalRevenue = movies.reduce(
    (acc, ticket) => acc + ticket.ticketPrice,
    0
  );
  console.log(TopBooked);

  return (
    <div className="px-4 pt-6">
      <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        {/* <!-- Main widget --> */}
        <div className="p-4  border rounded-lg shadow-sm 2xl:col-span-2 border-gray-700 sm:p-6 bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold leading-none  sm:text-2xl text-white">
                ${totalRevenue}
              </span>
              <h3 className="text-base font-light text-gray-400">
                Total Sales
              </h3>
            </div>
            <div className="flex items-center justify-end flex-1 text-base font-medium  text-green-400">
              12.5%
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div id="main-chart">
            <ApexChart xData={xData} yData={yData}/>
          </div>
         
        </div>
        {/* <!--Tabs widget --> */}
        <div className="p-4  border  rounded-lg shadow-sm border-gray-700 sm:p-6 bg-gray-800">
          <h3 className="flex items-center mb-4 text-lg font-semibold  text-white">
            Statistics this month
            <button
              data-popover-target="popover-description"
              data-popover-placement="bottom-end"
              type="button"
            >
              <svg
                className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Show information</span>
            </button>
          </h3>
          <div
            data-popover
            id="popover-description"
            role="tooltip"
            class="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400"
          >
            <div className="p-3 space-y-2">
              <h3 className="font-semibold  text-white">Statistics</h3>
              <p>
                Statistics is a branch of applied mathematics that involves the
                collection, description, analysis, and inference of conclusions
                from quantitative data.
              </p>
              <a
                href="#"
                className="flex items-center font-medium text-primary-600 text-primary-500 hover:text-primary-600 hover:text-primary-700"
              >
                Read more{" "}
                <svg
                  className="w-4 h-4 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <div data-popper-arrow></div>
          </div>
          <div className="sm:hidden">
            <label for="tabs" class="sr-only">
              Select tab
            </label>
            <select
              id="tabs"
              className=" border-0 border-b  text-sm rounded-t-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
            >
              <option>Statistics</option>
              <option>Services</option>
              <option>FAQ</option>
            </select>
          </div>
          <ul
            className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex divide-gray-600 text-gray-400"
            id="fullWidthTab"
            data-tabs-toggle="#fullWidthTabContent"
            role="tablist"
          >
            <li className="w-full">
              <button
                // id="faq-tab"
                data-tabs-target="#faq"
                type="button"
                role="tab"
                aria-controls="faq"
                aria-selected="true"
                class="inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none bg-gray-700 hover:bg-gray-600"
              >
                Top products
              </button>
            </li>
            
          </ul>

          <div
            id="fullWidthTabContent"
            className="border-t  border-gray-600"
          >
            <div
              className="pt-4"
              id="faq"
              role="tabpanel"
              aria-labelledby="faq-tab"
            >
              <ul role="list" class="divide-y  divide-gray-700">
                {TopBooked.map((movie)=>(

                  <li className="py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center min-w-0">
                        <img
                          className="flex-shrink-0 w-10 h-10"
                          src={movie?.Image}
                          alt="imac image"
                        />
                        <div className="ml-3">
                          <p className="font-medium  truncate text-white">
                            {movie?.title}
                          </p>
                          <div className="flex items-center justify-end flex-1 text-sm text-green-500 text-green-400">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                              ></path>
                            </svg>
                            2.5%
                            <span className="ml-2 text-gray-500">
                              vs last month
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold  text-white">
                        {movie?.count}
                      </div>
                    </div>
                  </li>
                ))}
               
              </ul>
            </div>
          </div>

          
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="items-center justify-between p-4  border  rounded-lg shadow-sm sm:flex border-gray-700 sm:p-6 bg-gray-800">
          <div className="w-full">
            <h3 className="text-base font-normal  text-gray-400">Theater</h3>
            <span className="text-2xl font-bold leading-none  sm:text-3xl text-white">
              {Theater.length}
            </span>
            <p className="flex items-center text-base font-normal  text-gray-400">
              <span className="flex items-center mr-1.5 text-sm  text-green-400">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  ></path>
                </svg>
                12.5%
              </span>
              Since last month
            </p>
          </div>
          {/* <div class="w-full" id="new-products-chart"></div> */}
        </div>
        <div className="items-center justify-between p-4  border  rounded-lg shadow-sm sm:flex border-gray-700 sm:p-6 bg-gray-800">
          <div className="w-full">
            <h3 className="text-base font-normal  text-gray-400">Users</h3>
            <span className="text-2xl font-bold leading-none  sm:text-3xl text-white">
            {Users.length}
            </span>
            <p className="flex items-center text-base font-normal  text-gray-400">
              <span className="flex items-center mr-1.5 text-sm  text-green-400">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  ></path>
                </svg>
                3,4%
              </span>
              Since last month
            </p>
          </div>
          {/* <div class="w-full" id="week-signups-chart"></div> */}
        </div>
        <div className="items-center justify-between p-4  border  rounded-lg shadow-sm sm:flex border-gray-700 sm:p-6 bg-gray-800">
          <div className="w-full">
            <h3 className="text-base font-normal  text-gray-400">Users</h3>
            <span className="text-2xl font-bold leading-none  sm:text-3xl text-white">
              2,340
            </span>
            <p className="flex items-center text-base font-normal  text-gray-400">
              <span className="flex items-center mr-1.5 text-sm  text-green-400">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  ></path>
                </svg>
                3,4%
              </span>
              Since last month
            </p>
          </div>
          <div className="w-full" id="week-signups-chart"></div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
