import type { IconKey } from "@/types";

export const PRODUCT_IMAGES: Record<
  IconKey,
  string
> = {
  pretzel: "/products/brezel.png",
  croissant: "/products/croissant.png",
  berliner: "/products/berliner.png",

  // roll.png is currently being used for the baguette/loaf visual.
  loaf: "/products/roll.png",
  baguette: "/products/roll.png",

  cookie: "/products/cookie.png",
  cinnamonroll: "/products/rustic.png",
  cupcake: "/products/cupcake.png",
  tart: "/products/tart.png",
  cake: "",
  danish: "",
  financier: "",
  choux: "",
  bun: "",
  tiramisu: ""
};

export const PRODUCT_IMAGE_ASPECT: Record<
  IconKey,
  number
> = {
  pretzel: 683 / 774,
  croissant: 652 / 793,
  berliner: 639 / 789,
  loaf: 518 / 882,
  baguette: 518 / 882,
  cookie: 648 / 887,
  cinnamonroll: 597 / 884,
  cupcake: 494 / 911,
  tart: 541 / 922,
  cake: 0,
  danish: 0,
  financier: 0,
  choux: 0,
  bun: 0,
  tiramisu: 0
};

export function getProductImage(
  icon: IconKey
) {
  return (
    PRODUCT_IMAGES[icon] ??
    "/products/brezel.png"
  );
}