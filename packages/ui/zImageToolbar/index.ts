import { h, patch } from '@muya/utils/snabbdom';
import BaseFloat from '../baseFloat';
import icons, { Icon } from './config';

import Format from '@muya/block/base/format';
import Muya from '@muya/index';
import { ImageToken } from '@muya/inlineRenderer/types';
import type { ReferenceObject } from 'popper.js';
import { VNode } from 'snabbdom';
import './index.css';

const defaultOptions = {
  placement: 'top',
  modifiers: {
    offset: {
      offset: '0, 10',
    },
  },
  showArrow: false,
};

class ImageToolbar extends BaseFloat {
  static pluginName = 'imageToolbar';
  private oldVNode: VNode | null = null;
  private imageInfo: {
    token: ImageToken;
    imageId: string;
  } | null = null;
  private icons: Icon[] = icons;
  private reference: ReferenceObject | null = null;
  private block: Format | null = null;
  private toolbarContainer: HTMLDivElement = document.createElement('div');
  private originalWidth: number | null = null;
  private percentage: number | null = null;
  private image: HTMLImageElement | null = null;

  constructor(muya: Muya, options = {}) {
    const name = 'z-image-toolbar';
    const opts = Object.assign({}, defaultOptions, options);

    super(muya, name, opts);

    this.container!.appendChild(this.toolbarContainer);
    this.floatBox!.classList.add('z-image-toolbar-container');

    this.listen();
  }

  override listen() {
    const { eventCenter } = this.muya;
    super.listen();
    eventCenter.on('muya-image-toolbar', ({ block, reference, imageInfo }) => {
      this.reference = reference;
      if (reference) {
        this.block = block;
        this.imageInfo = imageInfo;
        this.image = this.reference?.querySelector('img');
        if (!this.originalWidth) {
          this.originalWidth = this.image?.offsetWidth ?? null;
        }
        setTimeout(() => {
          this.show(reference);
          this.render();
        }, 0);
      } else {
        this.hide();
      }
    });
  }

  render() {
    const { icons, oldVNode, toolbarContainer, imageInfo } = this;
    const { i18n } = this.muya;
    const { attrs } = imageInfo!.token;
    const dataAlign = attrs['data-align'];
    const children = icons.map((i) => {
      const iconWrapperSelector = 'div.icon-wrapper';
      const icon = h(
        'i.icon',
        {
          style: {
            background: `url(${i.icon}) no-repeat`,
            'background-size': '100%',
          },
        },
        ''
      );
      const iconWrapper = h(iconWrapperSelector, icon);
      let itemSelector = `li.item.${i.type}`;

      if (i.type === dataAlign || (i.type === 'resize' && this.percentage && this.percentage!==100)) {
        itemSelector += '.active';
      }

      return h(
        itemSelector,
        {
          dataset: {
            tip: i.tooltip,
          },
          attrs: {
            title: i18n.t(i.tooltip),
          },
          on: {
            click: (event) => {
              this.selectItem(event, i);
            },
          },
        },
        iconWrapper
      );
    });
    // resizelist
    const resizeOptions=["25","33","50","67","80","100","150","200"];
    const resizeList=h('ul.resize-list',{
      style:{
        display:'none'
      }
    },resizeOptions.map((i)=>{
      return h('li.resize-list-item'+(parseInt(i)===this.percentage?' active':''),{
        on:{
          click:(event)=>{
            event.preventDefault();
            event.stopPropagation();
            this.percentage=parseInt(i);
            const width=this.originalWidth*parseFloat(i)/100;
            this.block!.updateImage(this.imageInfo!, 'width', String(width));
            const resizeList = document.querySelector('ul.resize-list');
            resizeList.style.display =  'none';
            return this.hide();
          }
        }
      },`${i}%`);
    }));

    const vnode=h('div',[h('ul',children), resizeList]);

    if (oldVNode) {
      patch(oldVNode, vnode);
    } else {
      patch(toolbarContainer, vnode);
    }
    this.oldVNode = vnode;
  }

  selectItem(event: Event, item: Icon) {
    event.preventDefault();
    event.stopPropagation();

    const { imageInfo } = this;

    switch (item.type) {
      // Delete image.
      case 'delete':
        this.block!.deleteImage(imageInfo!);
        // Hide image transformer
        this.muya.eventCenter.emit('muya-transformer', {
          reference: null,
        });

        return this.hide();

      // Edit image, for example: editor alt and title, replace image.
      case 'edit': {
        const rect = this.reference!.getBoundingClientRect();
        const reference = {
          getBoundingClientRect() {
            rect.height = 0;

            return rect;
          },
        };
        // Hide image resize bar
        this.muya.eventCenter.emit('muya-transformer', {
          reference: null,
        });

        this.muya.eventCenter.emit('muya-image-selector', {
          block: this.block,
          reference,
          imageInfo,
        });

        return this.hide();
      }

      case 'resize':
        const resizeList = document.querySelector('ul.resize-list');
        if(resizeList.style.display === 'block'){
          resizeList.style.display = 'none';
        }else{
          resizeList.style.display = 'block';
        }
        return;
      case 'inline':
      // fall through
      case 'left':
      // fall through
      case 'center':
      // fall through
      case 'right': {
        this.block!.updateImage(this.imageInfo!, 'data-align', item.type);

        return this.hide();
      }
    }
  }
}

export default ImageToolbar;
