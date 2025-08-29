# TODO - Perbaikan Layout dan Authentication

## ✅ Sudah Dikerjakan
- [x] Analisis komprehensif semua layout dan komponen terkait
- [x] Identifikasi masalah potensial

## 📋 Rencana Perbaikan

### 1. Perbaikan Layout dan Styling
- [ ] Konsistensi font antara layout.tsx dan globals.css
- [ ] Tambahkan metadata di main layout
- [ ] Perbaiki struktur auth layout

### 2. Perbaikan Authentication System
- [ ] Ganti localStorage dengan cookies untuk menghindari hydration issues
- [ ] Tambahkan error handling dan loading states di form
- [ ] Improve API error handling

### 3. Perbaikan UX/UI
- [ ] Tambahkan loading spinner selama autentikasi
- [ ] Tambahkan error messages di form
- [ ] Improve protected route logic

### 4. Code Quality Improvements
- [ ] Tambahkan proper types
- [ ] Implementasi error boundaries
- [ ] Optimasi performance

## 🔧 File yang Akan Diperbaiki
- src/app/layout.tsx
- src/app/(auth)/layout.tsx  
- src/context/AuthContext.tsx
- src/lib/authService.ts
- src/components/auth/LoginForm.tsx
- src/components/layout/ProtectedRoute.tsx
- src/lib/api.ts

## ⚡ Prioritas
1. Fix hydration issues (localStorage -> cookies)
2. Improve error handling
3. UX improvements (loading states, error messages)
4. Code quality enhancements
