"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ShoppingBasket, Check } from "lucide-react";

import type { Product } from "@/types";

import {
  getProductImage,
  PRODUCT_IMAGE_ASPECT,
} from "@/lib/productImages";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export function ProductCard3D({
  product,
}: {
  product: Product;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { addItem, lastAdded } = useCart();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = {
    stiffness: 180,
    damping: 24,
    mass: 0.7,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [5, -5]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-6, 6]),
    springConfig
  );

  const imageX = useSpring(
    useTransform(mouseX, [0, 1], [-14, 14]),
    springConfig
  );

  const imageRotate = useSpring(
    useTransform(mouseX, [0, 1], [-2.5, 2.5]),
    springConfig
  );

  const spotX = useTransform(
    mouseX,
    (value) => `${value * 100}%`
  );

  const spotY = useTransform(
    mouseY,
    (value) => `${value * 100}%`
  );

  const spotlightBg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(
        260px circle at ${x} ${y},
        rgba(255,246,227,0.52),
        transparent 68%
      )`
  );

  function handleMouseMove(
    e: MouseEvent<HTMLDivElement>
  ) {
    const el = ref.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    mouseX.set(
      Math.max(
        0,
        Math.min(
          1,
          (e.clientX - rect.left) / rect.width
        )
      )
    );

    mouseY.set(
      Math.max(
        0,
        Math.min(
          1,
          (e.clientY - rect.top) / rect.height
        )
      )
    );
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const justAdded = lastAdded === product.id;

  /*
   * IMPORTANT:
   * If product image is "#", don't pass it to Next/Image.
   */
  const imageSrc = getProductImage(product.icon);

  const hasImage =
    imageSrc !== "#" && imageSrc.trim() !== "";

  const aspect =
    PRODUCT_IMAGE_ASPECT[product.icon] ?? 1;

  return (
    <div className="perspective-container">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -5,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 22,
        }}
        className="relative"
      >
        {/* =================================================
            MAIN CARD
            ================================================= */}

        <Link
          href={`/products/${product.slug}`}
          className="
            product-card-surface
            group
            relative
            block
            overflow-visible
            rounded-[30px]
            border
            border-gold/20
            bg-flour
          "
        >
          {/* Inner border */}

          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-[5px]
              rounded-[26px]
              border
              border-white/30
            "
          />

          {/* Spotlight */}

          <motion.div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              overflow-hidden
              rounded-[30px]
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
            style={{
              background: spotlightBg,
            }}
          />

          {/* =================================================
              PRODUCT BADGE
              ================================================= */}

          {product.badge && (
            <span
              className="
                absolute
                left-5
                top-5
                z-30
                rounded-full
                border
                border-gold/20
                bg-espresso
                px-3.5
                py-1.5
                text-[9px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-flour
                shadow-[0_8px_20px_-8px_rgba(36,24,17,0.55)]
              "
            >
              {product.badge}
            </span>
          )}

          {/* =================================================
              PRODUCT IMAGE AREA
              ================================================= */}

          <div
            className="
              relative
              h-[230px]
              overflow-visible
              sm:h-[245px]
            "
          >
            {/* Grounding shadow */}

            <motion.div
              aria-hidden
              className="
                absolute
                bottom-7
                left-1/2
                h-5
                w-32
                -translate-x-1/2
                rounded-full
                bg-espresso/20
                blur-xl
              "
              whileHover={{
                scaleX: 0.8,
                opacity: 0.55,
              }}
            />

            {/* =================================================
                FLOATING PRODUCT IMAGE
                ================================================= */}

            {hasImage ? (
              <motion.div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-[-34px]
                  z-20
                  -translate-x-1/2
                "
                style={{
                  x: imageX,
                  rotate: imageRotate,
                  translateZ: 70,
                }}
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="
                    relative
                    w-[240px]
                    sm:w-[265px]
                    drop-shadow-[0_22px_18px_rgba(36,24,17,0.35)]
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-[1.045]
                  "
                  style={{
                    aspectRatio: aspect,
                  }}
                >
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 240px, 265px"
                    className="object-contain"
                    priority={false}
                  />
                </div>
              </motion.div>
            ) : (
              /* =================================================
                 NO IMAGE PLACEHOLDER
                 ================================================= */

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-20
                  flex
                  h-[150px]
                  w-[150px]
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gold/15
                  bg-white/20
                  text-center
                  backdrop-blur-sm
                "
              >
                <span
                  className="
                    px-5
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-espresso/40
                  "
                >
                  Image
                  <br />
                  Coming Soon
                </span>
              </div>
            )}
          </div>

          {/* =================================================
              PRODUCT CONTENT
              ================================================= */}

          <div
            className="
              relative
              z-20
              px-6
              pb-7
              pt-1
              text-center
              sm:px-7
            "
          >
            {/* Product Name */}

            <h3
              className="
                font-display
                text-[20px]
                font-medium
                leading-[1.15]
                tracking-[-0.015em]
                text-espresso
                transition-colors
                duration-300
                group-hover:text-jam
              "
            >
              {product.name}
            </h3>

            {/* Product Tagline */}

            <p
              className="
                mx-auto
                mt-3
                max-w-[245px]
                text-[12.5px]
                font-normal
                leading-[1.7]
                tracking-[0.005em]
                text-ink-soft
              "
            >
              {product.tagline}
            </p>

            {/* Divider */}

            <div
              className="
                mx-auto
                mt-5
                flex
                items-center
                justify-center
                gap-2
              "
              aria-hidden="true"
            >
              <span className="h-px w-5 bg-gold/30" />

              <span className="h-1 w-1 rounded-full bg-gold/70" />

              <span className="h-px w-5 bg-gold/30" />
            </div>

            {/* Price */}

            <div className="mt-4">
              <span
                className="
                  font-display
                  text-[16px]
                  font-medium
                  tracking-[0.025em]
                  text-jam
                "
              >
                {formatPrice(product.price)}
              </span>
            </div>

            {/* =================================================
                ADD TO CART
                ================================================= */}

            <motion.button
              type="button"
              whileHover={{
                scale: 1.1,
                y: -1,
              }}
              whileTap={{
                scale: 0.92,
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product.id, 1);
              }}
              aria-label={`Add ${product.name} to cart`}
              className="
                mt-5
                inline-flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-gold/20
                bg-espresso
                text-flour
                shadow-[0_10px_25px_-8px_rgba(36,24,17,0.7)]
                transition-all
                duration-300
                hover:border-gold/40
                hover:bg-jam
                hover:shadow-[0_14px_30px_-8px_rgba(82,42,30,0.45)]
              "
            >
              {justAdded ? (
                <Check
                  size={17}
                  strokeWidth={2}
                />
              ) : (
                <ShoppingBasket
                  size={17}
                  strokeWidth={1.7}
                />
              )}
            </motion.button>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}