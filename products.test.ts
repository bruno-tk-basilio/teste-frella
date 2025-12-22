import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const adminUser: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user: adminUser,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const regularUser: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user: regularUser,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("products procedures", () => {
  it("should list products publicly", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);
    const products = await caller.products.list();

    expect(Array.isArray(products)).toBe(true);
  });

  it("should get featured products publicly", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);
    const products = await caller.products.featured({ limit: 3 });

    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeLessThanOrEqual(3);
  });

  it("should allow admin to create product", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.create({
      name: "Test Product",
      slug: "test-product",
      description: "Test description",
      price: "99.90",
      stock: 10,
      featured: 0,
    });

    expect(result.success).toBe(true);
  });

  it("should prevent non-admin from creating product", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.products.create({
        name: "Test Product",
        slug: "test-product",
        description: "Test description",
        price: "99.90",
        stock: 10,
        featured: 0,
      })
    ).rejects.toThrow();
  });

  it("should allow admin to delete product", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // First create a product
    await caller.products.create({
      name: "Product to Delete",
      slug: "product-to-delete",
      price: "50.00",
      stock: 5,
      featured: 0,
    });

    // Get the product
    const products = await caller.products.list({ search: "Product to Delete" });
    const productToDelete = products[0];

    if (productToDelete) {
      const result = await caller.products.delete({ id: productToDelete.id });
      expect(result.success).toBe(true);
    }
  });
});

describe("categories procedures", () => {
  it("should list categories publicly", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);
    const categories = await caller.categories.list();

    expect(Array.isArray(categories)).toBe(true);
  });
});
