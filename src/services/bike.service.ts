import { Bike } from '../types';
import { storageService } from './storage.service';

class BikeService {
  public getAllBikes(): Bike[] {
    return storageService.getBikes();
  }

  public getBikeById(id: string): Bike | undefined {
    const bikes = storageService.getBikes();
    return bikes.find((b) => b.id === id);
  }

  public createBike(bikeData: Omit<Bike, 'id'>): Bike {
    const bikes = storageService.getBikes();
    const newBike: Bike = {
      ...bikeData,
      id: `bike-${Date.now()}`,
    };
    storageService.saveBikes([newBike, ...bikes]);
    return newBike;
  }

  public updateBike(id: string, updates: Partial<Bike>): Bike | null {
    const bikes = storageService.getBikes();
    let updatedBike: Bike | null = null;
    const updated = bikes.map((b) => {
      if (b.id === id) {
        updatedBike = { ...b, ...updates };
        return updatedBike;
      }
      return b;
    });
    storageService.saveBikes(updated);
    return updatedBike;
  }

  public deleteBike(id: string): boolean {
    const bikes = storageService.getBikes();
    const filtered = bikes.filter((b) => b.id !== id);
    if (filtered.length !== bikes.length) {
      storageService.saveBikes(filtered);
      return true;
    }
    return false;
  }
}

export const bikeService = new BikeService();
