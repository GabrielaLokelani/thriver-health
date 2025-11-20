# Backend Integration Guide

## Current Setup

The frontend is now prepared for backend integration with a service layer abstraction.

## Service Layer

All data access goes through `src/services/dataService.ts`:

- `profileService` - User profile operations
- `wellnessService` - Wellness entries operations  
- `metricService` - Metric data operations
- `settingsService` - User settings operations

## How to Switch to Backend

1. **Set the flag** in `dataService.ts`:
   ```typescript
   const USE_BACKEND = true;
   ```

2. **Replace TODO comments** with actual API calls:
   ```typescript
   // Before (localStorage):
   return storage.getUserProfile();
   
   // After (API):
   return await api.get('/profile');
   ```

3. **Create API client** in `src/services/api.ts` (already exists as placeholder)

## Migration Steps

1. Components already use `storage` directly - gradually migrate to use service layer
2. Service layer provides same interface, so components won't need changes
3. When backend is ready, just update the service implementations

## Benefits

- ✅ Clean separation of concerns
- ✅ Easy to test (mock services)
- ✅ Simple backend swap (change one flag)
- ✅ Type-safe interfaces
- ✅ Consistent error handling

