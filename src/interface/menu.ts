import { ValidationMessage, BaseState } from './common';

/**
 * Enum representing menu categories.
 * Each category corresponds to a specific type of menu item.
 */
export const enum CategoryEnum {
  Appetizers = 'appetizers',
  MainCourses = 'main_courses',
  Desserts = 'desserts',
  Beverages = 'beverages',
  Sides = 'sides',
}

/**
 * Type representing a category derived from the CategoryEnum.
 * This ensures that only valid categories are used.
 */
export type Category = `${CategoryEnum}`;

/**
 * Type representing a price with validation.
 * The price is branded to ensure type safety.
 */
export type Price = number & { __brand: 'Price' };

/**
 * Creates a validated price.
 * @param value - The price value.
 * @returns A validated Price object.
 * @throws Will throw an error if the price is negative.
 */
export const createPrice = (value: number): Price => {
  if (value < 0) throw new Error('Price cannot be negative');
  return value as Price;
};

/**
 * Interface representing a menu item.
 * A menu item contains details such as name, price, category, and more.
 */
export interface MenuItem {
  readonly id: string;
  name: string;
  description: string;
  price: Price;
  category: Category;
  ingredients: Readonly<string> | ReadonlyArray<string>;
  image?: string;
  available: boolean;
  nutritionalInfo?: NutritionalInfo;
  allergens: ReadonlyArray<Allergen>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface representing nutritional information.
 * This includes details such as calories, protein, and fat content.
 */
export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
}

/**
 * Enum representing allergens.
 * Each allergen corresponds to a potential dietary restriction.
 */
export const enum Allergen {
  Gluten = 'gluten',
  Dairy = 'dairy',
  Nuts = 'nuts',
  Eggs = 'eggs',
  Soy = 'soy',
  Shellfish = 'shellfish',
}

/**
 * Interface representing the menu state.
 * This includes the list of menu items, categories, and applied filters.
 */
export interface MenuState extends BaseState {
  readonly items: ReadonlyArray<MenuItem>;
  readonly categories: ReadonlyArray<Category>;
  readonly selectedCategory: Category | null;
  readonly filters: MenuFilters;
}

/**
 * Interface representing menu filters.
 * Filters can be applied based on category, price range, allergens, and availability.
 */
export interface MenuFilters {
  readonly category?: Category;
  readonly priceRange?: PriceRange;
  readonly allergenFree?: Allergen[];
  readonly available?: boolean;
}

/**
 * Interface representing a price range.
 * This includes a minimum and maximum price.
 */
export interface PriceRange {
  min: number;
  max: number;
}

/**
 * Type representing menu validation messages.
 * Validation messages are associated with specific fields of a menu item.
 */
export type MenuValidationMessage = ValidationMessage<
  'name' | 'price' | 'category' | 'description'
>;

/**
 * Type representing the validation state of a menu item.
 * Each field of the menu item has a validation status and message.
 */
export type MenuItemValidation = {
  [K in keyof Required<MenuItem>]: {
    isValid: boolean;
    message: MenuValidationMessage | '';
  };
};

/**
 * Interface representing a mutable menu item.
 * This is used for editing menu items.
 */
export interface MutableMenuItem {
  id: string;
  name: string;
  description: string;
  price: Price;
  category: Category;
  ingredients: string | string[];
  image?: string;
  available: boolean;
  nutritionalInfo?: NutritionalInfo;
  allergens: Allergen[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface representing mutable menu filters.
 * These filters can be modified to update the menu state.
 */
export interface MutableMenuFilters {
  category?: Category;
  priceRange?: PriceRange;
  allergenFree?: Allergen[];
  available?: boolean;
}

/**
 * Interface representing the mutable menu state.
 * This includes mutable versions of menu items, categories, and filters.
 */
export interface MutableMenuState extends BaseState {
  items: MutableMenuItem[];
  categories: Category[];
  selectedCategory: Category | null;
  filters: MutableMenuFilters;
}
