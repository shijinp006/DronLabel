import { useRef, useState, useEffect} from "react";
import type { FC } from "react";

// Product interface
interface Product {
  img: string;
  name: string;
  category: string;
  price: string;
}

// ProductCard props
interface ProductCardProps extends Product {}

// ProductRow props
interface ProductRowProps {
  title: string;
  items: Product[];
}

// ProductRow state and refs
// interface ProductRowState {
//   page: number;
//   isPaused: boolean;
//   perPage: number;
//   totalPages: number;
// }

const BEST_SELLERS: Product[] = [
  { img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85", name: "Starry Night", category: "Printed Shirt", price: "₹1,499" },
  { img: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600&q=85", name: "Bonsai Embroidered", category: "Men Shirt", price: "₹1,899" },
  { img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85", name: "Boxing Shirt", category: "Printed Shirt", price: "₹1,299" },
  { img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=85", name: "Varsity Jacket", category: "Outerwear", price: "₹3,999" },
  { img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=85", name: "Street Classic", category: "Men Shirt", price: "₹1,599" },
  { img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&q=85", name: "OG Graphic Tee", category: "Printed T-shirt", price: "₹699" },
];

const NEW_ARRIVALS: Product[] = [
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85", name: "Palm Tree Embroidered Shirt", category: "Men Shirt", price: "₹1,699" },
  { img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85", name: "Brown Linen Pant", category: "Men Pants", price: "₹1,599" },
  { img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=85", name: "Beige Linen Pant", category: "Men Pants", price: "₹1,599" },
  { img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85", name: "Chill Maadi", category: "Printed T-shirt", price: "₹599" },
  { img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=85", name: "Heritage Stripe Shirt", category: "Men Shirt", price: "₹1,399" },
  { img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=85", name: "Kerala Originals Tee", category: "Printed T-shirt", price: "₹799" },
];

const ProductCard: FC<ProductCardProps> = ({ img, name, category, price }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      className="cursor-pointer w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image: Taller on mobile, scales based on display count */}
      <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#e8e2d8] aspect-3/4 sm:aspect-square lg:aspect-[4/5]">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        <div
          className="absolute inset-0 rounded-lg sm:rounded-xl flex items-end justify-center pb-4 sm:pb-5 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.42)", opacity: hovered ? 1 : 0 }}
        >
          <span
            className="text-white text-[10px] sm:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase px-4 sm:px-5 py-1.5 sm:py-2 rounded-sm backdrop-blur-sm whitespace-nowrap"
            style={{ background: "rgba(0,0,0,0.6)", border: "1.5px solid rgba(255,255,255,0.38)" }}
          >
            VIEW PRODUCT
          </span>
        </div>
      </div>
      <div className="pt-2.5 sm:pt-3 px-0.5">
        <p
          className="font-semibold text-[#1a1a1a] text-xs sm:text-sm leading-tight truncate"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {name}
        </p>
        <p
          className="text-[#999] text-xs mt-0.5 mb-1.5 truncate"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {category}
        </p>
        <p
          className="font-semibold text-[#1a1a1a] text-xs sm:text-sm"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {price}
        </p>
      </div>
    </div>
  );
};

const ProductRow: FC<ProductRowProps> = ({ title, items }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [page, setPage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // How many cards per page based on screen
  const getPerPage = (): number => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;  // Mobile: 1 image
    if (window.innerWidth < 1024) return 2; // Tablet: 2 images
    return 3; // Desktop: 3 images
  };

  const perPage = getPerPage();
  const totalPages = Math.ceil(items.length / perPage);

  // Smooth animate scrollLeft
  const animateTo = (targetLeft: number, duration: number = 650): void => {
    const el = trackRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startLeft = el.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();

    const ease = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number): void => {
      const progress = Math.min((now - startTime) / duration, 1);
      el.scrollLeft = startLeft + distance * ease(progress);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  // Scroll track to match current page
  const scrollToPage = (p: number): void => {
    const el = trackRef.current;
    if (!el) return;
    const pageWidth = el.clientWidth;
    animateTo(p * pageWidth);
  };

  const goTo = (p: number): void => {
    const next = (p + totalPages) % totalPages;
    setPage(next);
    scrollToPage(next);
  };

  // Auto-advance every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) return;
      setPage((prev) => {
        const next = (prev + 1) % totalPages;
        scrollToPage(next);
        return next;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, totalPages]);

  return (
    <section className="w-full mb-12 sm:mb-14 last:mb-0">
      {/* Title */}
      <div className="text-center mb-5 sm:mb-7 px-4">
        <h2
          className="text-[#1a1a1a] font-medium"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 42px)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Track — clips to show exactly one "page" at a time */}
        <div className="overflow-hidden mx-3 xs:mx-4 sm:mx-6 md:mx-8 lg:mx-10">
          <div
            ref={trackRef}
            className="overflow-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Inner flex: all cards laid out side by side */}
            <div className="flex gap-3 sm:gap-4">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex-none w-[calc(100%-12px)] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                  style={{ minWidth: 0 }}
                >
                  <ProductCard {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === page ? "24px" : "8px",
              height: "8px",
              background: i === page ? "#1a1a1a" : "rgba(0,0,0,0.18)",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export const BestSellers: FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Barlow:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="flex items-center justify-center w-full bg-[#F5F1E8] py-8 sm:py-12">
        <div className="flex flex-col w-full px-4 sm:px-6 lg:px-10 mx-auto max-w-7xl overflow-hidden">
          <ProductRow title="Best Sellers" items={BEST_SELLERS} />
          <ProductRow title="New Arrivals" items={NEW_ARRIVALS} />
        </div>
      </div>
    </>
  );
};