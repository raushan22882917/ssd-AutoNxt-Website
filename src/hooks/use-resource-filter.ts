import { useState, useEffect } from "react";

export interface UseResourceFilterProps<T> {
  items: T[];
  getCategory: (item: T) => string;
  searchFields: (item: T) => (string | string[] | undefined | null)[];
}

export function useResourceFilter<T>({
  items,
  getCategory,
  searchFields,
}: UseResourceFilterProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  const categories = ["all", ...Array.from(new Set(items.map(getCategory)))];

  const categoryCounts = categories.reduce((acc: Record<string, number>, cat) => {
    acc[cat] = cat === "all"
      ? items.length
      : items.filter((item) => getCategory(item).toLowerCase() === cat.toLowerCase()).length;
    return acc;
  }, {});

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      getCategory(item).toLowerCase() === selectedCategory.toLowerCase();

    let matchesSearch = true;
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      const fields = searchFields(item);
      matchesSearch = fields.some((field) => {
        if (!field) return false;
        if (Array.isArray(field)) {
          return field.some((subField) => subField?.toLowerCase().includes(term));
        }
        return field.toLowerCase().includes(term);
      });
    }

    return matchesCategory && matchesSearch;
  });

  const isFilteringOrSearching = searchTerm !== "" || selectedCategory !== "all";

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    isTransitioning,
    categories,
    categoryCounts,
    filteredItems,
    isFilteringOrSearching,
  };
}
