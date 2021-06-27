#!/bin/bash

NAME=$1
PATHUrl="./src/modules/"
PATHTPL="./.vscode/ModuleTpl"
ERROR='\033[32m'
SUCCESS='\033[32m'
WRAM='\033[33m'
LINK='\033[34m'
RES='\033[0m'

if [ -z $NAME ]; then
    echo -e ${WRAM}'缺少模块名称参数: createModule.sh [ModuleName]'$RES
    exit
fi
index=$(cat $PATHTPL/index.txt)

if [ ! -d $PATHUrl$NAME ]; then
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
    echo -e $SUCCESS'模块'$NAME'已创建！'$RES  ctrl+click $LINK $PATHUrl$NAME $RES
    echo
    exit
fi
    echo -e $WRAM'模块'$NAME'已存在，请勿重复创建！'$RES  ctrl+click $LINK $PATHUrl$NAME $RES
    echo