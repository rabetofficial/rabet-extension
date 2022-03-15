const fs = require('fs');

const file = fs.readFileSync('manifest_template.json', 'utf-8');

class ManifestPlugin {
  apply(compiler) {
    compiler.hooks.afterCompile.tap(
      'ManifestPlugin',
      (compilation) => {
        const chunks = Array.from(compilation.chunks);

        for (let i = 0; i < chunks.length; i += 1) {
          if (typeof chunks[i].runtime !== 'string') {
            if (chunks[i].runtime.has('background_script')) {
              const fileName = chunks[i].files[0];
              const files = [
                'dist/background_script.js',
                `dist/${fileName}`,
              ];

              const newFile = file.replace(
                '"@@background_script@@"',
                JSON.stringify(files),
              );

              fs.writeFileSync('manifest.json', newFile);
            }
          }
        }
      },
    );
  }
}

module.exports = ManifestPlugin;
