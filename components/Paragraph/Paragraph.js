import sanitizeHtml from 'sanitize-html';
import { getTextAlign } from 'utils/fonts';
import { relativeToAbsoluteUrls } from 'utils/relativeToAbsoluteUrl';

const Paragraph = ({textAlign="left", content, textColor}) => {
  const clean = sanitizeHtml(content);
  return (
   <p 
   className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
   style={{color: textColor}}
   dangerouslySetInnerHTML= {{__html: relativeToAbsoluteUrls(clean)}} />
  )
}

export default Paragraph