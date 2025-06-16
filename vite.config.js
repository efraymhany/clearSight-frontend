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
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 👈 هنا بتحدد البورت
  },
})
