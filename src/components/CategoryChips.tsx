import { useState } from "react";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Live",
  "React",
  "Programming",
  "News",
  "Cooking",
  "Sports",
  "Fashion",
  "Comedy",
  "Podcasts",
  "Recently uploaded",
  "Watched",
  "New to you",
];

const CategoryChips = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-3 sticky top-14 bg-background z-40">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`chip ${activeCategory === category ? "active" : ""}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
