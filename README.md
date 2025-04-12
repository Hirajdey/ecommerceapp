# Project Details

## Dev Dependencies

- "@babel/core" : It enables developers to transform modern JavaScript code into versions compatible with older JavaScript environments, ensuring that new language features can be used without sacrificing support for older browsers or runtimes.

- "@babel/preset-env" : is a Babel preset that enables you to use the latest JavaScript features by automatically determining and applying the necessary transformations and polyfills based on your target environments. This ensures compatibility with specified browsers or runtime versions without manual configuration.

- "@babel/preset-react": is a Babel preset that enables the transformation of React's JSX syntax and other React-specific features into standard JavaScript, ensuring compatibility across different JavaScript environments.

- "babel-loader": it's enables the integration of Babel into your Webpack build process, This integration is essential because Webpack itself does not perform code transpilation; it focuses on bundling modules. By using babel-loader, you ensure that your JavaScript code is both bundled and transpiled appropriately, facilitating compatibility across different browsers and environments.

- "html-webpack-plugin": it's a webpack plugin that automates the creation of HTML files to serve your webpack bundles. This is particularly beneficial when dealing with dynamically generated bundle filenames, such as those containing hashes for cache busting, as it eliminates the need to manually update script or link tags in your HTML files.

- "webpack": By integrating webpack into your development workflow, you can manage and optimize your project's assets effectively, leading to faster, more efficient, and maintainable web applications. Module Bundling, Code Splitting, Loaders and Plugins,

- "webpack-cli": is the official command-line interface for webpack, providing a suite of commands and options to interact with webpack directly from the terminal. Webpack-cli is essential for developers who wish to leverage webpack's full capabilities through a command-line interface, facilitating efficient project setup, configuration, and management.

- "webpack-dev-server": is a development server provided by webpack that enhances the development experience by serving your bundled assets and offering features like live reloading and Hot Module Replacement (HMR). It serves your webpack bundles from memory, eliminating the need for writing them to disk, which speeds up the development process.

""

## Configure Babel

Create a .babelrc file in the project root. This configuration tells Babel to use the presets for modern JavaScript and React.

## Configure Webpack

​Managing separate Webpack configurations for development and production environments is a common practice in large-scale React applications. This approach allows you to tailor settings to the specific needs of each environment, optimizing performance and maintainability. Here's how you can effectively handle multiple configuration files : ​

Create three distinct configuration files in your project's root directory :​

- webpack.common.js: Contains settings shared across both development and production environments.​
- webpack.dev.js: Holds configurations specific to the development environment.​
- webpack.prod.js: Includes configurations tailored for the production environment.

To merge these configurations efficiently, install the webpack-merge package:

ENTRY : ​In a Webpack configuration for a React application, the entry point specifies the initial file that Webpack uses to build the dependency graph for your project. This means Webpack starts bundling from the index.tsx file located in the src directory. This file typically initializes your React application and renders the root component into the DOM.

On the other hand, the public/index.html file serves as the template HTML file into which your bundled JavaScript files are injected. This is managed by the HtmlWebpackPlugin in your configuration

```javaScript
plugins: [
  new HtmlWebpackPlugin({
    template: './public/index.html',
  }),
],
```

OUTPUT : In your Webpack configuration, the output section defines how and where Webpack should emit the bundled files. Let's break down each property :

filename: 'bundle.js':

Specifies the name of the output bundle file. In this case, all bundled JavaScript will be emitted into a file named bundle.js.​

path: path.resolve(\_\_dirname, 'dist'):

Defines the absolute path on the local filesystem where the bundled files will be stored. Here, it's set to the dist directory within your project's root.​

publicPath: '/':

Sets the base path for all assets within your application. It's crucial for determining how assets are referenced in the browser.​
webpack

The publicPath is particularly important when your application is served from a specific subdirectory or when assets are hosted on a different domain, such as a Content Delivery Network (CDN). For example:

Serving from a subdirectory: If your application is hosted at https://example.com/my-app/, you should set publicPath: '/my-app/'. This ensures that asset URLs are correctly prefixed, like https://example.com/my-app/bundle.js.​

Using a CDN: If assets are hosted on a CDN, set publicPath to the CDN's URL, such as publicPath: 'https://cdn.example.com/'. This directs the browser to load assets from the CDN.​

Setting the publicPath correctly ensures that the browser can locate and load your assets properly, especially in scenarios involving dynamic imports or when assets are located in different directories or domains.

```javaScript
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
},
```

RESOLVE : When you import modules in your project without specifying their file extensions, Webpack uses the extensions array to determine which files to look for. For example, if you have the following import statement : ​

```javaScript
import MyComponent from './MyComponent';
```

Webpack will attempt to resolve this import by appending each extension in the extensions array to ./MyComponent and checking if a corresponding file exists. With your configuration, Webpack will look for:​ ./MyComponent.tsx​ ./MyComponent.ts​ ./MyComponent.js​. It will use the first matching file it finds.

MODULE : In Webpack, the module section is essential because it defines how different types of files should be processed before they are included in the final bundle. Webpack, by default, can only handle JavaScript and JSON files. However, modern applications often use various file types such as TypeScript, CSS, images, fonts, and more. The module configuration allows Webpack to transform these files into valid JavaScript that can be bundled together.

```javaScript
    module: {
    rules: [
        {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        },
        // Additional loaders can be added here
    ],
    },
```

​In Webpack's configuration, the module section is pivotal for defining how different types of modules are treated. Beyond the rules array, which specifies loaders and their conditions, the module object can include several other properties to fine-tune the module processing behavior : unsafeCache, parser, noParse,

PLUGINS : In Webpack configuration, you've included the HtmlWebpackPlugin within the plugins array as follows :

```javaScript
    plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    // Common plugins can be added here
    ],
```

The HtmlWebpackPlugin is a widely used plugin that simplifies the creation of HTML files to serve your bundled JavaScript. By specifying the template option, you're directing the plugin to use your existing index.html file located in the public directory as a template. This setup ensures that the generated HTML file includes references to your bundled assets, such as JavaScript and CSS files.

​In your Webpack configuration, the following settings are used to optimize the development experience :

```javaScript
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, 'public'),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
```

mode: 'development': This sets Webpack's mode to development, enabling optimizations tailored for a faster build and enhanced debugging. It sets process.env.NODE_ENV to 'development', which can be used within your application to enable or disable features accordingly.

devtool: 'inline-source-map': This option controls how source maps are generated, facilitating easier debugging by mapping the bundled code back to the original source code. The 'inline-source-map' setting embeds the source map directly into the bundled JavaScript file as a data URL, providing precise line and column mappings. While this results in larger bundle sizes, it offers the advantage of having source maps readily available without additional network requests.​

devServer: The devServer configuration sets up the Webpack Development Server, providing features that enhance the development workflow:​

    - historyApiFallback: true: This enables support for history API fallback in single-page applications (SPAs). When set to true, the server will respond with the index.html file for any 404 (Not Found) responses, ensuring that client-side routing works correctly.​

    - static: path.resolve(__dirname, 'public'): This option specifies the directory from which static files will be served. In this case, it sets the 'public' directory as the location for static assets like images, fonts, and other resources.​

    - open: true: When set to true, this option tells the development server to open the default web browser automatically after the server starts, providing immediate access to the application.​

    - compress: true: Enabling this option allows the server to compress files using gzip compression, which can improve the transfer speed of assets and enhance the development experience.​

    - hot: true: This enables Hot Module Replacement (HMR), allowing modules to be updated in the browser at runtime without requiring a full refresh. HMR helps maintain the application state and speeds up the development process by injecting updated modules directly into the running application.​

    - port: 3000: This sets the port on which the development server will listen. In this case, the application will be accessible at http://localhost:3000/.

In production Webpack configuration, the output section is defined as follows :

```javaScript
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
```

Here's a breakdown of few property and its role in optimizing your production build:

filename: '[name].[contenthash].js':

This setting determines the naming convention for your output JavaScript files.​

[name] is a placeholder that gets replaced with the name of the entry point (e.g., 'main' or 'vendor').​

[contenthash] is a placeholder that generates a unique hash based on the content of the file. This ensures that if the content changes, a new filename is generated, which is crucial for long-term caching strategies. By using content hashes, browsers will load the updated files when content changes, while still caching unchanged files.

OPTIMIZATION : In your Webpack configuration, the optimization section plays a crucial role in enhancing the performance and efficiency of your bundled code. The provided configuration includes -

```javaScript
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    },
```

​splitChunks: { chunks: 'all' }:

Purpose: This setting enables Webpack's SplitChunksPlugin to optimize code splitting by extracting common dependencies into separate files. By setting chunks: 'all', you're instructing Webpack to target both synchronous (initial) and asynchronous (async) chunks for optimization.​
GitHub

Benefits:

Reduces Duplication: Shared modules across different chunks are combined into a single chunk, minimizing redundancy.

Improves Caching: Separating vendor libraries from application code allows browsers to cache these libraries independently, leading to better long-term caching.

Enhances Load Performance: Smaller, more focused chunks can be loaded on demand, improving page load times and resource utilization.

Reference: For more details, refer to the SplitChunksPlugin documentation.​

runtimeChunk: 'single':

Purpose: This option extracts the Webpack runtime and manifest into a separate chunk. The runtime manages the loading and linking of modules in the browser. By setting runtimeChunk: 'single', you're ensuring that there's a single runtime shared across all chunks.​

Benefits:

Consistent Module Mapping: Having a single runtime ensures that module identifiers remain consistent across builds, which is vital for long-term caching.

Avoids Duplication: Prevents the runtime from being included in multiple chunks, reducing overall bundle size.

Reference: For more information, see the Webpack optimization documentation.​

Additional Optimization Options:

Beyond splitChunks and runtimeChunk, Webpack offers several other optimization options to fine-tune your build:

minimize:

Type: boolean​

Purpose: Enables or disables minimization of the output bundles. By default, it's true in production mode and false in development mode.​

Reference: Webpack Optimization: minimize​

minimizer:

Purpose: Allows customization of the minimizers used, such as TerserPlugin for JavaScript or CssMinimizerPlugin for CSS.​

Reference: Webpack Optimization: minimizer​

concatenateModules:

Type: boolean​

Purpose: Enables module concatenation (scope hoisting) to create faster executing JavaScript modules. It's enabled by default in production mode.​

Reference: Webpack Optimization: concatenateModules​

moduleIds and chunkIds:

Purpose: Determines the algorithm used to assign IDs to modules and chunks. Options include 'natural', 'named', 'deterministic', and 'size'. Choosing the right strategy can impact caching and build performance.​

Reference: Webpack Optimization: moduleIds and Webpack Optimization: chunkIds​

removeAvailableModules and removeEmptyChunks:

Type: boolean​

Purpose: Cleans up the module graph by removing modules that are already included in parent chunks and eliminating empty chunks, leading to a more efficient build.​

Reference: Webpack Optimization: removeAvailableModules and Webpack Optimization: removeEmptyChunks​

sideEffects:

Type: boolean or 'flag'​

Purpose: Indicates whether to skip over modules flagged as having no side effects, enabling more aggressive tree shaking.​

Reference: Webpack Optimization: sideEffects​

By thoughtfully configuring these optimization options, you can significantly enhance your application's performance, reduce bundle sizes, and improve caching strategies.

## Configure TypeScript

Create a tsconfig.json file in the root of your project to specify TypeScript compiler options :

Key Configuration Options Explained -

target and module: Set to "ESNext" to utilize the latest ECMAScript features and module system, ensuring compatibility with modern JavaScript environments.​
Gcore

lib: Specifies the library files to be included in the compilation. Including "DOM" and "DOM.Iterable" ensures that DOM-related APIs are recognized, which is essential for React applications.​

jsx: Set to "react-jsx" to enable the new JSX transform introduced in React 17, which simplifies the JSX compilation process.​

strict: Enables all strict type-checking options, promoting type safety and catching potential errors during development.​

moduleResolution, baseUrl, and paths: Configure module resolution to use Node.js conventions. Setting a baseUrl and defining paths allows for cleaner and more manageable imports, facilitating the use of aliases like @components and @utils.​

outDir: Specifies the output directory for compiled JavaScript files, keeping the build artifacts organized.​

sourceMap, declaration, and declarationMap: Generate source maps and declaration files to aid in debugging and provide type definitions for consumers of your code.​

skipLibCheck: Skips type checking of declaration files, which can speed up the build process without compromising the type safety of your application code.

## Configure REDUX

#### configure the latest Redux with Redux Toolkit & React-Redux

##### STEP - 1 :

yarn add @reduxjs/toolkit react-redux

##### STEP - 2 :

Create Your Redux Store - inside a store/ folder, create a store.js file :
