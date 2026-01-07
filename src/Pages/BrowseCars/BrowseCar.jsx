import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CarCard from "../../Components/CarCard/CarCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseTime from "../../Components/Loading/Loading";

const BrowseCar = () => {
  const axiosSecure = useAxiosSecure();

  // =========================
  // 🔹 UI State
  // =========================
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const limit = 8;

  // =========================
  // 🔹 Fetch Cars
  // =========================
  const { data = {}, isLoading } = useQuery({
    queryKey: [
      "cars",
      search,
      category,
      sort,
      minPrice,
      maxPrice,
      page,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get("/browse-cars", {
        params: {
          search,
          category,
          sort,
          minPrice,
          maxPrice,
          page,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const { cars = [], totalPages = 1 } = data;

  if (isLoading) return <UseTime />;

  // =========================
  // 🔹 Handlers
  // =========================
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    setPage(1);
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 text-black">

      {/* ================= SEARCH ================= */}
      <form onSubmit={handleSearch} className="flex gap-2 my-6 justify-center">
        <input
          name="search"
          type="text"
          placeholder="Search car name..."
          className="input input-bordered w-64"
        />
        <button className="btn btn-primary">Search</button>
      </form>

      {/* ================= FILTERS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        {/* Category */}
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Luxury">Luxury</option>
        </select>

        {/* Sort */}
<select
  className="select select-bordered"
  value={sort}
  onChange={(e) => setSort(e.target.value)}
>
  <option value="">Sort By</option>
  <option value="priceAsc">Price: Low → High</option>
  <option value="priceDesc">Price: High → Low</option>
  <option value="latest">Newest</option>
</select>


        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          className="input input-bordered"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          className="input input-bordered"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* ================= CAR GRID ================= */}
      <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${
              page === num + 1 ? "btn-primary" : ""
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BrowseCar;
