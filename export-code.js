const fs = require('fs');
const path = require('path');

const rootDir = '.';
const extensions = ['.js', '.ts', '.tsx'];

// Добавьте функцию для проверки, является ли путь частью исключенного пути
const isPathExcluded = (relativePath) => {
    // Список путей, которые нужно исключить
    const excludeList = [
        path.normalize('export-code.js'),
        path.normalize('client/vite.config.ts'),
        path.normalize('client/eslint.config.js'),
        path.normalize('client/src/vite-env.d.ts'),
        path.normalize('client/src/pages/favorites/favorites.tsx'),
        path.normalize('client/src/pages/login/login.tsx'),
        path.normalize('client/src/pages/main-page/main-page.tsx'),
        path.normalize('client/src/pages/not-found/not-found.tsx'),
        path.normalize('client/src/pages/offer/offer.tsx'),
    ];

    // Проверяем, если полный относительный путь начинается с любого из исключаемых путей
    for (const excludePath of excludeList) {
        if (relativePath.startsWith(excludePath)) {
            return true;
        }
    }

    // Дополнительная проверка для любой папки node_modules, где бы она ни находилась
    // Мы можем проверить, есть ли в компонентах пути 'node_modules'
    const pathComponents = relativePath.split(path.sep);
    if (pathComponents.includes('node_modules', 'server//node_modules', 'client//node_modules','client/src/pages')) {
        return true;
    }

    return false;
};


function walkDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        const relativePath = path.normalize(path.relative(rootDir, fullPath));

        // Исключаем саму папку node_modules на уровне, где она встречается,
        // а не только ее содержимое.
        if (path.basename(fullPath) === 'node_modules') {
            return; // Пропускаем всю папку node_modules
        }

        if (stat.isDirectory()) {
            walkDir(fullPath, fileList);
        } else {
            const ext = path.extname(fullPath);
            if (
                extensions.includes(ext) &&
                !isPathExcluded(relativePath) // Используем новую функцию для проверки исключений
            ) {
                fileList.push(fullPath);
            }
        }
    });
    return fileList;
}

const files = walkDir(rootDir);
console.log('Экспортируемые файлы:\n', files);

let output = '';
files.forEach(file => {
    output += `${path.relative('.', file)}\n\n`;
    output += fs.readFileSync(file, 'utf-8') + '\n\n';
});

fs.writeFileSync(path.join(__dirname, 'code_export.txt'), output, 'utf-8');
console.log(output.length);
console.log('✅ Файл code_export.txt создан.');