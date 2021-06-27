NAME=$1
PATHUrl="./src/modules/"
if [ -z $NAME ]; then
    echo '缺少模块名称参数 npm run createModule [ModuleName]'
    exit
fi
mkdir $PATHUrl$NAME;
touch $PATHUrl$NAME/index.ts;
echo "Hello,${y_name}" >> $PATHUrl$NAME/index.ts;
touch $PATHUrl$NAME/$NAME.config.ts;
touch $PATHUrl$NAME/$NAME.useStyles.ts;
touch $PATHUrl$NAME/$NAME.tsx;
