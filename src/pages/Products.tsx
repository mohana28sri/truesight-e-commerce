import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product, allSubcategories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchApi } from "@/lib/api";

const Products = () => {
  const [searchParams] = useSearchParams();
  const subcategoryFilter = searchParams.get("subcategory") || "";
  const searchQuery = searchParams.get("search") || "";
  const [sortBy, setSortBy] = useState("review_count");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryFilter);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  // Sync URL param changes
  useEffect(() => {
    setSelectedSubcategory(subcategoryFilter);
  }, [subcategoryFilter]);

  // Fetch from API when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedSubcategory) params.append("subcategory", selectedSubcategory);
    if (searchQuery) params.append("search", searchQuery);
    if (sortBy) {
      if (sortBy === 'price-low') params.append("sort", "price_asc");
      else if (sortBy === 'price-high') params.append("sort", "price_desc");
      else if (sortBy === 'rating') params.append("sort", "rating");
    }
    params.append("limit", "100"); // Load generous amount since frontend doesn't have pagination UI yet

    fetchApi(`/products?${params.toString()}`)
      .then(data => {
        if (data && data.products) {
          setFiltered(data.products);
          setTotal(data.total);
        }
      })
      .catch(console.error);
  }, [selectedSubcategory, searchQuery, sortBy]);

  const activeSubcategory = allSubcategories.find((s) => s.id === selectedSubcategory);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            {activeSubcategory ? activeSubcategory.name : searchQuery ? `Results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-1">{filtered.length} products found</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="sm:hidden">
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
          <div className={`flex flex-wrap gap-2 ${showFilters ? "" : "hidden sm:flex"}`}>
            <Button
              variant={selectedSubcategory === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubcategory("")}
            >
              All
            </Button>
            {allSubcategories.map((sub) => (
              <Button
                key={sub.id}
                variant={selectedSubcategory === sub.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubcategory(sub.id)}
              >
                {sub.icon} {sub.name}
              </Button>
            ))}
          </div>
          <div className="sm:ml-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSelectedSubcategory("")}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
