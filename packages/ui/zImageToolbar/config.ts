import editIcon from '@muya/assets/icons/imageEdit/4.svg';
import leftIcon from '@muya/assets/icons/align_left/4.svg';
import middleIcon from '@muya/assets/icons/align_center/4.svg';
import rightIcon from '@muya/assets/icons/align_right/4.svg';
import deleteIcon from '@muya/assets/icons/delete/4.svg';

const icons = [
  {
    type: 'edit',
    tooltip: 'Edit Image',
    icon: editIcon,
  },
  {
    type: 'left',
    tooltip: 'Align Left',
    icon: leftIcon,
  },
  {
    type: 'center',
    tooltip: 'Align Center',
    icon: middleIcon,
  },
  {
    type: 'right',
    tooltip: 'Align Right',
    icon: rightIcon,
  },
  {
    type: 'delete',
    tooltip: 'Remove Image',
    icon: deleteIcon,
  },
];

export default icons;

export type Icon = typeof icons[number];
