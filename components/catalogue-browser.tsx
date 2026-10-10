"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { StoreProduct } from "@/lib/catalogue";

type Props = { products: StoreProduct[]; computerFilters?: boolean; emptyMessage?: string };

function normalize(value: string) {
  return value.toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/(\d)\s*gb\b/g, "$1 go").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function CatalogueBrowser({ products, computerFilters = false, emptyMessage = "Aucun produit ne correspond à ces filtres." }: Props) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("Toutes les marques");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [processor, setProcessor] = useState<string[]>([]);
  const [ram, setRam] = useState<string[]>([]);
  const [sort, setSort] = useState("price-asc");
  const brands = useMemo(() => [...new Set(products.map((product) => product.brand))].sort((a, b) => a.localeCompare(b, "fr")), [products]);
  const filtered = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    const matches = products.filter((product) => {
      const specs = product.specifications ?? [];
      const searchable = normalize([product.name, product.brand, product.shortDescription ?? "", ...specs.flatMap((spec) => [spec.name, spec.value])].join(" "));
      const price = product.price;
      const processorText = normalize(`${product.name} ${product.shortDescription ?? ""} ${specs.filter((spec) => /processeur|processor|cpu/i.test(spec.name)).map((spec) => spec.value).join(" ")}`);
      const memoryText = normalize(specs.filter((spec) => /^(ram|memoire vive|memoire)$/i.test(normalize(spec.name.trim()))).map((spec) => spec.value).join(" "));
      return terms.every((term) => searchable.includes(term)) &&
        (brand === "Toutes les marques" || product.brand === brand) &&
        (!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice)) &&
        (!processor.length || processor.some((value) => processorText.includes(value))) &&
        (!ram.length || ram.some((value) => new RegExp(`(?:^|\\D)${value}\\s*(?:go|gb)`, "i").test(memoryText)));
    });
    if (sort === "price-asc") return matches.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return matches.sort((a, b) => b.price - a.price);
    if (sort === "name") return matches.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return matches;
  }, [products, query, brand, minPrice, maxPrice, processor, ram, sort]);

  function toggle(value: string, selected: string[], update: (values: string[]) => void) {
    update(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  }

  function reset() {
    setQuery(""); setBrand("Toutes les marques"); setMinPrice(""); setMaxPrice(""); setProcessor([]); setRam([]); setSort("price-asc");
  }

  return (
    <div>
      <div className="grid gap-5 rounded-2xl border border-[#e5e7df] bg-white p-5 lg:grid-cols-[1fr_2fr] lg:p-6">
        <label className="text-xs font-semibold text-[#53615a]">Rechercher dans cette catégorie
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nom, marque, caractéristiques…" className="mt-2 h-11 w-full rounded-xl border border-[#e1e4dc] px-3 text-sm font-normal outline-none focus:border-[#289844]" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="text-xs font-semibold text-[#53615a]">Marque
            <select value={brand} onChange={(event) => setBrand(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#e1e4dc] bg-white px-3 text-sm font-normal"><option>Toutes les marques</option>{brands.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label className="text-xs font-semibold text-[#53615a]">Prix minimum (FCFA)
            <input type="number" min="0" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="Sans minimum" className="mt-2 h-11 w-full rounded-xl border border-[#e1e4dc] px-3 text-sm font-normal" />
          </label>
          <label className="text-xs font-semibold text-[#53615a]">Prix maximum (FCFA)
            <input type="number" min="0" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Sans maximum" className="mt-2 h-11 w-full rounded-xl border border-[#e1e4dc] px-3 text-sm font-normal" />
          </label>
          {computerFilters && <fieldset className="sm:col-span-2"><legend className="text-xs font-semibold text-[#53615a]">Processeur</legend><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{[["core i3", "Core i3"], ["core i5", "Core i5"], ["core i7", "Core i7"], ["ryzen", "AMD Ryzen"], ["core ultra", "Core Ultra"], ["apple m", "Apple M"]].map(([value, label]) => <label key={value} className="flex items-center gap-2 text-xs text-[#5d6861]"><input type="checkbox" checked={processor.includes(value)} onChange={() => toggle(value, processor, setProcessor)} className="accent-[#289844]" />{label}</label>)}</div></fieldset>}
          {computerFilters && <fieldset><legend className="text-xs font-semibold text-[#53615a]">Mémoire vive</legend><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{[4, 8, 16, 24, 32, 64].map((value) => <label key={value} className="flex items-center gap-2 text-xs text-[#5d6861]"><input type="checkbox" checked={ram.includes(String(value))} onChange={() => toggle(String(value), ram, setRam)} className="accent-[#289844]" />{value} Go</label>)}</div></fieldset>}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#68716a]">{filtered.length} produit{filtered.length === 1 ? "" : "s"} trouvé{filtered.length === 1 ? "" : "s"}</p>
        <div className="flex items-center gap-3"><button type="button" onClick={reset} className="text-xs font-medium text-[#34705e] underline underline-offset-4">Effacer les filtres</button><label className="sr-only" htmlFor="catalogue-sort">Trier les produits</label><select id="catalogue-sort" value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 rounded-xl border border-[#e1e4dc] bg-white px-3 text-xs"><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option><option value="name">Nom A à Z</option><option value="recent">Ordre actuel</option></select></div>
      </div>
      {filtered.length ? <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} {...product} />)}</div> : <p className="mt-5 rounded-2xl border border-[#e4e4dc] bg-white p-8 text-sm text-[#68716a]">{emptyMessage}</p>}
    </div>
  );
}
