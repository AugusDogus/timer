import tailwindPlugin from 'prettier-plugin-tailwindcss';

const config = {
    printWidth: 120,
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    plugins: [tailwindPlugin],
};

export default config;
