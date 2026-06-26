/**
 * ============================================================
 * 车辆数据工具库 — 数据层的读写接口
 * 功能函数：
 *   getAllCars()         — 获取全部车辆
 *   getFeaturedCars()    — 获取 featured: true 的特价车
 *   getCarBySlug(slug)   — 按 URL slug 查找单台车
 *   getAllBrands()       — 获取所有品牌列表（去重排序，用于筛选下拉）
 *   getAllYears()        — 获取所有年份列表（去重倒序）
 *   getCarsByFilter({})  — 按品牌/年份/排序规则筛选车辆
 *   getHistoryPrices()   — 获取全部历史价格数据
 *   getHistoryPricesByYear(year) — 按年份查历史价格
 * 数据来源：src/data/cars.json + src/data/history-prices.json
 * ============================================================
 */

import carsData from "@/data/cars.json";
import historyPricesData from "@/data/history-prices.json";

export interface CarSpecs {
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  color: string;
  seats: number;
  vin: string;
}

export interface Car {
  slug: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  currency: string;
  images: string[];
  condition: string;
  specs: CarSpecs;
  featured: boolean;
  status: string;
}

export interface HistoryPriceEntry {
  model: string;
  avgPrice: number;
  range: [number, number];
}

export interface HistoryYearData {
  year: number;
  models: HistoryPriceEntry[];
}

export function getAllCars(): Car[] {
  return carsData as Car[];
}

export function getFeaturedCars(): Car[] {
  return (carsData as Car[]).filter((car) => car.featured);
}

export function getCarBySlug(slug: string): Car | undefined {
  return (carsData as Car[]).find((car) => car.slug === slug);
}

export function getAllBrands(): string[] {
  const brands = new Set((carsData as Car[]).map((car) => car.brand));
  return Array.from(brands).sort();
}

export function getAllYears(): number[] {
  const years = new Set((carsData as Car[]).map((car) => car.year));
  return Array.from(years).sort((a, b) => b - a);
}

export function getCarsByFilter(params: {
  brand?: string;
  year?: string;
  sort?: string;
}): Car[] {
  let cars = [...(carsData as Car[])];

  if (params.brand) {
    cars = cars.filter((car) => car.brand === params.brand);
  }

  if (params.year) {
    cars = cars.filter((car) => car.year === parseInt(params.year!));
  }

  switch (params.sort) {
    case "price-asc":
      cars.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      cars.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      cars.sort((a, b) => b.year - a.year);
      break;
    default:
      cars.sort((a, b) => b.year - a.year);
  }

  return cars;
}

export function getHistoryPrices(): HistoryYearData[] {
  return historyPricesData as HistoryYearData[];
}

export function getHistoryPricesByYear(
  year: number
): HistoryYearData | undefined {
  return (historyPricesData as HistoryYearData[]).find(
    (d) => d.year === year
  );
}
