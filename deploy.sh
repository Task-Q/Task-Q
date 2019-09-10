rm -r dist

npm i
npm run build

cd task-q-fe/
npm i
npm run build
mv dist ../dist/public
cd ..

git stash
git add -f dist
git commit -m 'Deploy'
git push -f heroku master
git reset --hard HEAD~
git stash pop