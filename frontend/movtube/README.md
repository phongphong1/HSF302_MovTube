# MovTube - Trang web xem phim trực tuyến

Website xem phim trực tuyến MovTube được xây dựng bằng React + TypeScript + Vite + Tailwind CSS.

## Tính năng chính

- Hiển thị danh sách phim nổi bật và phim mới
- Tìm kiếm và lọc phim theo nhiều tiêu chí
- Xem chi tiết thông tin phim
- Giao diện thân thiện và đáp ứng trên nhiều thiết bị

## Công nghệ sử dụng

- **React 19**: Thư viện UI hiện đại
- **TypeScript**: Hỗ trợ kiểu dữ liệu tĩnh
- **Vite**: Build tool nhanh và hiệu quả
- **Tailwind CSS**: Framework CSS utility-first
- **React Router**: Điều hướng trong ứng dụng

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
