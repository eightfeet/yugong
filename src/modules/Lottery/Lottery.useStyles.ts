import { createUseStyles } from 'react-jss';
import styleCompiler from '~/compiler';

const handlePublicModal = (MID: string, modal: string, style: any) => {
    const prefix = `& .${MID}_${modal}_wrap .${MID}_${modal}_`;
    const publicModal = {
        [`${prefix}overlay`]: styleCompiler(style.dialog_overlay).style || {},
        [`${prefix}content_wrap`]: styleCompiler(style.dialog_content_wrap).style || {},
        [`${prefix}content`]: styleCompiler(style.dialog_content).style || {},
        [`${prefix}modules`]: styleCompiler(style.dialog_modules).style || {},
        [`${prefix}article`]: styleCompiler(style.dialog_article).style || {},
        [`${prefix}close`]: styleCompiler(style.dialog_close).style || {},
        [`${prefix}footer button`]: styleCompiler(style.dialog_submit).style || {},
    };

    switch (modal) {
      case 'successmodal':
      case 'failedmodal':
        publicModal[`${prefix}contenttop`] = styleCompiler(style.successmodal_contenttop).style || {};
        publicModal[`${prefix}article_content`] = styleCompiler(style.successmodal_article_content).style || {};
        publicModal[`${prefix}header`] = styleCompiler(style.successmodal_header).style || {};
        publicModal[`${prefix}modaltitle`] = styleCompiler(style.successmodal_modaltitle).style || {};
        publicModal[`${prefix}prizename`] = styleCompiler(style.successmodal_prizename).style || {};
        publicModal[`${prefix}awardmsg`] = styleCompiler(style.successmodal_awardmsg).style || {};
        publicModal[`${prefix}prizeimg`] = styleCompiler(style.successmodal_prizeimg).style || {};
        publicModal[`${prefix}memo`] = styleCompiler(style.successmodal_memo).style || {};
        publicModal[`${prefix}contentbottom`] = styleCompiler(style.successmodal_contentbottom).style || {};
        break;
      case 'addressmodal':
        publicModal[`${prefix}addressbox`] = styleCompiler(style.successmodal_addressbox).style || {};
        publicModal[`${prefix}formbox`] = styleCompiler(style.successmodal_formbox).style || {};
        publicModal[`${prefix}header`] = styleCompiler(style.successmodal_header).style || {};
        publicModal[`${prefix}main`] = styleCompiler(style.successmodal_main).style || {};
        publicModal[`${prefix}player`] = styleCompiler(style.successmodal_player).style || {};
        publicModal[`${prefix}subtitle`] = styleCompiler(style.successmodal_subtitle).style || {};
        publicModal[`${prefix}row`] = styleCompiler(style.successmodal_row).style || {};
        publicModal[`${prefix}label`] = styleCompiler(style.successmodal_label).style || {};
        publicModal[`${prefix}input`] = styleCompiler(style.successmodal_input).style || {};
        publicModal[`${prefix}textarea`] = styleCompiler(style.successmodal_textarea).style || {};
        break;
      case 'records':
        break;
      case 'rules':
        break;
      default:
        break;
    }

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
        }),

        wrap: (style) => {
            return {};
        },
    });

export default useStyles;
