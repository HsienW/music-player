module.exports = {
    optimization: {
        // 套件 & common 的 code 拆分成 chunk
        concatenateModules: false,
        splitChunks: {
            maxInitialRequests: 7,
            // cacheGroups 用途是定義 chunks 所屬的 cache 組
            cacheGroups: {
                // styles 權重設置為最高, 不然可能其他的 cacheGroups 會提前打包一部分 style 文件
                styles: {
                    name: 'styles',
                    priority: 35,
                    test: /.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                // 拆分 react 核心
                reactDll: {
                    name: 'react-dll',
                    priority: 20, // 權重要大於 vendor & 其他套件
                    test: (module) => {
                        return /react|react-dom|prop-types/.test(module.context);
                    },
                    chunks: 'initial',
                },
                // 拆分第三方套件
                vendor: {
                    name: 'vendor',
                    priority: 1, // 設定優先級, 首先抽出第三方套件
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    enforce: true,
                    minSize: 0,
                    minChunks: 1 // 拆分條件是, 在 src 中最少 import 了1次的都拆
                },
                // 拆分第三方套件 moment
                moment: {
                    name: 'moment', // 單獨把 moment 拆包出來
                    priority: 2, // 權重要大於 vendor
                    test: (module) => {
                        return /moment/.test(module.context);
                    },
                    chunks: 'initial',
                    minSize: 10, // size 超過 10 byte 的都算
                    minChunks: 1 // 拆分條件是, 在 src 中最少 import 了1次的都拆
                },
                // 拆分第三方套件 uuid
                uuid: {
                    name: 'uuid', // 單獨把 uuid 拆包出來
                    priority: 2, // 權重要大於 vendor
                    test: (module) => {
                        return /uuid/.test(module.context);
                    },
                    chunks: 'initial',
                    minChunks: 1 // 拆分條件是, 在 src 中最少 import 了1次的都拆
                },
                // 拆分 common code 成暫存, 避免重複打包
                common: {
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100, // size 超過 100 byte 的都算
                    minChunks: 1 // 拆分條件是, 在 src 中最少 import 了3次的都拆
                }
            }
        },
        // runtimeChunk 的作用是將包含 chunk 映射關係的列表從 main.js 中抽離出來
        runtimeChunk: {
            name: 'manifest'
        }
    },
    resolve: {
        // 嘗試按順序解析這些後綴名, 如果有多個文件有相同的名字, 但後綴名不同先找 .js
        extensions: [
            '.js',
            '.json',
            '.jsx'
        ]
    }
}
