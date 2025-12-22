import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Minus, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProductDetail() {
  const [, params] = useRoute("/produto/:slug");
  const slug = params?.slug || "";
  const { addItem, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = trpc.products.getBySlug.useQuery({ slug });

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
      setQuantity(1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartItemCount={totalItems} />
        <main className="flex-1 container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-24 bg-muted rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartItemCount={totalItems} />
        <main className="flex-1 container py-16 text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Produto não encontrado</h2>
          <p className="text-muted-foreground mb-6">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Button asChild>
            <Link href="/produtos">Ver Produtos</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const price = parseFloat(product.price);
  const specifications = product.specifications ? JSON.parse(product.specifications) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={totalItems} />

      <main className="flex-1">
        <div className="container py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/produtos">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para produtos
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-32 h-32 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    R$ {price.toFixed(2)}
                  </span>
                  {product.stock > 0 ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Em estoque ({product.stock} unidades)
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Esgotado</Badge>
                  )}
                </div>

                {product.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              <Separator />

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantidade</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </div>

              {/* Specifications */}
              {specifications && Object.keys(specifications).length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Especificações Técnicas</h3>
                    <dl className="space-y-2">
                      {Object.entries(specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <dt className="text-muted-foreground">{key}</dt>
                          <dd className="font-medium">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
