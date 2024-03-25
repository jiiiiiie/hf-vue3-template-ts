// @see https://stylelint.bootcss.com/
module.exports = {
	extends: [
		// 代码风格规则
		'stylelint-stylistic/config',
		// 基本 scss 规则
		'stylelint-config-standard-scss',
		// scss vue 规则
		'stylelint-config-recommended-vue/scss',
		// 样式属性顺序规则
		'stylelint-config-recess-order',
	],
	"overrides": [
		{
			"files": ["*.html", "**/*.html"],
			"customSyntax": "postcss-html"
		}
	],
	/**
	 * null  => 关闭该规则
	 * always => 必须
	 */
	rules: {
		// 'stylistic/max-line-length': 100,
		// 'selector-class-pattern': null,
		// 'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
		// 'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
		// 'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
		// 'no-empty-source': null, // 关闭禁止空源码
		// 'selector-class-pattern': null, // 关闭强制选择器类名的格式
		'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
		// 'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
		// 'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
		// 'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
		// 'unit-case': null, // 指定单位的大小写 "lower(全小写)"|"upper(全大写)"
		// 'color-hex-length': 'long', // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
		// 'rule-empty-line-before': 'never', // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行。)"
		// 'font-family-no-missing-generic-family-keyword': null, // 禁止在字体族名称列表中缺少通用字体族关键字
		// 'declaration-block-trailing-semicolon': null, // 要求或不允许在声明块中使用尾随分号 string："always(必须始终有一个尾随分号)"|"never(不得有尾随分号)"
		// 'scss/at-import-partial-extension': null, // 解决不能引入scss文件
		'scss/dollar-variable-pattern': null,
		'selector-class-pattern': null,
		'selector-pseudo-class-no-unknown': [
			// 不允许未知的选择器
			null,
			{
				ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
			},
		],
		// 去除tailwind 校验
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind']
			}
		],
	}
};
