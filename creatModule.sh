NAME=$1
PATHUrl="./src/modules/"
PATHTPL="./.vscode/ModuleTpl"
if [ -z $NAME ]; then
    echo '缺少模块名称参数 npm run createModule [ModuleName]'
    exit
fi
index=$(cat $PATHTPL/index.txt)
mkdir $PATHUrl$NAME;
# copy
cp $PATHTPL/index.txt $PATHUrl$NAME/index.ts
# replace
sed -i '' -e "s/ModuleTpl/"${NAME}"/g" $PATHUrl$NAME/index.ts
# copy
cp $PATHTPL/ModuleTpl.config.txt $PATHUrl$NAME/$NAME.config.ts
# copy
cp $PATHTPL/ModuleTpl.useStyles.txt $PATHUrl$NAME/$NAME.useStyles.ts
# copy
cp $PATHTPL/ModuleTpl.txt $PATHUrl$NAME/$NAME.tsx
# replace
sed -i '' -e "s/ModuleTpl/"${NAME}"/g" $PATHUrl$NAME/$NAME.tsx

