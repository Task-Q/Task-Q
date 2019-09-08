rm -r dist

npm i
npm run build

cd task-q-fe/
npm i
npm run build
mv dist ../dist/public
cd ..

git add -f dist
git commit -m 'Deploy'
git push -f heroku master
git reset --hard HEAD~