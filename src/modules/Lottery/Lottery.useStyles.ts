import { createUseStyles } from "react-jss";
import styleCompiler from "~/compiler";

const handlePublicModal = (MID: string, modal: string, style: any) => ({
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_overlay`]: (styleCompiler(style.dialog_overlay).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_content_wrap`]: (styleCompiler(style.dialog_content_wrap).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_content`]: (styleCompiler(style.dialog_content).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_modules`]: (styleCompiler(style.dialog_modules).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_article`]: (styleCompiler(style.dialog_article).style || {}),
  [`& .${MID}_${modal}_wrap .${MID}_${modal}_close`]: (styleCompiler(style.dialog_close).style || {}),
})

const WH = window.innerHeight;

const useStyles = (id: string) => createUseStyles<string, any>({
      lotteryPublicModal: (style) => ({
        ...(handlePublicModal(id, 'successmodal', style)),
        ...(handlePublicModal(id, 'failedmodal', style)),
        ...(handlePublicModal(id, 'addressmodal', style)),
        ...(handlePublicModal(id, 'records', style)),
        ...(handlePublicModal(id, 'rules', style)),
      }),

      wrap: (style) => {
        return {
        };
      },

});

export default useStyles;
