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
];

interface CategoryChipsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryChips = ({ activeCategory, onCategoryChange }: CategoryChipsProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-3 sticky top-14 bg-background z-40">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`chip ${activeCategory === category ? "active" : ""}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
