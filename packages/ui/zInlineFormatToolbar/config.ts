import { isOsx } from '@muya/config';
import strongIcon from '@muya/assets/icons/format_strong/4.svg';
import emphasisIcon from '@muya/assets/icons/format_emphasis/4.svg';
import underlineIcon from '@muya/assets/icons/format_underline/4.svg';
import codeIcon from '@muya/assets/icons/code/4.svg';
import strikeIcon from '@muya/assets/icons/format_strike/4.svg';
import mathIcon from '@muya/assets/icons/format_math/4.svg';
import highlightIcon from '@muya/assets/icons/highlight/4.svg';
import clearIcon from '@muya/assets/icons/format_clear/4.svg';

const COMMAND_KEY = isOsx ? '⌘' : 'Ctrl';

const icons = [
  {
    type: 'strong',
    tooltip: 'Emphasize',
    shortcut: `${COMMAND_KEY}+B`,
    icon: strongIcon,
  },
  {
    type: 'em',
    tooltip: 'Italic',
    shortcut: `${COMMAND_KEY}+I`,
    icon: emphasisIcon,
  },
  {
    type: 'u',
    tooltip: 'Underline',
    shortcut: `${COMMAND_KEY}+U`,
    icon: underlineIcon,
  },
  {
    type: 'del',
    tooltip: 'Strikethrough',
    shortcut: `${COMMAND_KEY}+D`,
    icon: strikeIcon,
  },
  {
    type: 'mark',
    tooltip: 'Highlight',
    shortcut: `⇧+${COMMAND_KEY}+H`,
    icon: highlightIcon,
  },
  {
    type: 'inline_code',
    tooltip: 'Inline Code',
    shortcut: `${COMMAND_KEY}+E`,
    icon: codeIcon,
  },
  {
    type: 'inline_math',
    tooltip: 'Inline Math',
    shortcut: `⇧+${COMMAND_KEY}+E`,
    icon: mathIcon,
  },
  {
    type: 'clear',
    tooltip: 'Eliminate',
    shortcut: `⇧+${COMMAND_KEY}+R`,
    icon: clearIcon,
  },
];

export type FormatToolIcon = typeof icons[number];

export default icons;
