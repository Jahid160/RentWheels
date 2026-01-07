import React, { useState } from "react";
import Header from "../Header/Banner";
import CarCard from "../CarCard/CarCard";
import RentWithUs from "../RentWithUs/RentWithUs";
import Testimonial from "../Testimonial/Testimonial";
import UseTime from "../Loading/Loading";
import { useQuery, useMutation } from "@tanstack/react-query";

import useAxios from "../../hooks/useAxios";
import ContactForm from "../ContactForm/ContactForm";

const Home = ({contactRef}) => {
  const axiosSecure = useAxios();
  const [searchResult, setSearchResult] = useState([]);

  const HOME_LIMIT = 8; // 🔥 show only 8 cards on homepage

  // =========================
  // 1️⃣ GET All Cars
  // =========================
  const { data: cars = [], isLoading } = useQuery({
    queryKey: ["all-cars"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-cars");
      return res.data;
    },
  });

  // =========================
  // 2️⃣ SEARCH Cars
  // =========================
  const searchMutation = useMutation({
    mutationFn: async (searchText) => {
      const res = await axiosSecure.get(`/search?search=${searchText}`);
      return res.data;
    },
    onSuccess: (data) => {
      setSearchResult(data);
    },
  });

  // =========================
  // 3️⃣ Handle Search
  // =========================
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value.trim();

    // ✅ Empty search → show limited home cards
    if (!searchText) {
      setSearchResult([]);
      return;
    }

    searchMutation.mutate(searchText);
  };

  // =========================
  // Loading
  // =========================
  if (isLoading) return <UseTime />;

  const rentUs = Array.isArray(cars) ? cars.slice(0, 4) : [];
console.log(cars);
  // =========================
  // 🔥 Display Logic
  // =========================
  const displayCars =
    searchResult.length === 0
      ? cars.slice(0, 8) // only 8 cards
      : searchResult; // all search results

  return (
    <>
      {/* Header */}
      <div className="opacity-95 max-w-[1400px] mb-5">
        <Header cars={cars} />
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="text-center mt-5 mb-5">
        <label className="input rounded-full text-gray-500">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input name="search" type="search" placeholder="Search" />
        </label>

        <button className="btn btn-primary ml-1 rounded-full">
          {searchMutation.isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Cars Grid */}
      <div className="grid space-y-3 max-w-[1500px] mx-auto gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      <RentWithUs rentUs={rentUs} />
      <Testimonial />
            <div ref={contactRef}>
        <ContactForm></ContactForm>
      </div>
    </>
  );
};

export default Home;
