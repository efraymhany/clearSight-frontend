// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   base: "/clearSight-frontend"
// // })
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://localhost:7007',
//         changeOrigin: true,
//         secure: false
//       }
//     }
//   }
// })
// vite.config.js


//44444444444444444444

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173, 
//   },
// })
//444444444444444
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ مهم جداً نضيف environment: 'jsdom'
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  test: {
    environment: 'jsdom', // ✅ يشغّل DOM في الاختبارات (زي المتصفح)
    globals: true,         // (اختياري) يخلي describe/it/expect تشتغل بدون import في كل مرة
    setupFiles: './setupTests.js', // (اختياري) لو عندك إعدادات مسبقة
  },
})
