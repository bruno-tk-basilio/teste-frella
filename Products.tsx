import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Products() {
  const { addItem, totalItems } = useCart();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: products, isLoading } = trpc.products.list.useQuery({
    search: search || undefined,
    categoryId,
    sortBy,
    sortOrder,
  });

  const { data: categories } = trpc.categories.list.useQuery();

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={totalItems} />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 border-b">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Nossos Produtos</h1>
            <p className="text-muted-foreground">
              Explore nossa coleção completa de acessórios de computador
            </p>
          </div>
        </div>

        <div className="container py-8">
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros e Ordenação</span>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={categoryId?.toString() || "all"}
                onValueChange={(value) => setCategoryId(value === "all" ? undefined : Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={`${sortBy}-${sortOrder}`}
                onValueChange={(value) => {
                  const [newSortBy, newSortOrder] = value.split('-') as [typeof sortBy, typeof sortOrder];
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Mais recentes</SelectItem>
                  <SelectItem value="createdAt-asc">Mais antigos</SelectItem>
                  <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Menor preço</SelectItem>
                  <SelectItem value="price-desc">Maior preço</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground mb-6">
                Tente ajustar os filtros ou fazer uma nova busca
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setCategoryId(undefined);
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
