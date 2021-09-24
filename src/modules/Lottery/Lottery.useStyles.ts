import { createUseStyles } from 'react-jss';
import styleCompiler from '~/compiler';

const games = (MID: string, style: any) => {
    const type = MID.split('_')[1];
    const prefix = `& #${MID} .${MID}_`;

    const compiler = (name: string) =>
        styleCompiler(style[`${MID}_${name}`]).style || {};

    const buildStyle = (name: string, style: { [keys: string]: any }) => {
        style[`${prefix}${name}`] = compiler(name);
    };

    const groupStyle = {
        
    }

    let nameArray: string[] = [];
    switch (type) {
        case 'boxroulette':
            nameArray = [
                'items_wrap',
                'items_lottery',
                'items_prizeItem',
                'items_selected',
                'prize',
                'items_gameimg',
                'items_prizealias',
                'items_lotterybuttonwrap',
                'items_lotterybutton'
            ]
            break;
    
        default:
            break;
    }

    return groupStyle;
}

const handlePublicModal = (MID: string, modal: string, style: any) => {
    const prefix = `& .${MID}_${modal}_wrap .${MID}_${modal}_`;
    const compiler = (block: string, name: string) =>
        styleCompiler(style[`${block}_${name}`]).style || {};
    const modalStyle = (name: string, style: { [keys: string]: any }) => {
        style[`${prefix}${name}`] = compiler(modal, name);
    };
    const publicModal = {
        [`${prefix}overlay`]: compiler('dialog', 'overlay'),
        [`${prefix}content_wrap`]: compiler('dialog', 'content_wrap'),
        [`${prefix}content`]: compiler('dialog', 'content'),
        [`${prefix}modules`]: compiler('dialog', 'modules'),
        [`${prefix}article`]: compiler('dialog', 'article'),
        [`${prefix}close`]: compiler('dialog', 'close'),
        [`${prefix}footer button`]: compiler('dialog', 'submit'),
    };
    let nameArray: string[] = [];
    switch (modal) {
        case 'successmodal':
        case 'failedmodal':
            nameArray = [
                'contenttop',
                'article_content',
                'header',
                'modaltitle',
                'prizename',
                'awardmsg',
                'prizeimg',
                'memo',
                'contentbottom',
            ];
            break;
        case 'addressmodal':
            nameArray = [
                'addressbox',
                'formbox',
                'header',
                'main',
                'player',
                'subtitle',
                'row',
                'label',
                'input',
                'textarea',
            ];

            break;
        case 'records':
            nameArray = [
                'list',
                'list_item',
                'list_item_prizeimg_wrap',
                'list_item_prizeimg',
                'list_item_text',
                'list_item_prizename',
                'list_item_wintime',
                'list_item_saveaddress',
                'list_item_address',
            ];
            break;
        case 'rules':
            nameArray = ['list', 'list_item'];
            break;
        default:
            break;
    }
    nameArray.forEach((name: string) => modalStyle(name, publicModal));
    return publicModal;
};

const useStyles = (id: string) =>
    createUseStyles<string, any>({
        lotteryPublicModal: (style) => ({
            ...handlePublicModal(id, 'successmodal', style),
            ...handlePublicModal(id, 'failedmodal', style),
            ...handlePublicModal(id, 'addressmodal', style),
            ...handlePublicModal(id, 'records', style),
            ...handlePublicModal(id, 'rules', style),
            ...games(id, style)
        })
    });

export default useStyles;
