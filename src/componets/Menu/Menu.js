import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import module from './Menu.module.css';

const onOpen = (link, close) => {
  close();
  window.open(link, '_blank');
}
const onCopyURL = (link, close) => {
  close();
  navigator.clipboard.writeText(link);
  toast.success('Link copied to clip board!', {
    position: toast.POSITION.TOP_CENTER
  });
}
const onDelete = (close, onRemoveLink) => {
  onRemoveLink();
  close();
}

const menu = (props) => {
  return (
    <div className={module.menu}>
      <div className={module.item} onClick={() => onOpen(props.link.url, props.close)} >Open</div>
      <div className={module.divider} ></div>
      <div className={module.item} onClick={() => onCopyURL(props.link.url, props.close)} >Copy URL</div>
      <div className={module.divider} ></div>
      <div className={module.item} onClick={() => onDelete(props.close, props.onRemoveLink)} >Delete</div>
    </div>
  );
}

export default menu;