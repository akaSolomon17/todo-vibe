# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

React Native mobile app built with Expo SDK 54, using file-based routing (expo-router). Currently implements a Todo app with a dark theme UI.

## Commands

```bash
# Start development server (runs on Android, iOS, or web)
npm start

# Platform-specific
npm run android
npm run ios
npm run web

# Linting
npm run lint
```

No test framework is currently configured.

## Architecture

### Routing (expo-router)

Routes live in `app/` using file-based routing:
- `app/_layout.tsx` - Root layout with providers (QueryClient, KeyboardProvider, SafeAreaProvider)
- `app/index.tsx` - Welcome/onboarding screen
- `app/home.tsx` - Main todo screen
- `app/settings.tsx` - Settings screen

### Source Code Organization

Feature code lives in `src/` with path aliases configured in `tsconfig.json`:
- `@/components/*` → `src/components/*`
- `@/features/*` → `src/features/*`
- `@/hooks/*` → `src/hooks/*`
- `@/utils/*` → `src/utils/*`

Legacy components remain in root `components/` directory.

### State Management

Uses Zustand for global state. Stores are in `src/features/[feature]/store/`:
- `useTodoStore` - Todo CRUD operations

### Styling

NativeWind (TailwindCSS for React Native) with custom theme colors defined in `tailwind.config.js`:
- `dark-100` through `dark-500` - Dark backgrounds
- `accent-purple`, `accent-pink`, `accent-cyan` - Accent colors

Use `className` prop with Tailwind classes for styling.

### Key Libraries

- **Animations**: react-native-reanimated (use `Animated` components, `FadeIn`, `FadeInDown`, etc.)
- **Keyboard**: react-native-keyboard-controller (`useReanimatedKeyboardAnimation`)
- **Haptics**: expo-haptics (`Haptics.impactAsync`)
- **Data fetching**: @tanstack/react-query (QueryClient in root layout)
