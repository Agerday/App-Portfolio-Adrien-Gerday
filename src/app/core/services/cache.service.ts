import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

interface CacheEntry {
  response: HttpResponse<unknown>;
  expiry: number;
}

@Injectable({providedIn: 'root'})
export class CacheService {
  private cache = new Map<string, CacheEntry>();

  get(key: string): HttpResponse<unknown> | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.response;
  }

  set(key: string, response: HttpResponse<unknown>, ttl = 60000): void {
    this.cache.set(key, {
      response,
      expiry: Date.now() + ttl,
    });
  }

  invalidate(resource: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(resource)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }
}
