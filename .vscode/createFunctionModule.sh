#!/bin/bash

NAME=$1
PATHUrl="./src/modules/"
PATHTPL="./.vscode/FunctionModuleTpl"
ERROR='\033[32m'
SUCCESS='\033[32m'
WRAM='\033[33m'
LINK='\033[34m'
RES='\033[0m'

if [ -z $NAME ]; then
    echo -e ${WRAM}'缺少模块名称参数: createFunctionModule.sh [ModuleName]'$RES
    exit
fi
index=$(cat $PATHTPL/index.txt)

if [ ! -d $PATHUrl$NAME ]; then
    mkdir $PATHUrl$NAME;
    # copy
    cp $PATHTPL/index.txt $PATHUrl$NAME/index.ts
    # replace
    sed -i '' -e "s/FunctionModuleTpl/"${NAME}"/g" $PATHUrl$NAME/index.ts
    # copy
    cp $PATHTPL/FunctionModuleTpl.config.txt $PATHUrl$NAME/$NAME.config.ts
    # copy
    cp $PATHTPL/FunctionModuleTpl.createStyles.txt $PATHUrl$NAME/$NAME.createStyles.ts
    # replace
    sed -i '' -e "s/FunctionModuleTpl/"${NAME}"/g" $PATHUrl$NAME/$NAME.createStyles.ts
    # copy
    cp $PATHTPL/FunctionModuleTpl.txt $PATHUrl$NAME/$NAME.tsx
    # replace
    sed -i '' -e "s/FunctionModuleTpl/"${NAME}"/g" $PATHUrl$NAME/$NAME.tsx
    # copy
    cp $PATHTPL/README.txt $PATHUrl$NAME/README.md
    # replace
    sed -i '' -e "s/FunctionModuleTpl/"${NAME}"/g" $PATHUrl$NAME/README.md
    echo -e $SUCCESS'模块'$NAME'已创建！' $LINK $PATHUrl$NAME $RES
    echo
    exit
fi
    echo -e $WRAM'模块'$NAME'已存在，请勿重复创建！'$RES  $LINK $PATHUrl$NAME $RES
    echo