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
    };

    switch (modal) {
      case 'successmodal':
        break;
      case 'failedmodal':
        break;
      case 'addressmodal':
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
