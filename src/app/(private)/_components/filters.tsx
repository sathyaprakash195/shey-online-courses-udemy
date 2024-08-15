"use client";
import { Select, Input, Button } from "antd";
import React from "react";
import { categories } from "../admin/courses/_components/course-form/basic-tab";
import { useRouter } from "next/navigation";

function Filters() {
  const [searchValue, setSearchValue] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const router = useRouter();

  const onFilter = () => {
    router.push(
      `/?category=${category}&search=${searchValue}&sortBy=${sortBy}`
    );
  };

  const onClearFilters = () => {
    setCategory("");
    setSearchValue("");
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
      <div className="flex flex-col gap-1">
        <label htmlFor="Category" className="text-sm text-gray-500">
          Category
        </label>
        <Select
          value={category}
          onChange={(value) => setCategory(value)}
          placeholder="Select category"
        >
          {categories.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="search" className="text-sm text-gray-500">
          Sort by
        </label>
        <Select
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          placeholder="Sort by"
        >
          <Select.Option value="newest">Newest</Select.Option>
          <Select.Option value="oldest">Oldest</Select.Option>
          <Select.Option value="price-low-to-high">
            Price: Low to High
          </Select.Option>
          <Select.Option value="price-high-to-low">
            Price: High to Low
          </Select.Option>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="search" className="text-sm text-gray-500">
          Search
        </label>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search course"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Button onClick={onClearFilters}>CLEAR FILTERS</Button>
        <Button type="primary" onClick={onFilter}>
          APPLY FILTERS
        </Button>
      </div>
    </div>
  );
}

export default Filters;
