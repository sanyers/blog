XCOPY docs\.vuepress\dist dist /S /Y
cd dist
git add .
git commit -m 'Update'
git push
cd ..