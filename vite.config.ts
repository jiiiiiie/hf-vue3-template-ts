import { fileURLToPath, URL } from 'node:url';

import type { UserConfig, ConfigEnv } from 'vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	console.log('env >>>>>>', command, mode);
	return {
		base: '/', //打包路径
		plugins: [
			vue(),
			vueJsx(),
			viteCompression({
				verbose: true,
				disable: false,
				threshold: 10240,
				algorithm: 'gzip',
				ext: '.gz'
			}),
			PkgConfig(),
			OptimizationPersist(),
			visualizer()
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 引入 mian.scss 这样就可以在全局中使用
					additionalData: '@import "@/styles/function.scss";'
				}
			}
		},
		server: {
			hmr: { overlay: true },
			port: 8888,
			open: true,
			host: '0.0.0.0'
			// 本地跨域代理. 目前注释的原因：暂时没有用途，server 端已经支持跨域
			// proxy: {
			// 	'/api': {
			// 		// target: 'http://10.10.12.216:18005',
			// 		target: 'http://39.101.195.215:18005',
			// 		changeOrigin: true,
			// 		rewrite: (path) => path.replace(/^\/api/, '')
			// 	}
			// }
		},
		build: {
			terserOptions: {
				compress: {
					drop_debugger: mode !== 'base',
					drop_console: mode !== 'base'
				}
			},
			rollupOptions: {
				external: ['lodash-es']
			}
		}
	};
});
