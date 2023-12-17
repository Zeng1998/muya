import LinkedList from '@muya/block/base/linkedList/linkedList';
import Parent from '@muya/block/base/parent';
import ContainerQueryBlock from '@muya/block/mixins/containerQueryBlock';
import ScrollPage from '@muya/block/scrollPage';
import Muya from '@muya/index';
import { mixins } from '@muya/utils';
import { IListItemState } from '../../../state/types';

@mixins(ContainerQueryBlock)
class ListItem extends Parent {
  public children: LinkedList<Parent> = new LinkedList();

  static blockName = 'list-item';

  static create(muya: Muya, state: IListItemState) {
    const listItem = new ListItem(muya);

    listItem.append(
      ...state.children.map((child) =>
        ScrollPage.loadBlock(child.name).create(muya, child)
      )
    );

    return listItem;
  }

  get path() {
    const { path: pPath } = this.parent!;
    const offset = this.parent!.offset(this);

    return [...pPath, offset, 'children'];
  }

  constructor(muya: Muya) {
    super(muya);
    this.tagName = 'li';
    this.classList = ['mu-list-item'];
    this.createDomNode();
  }

  getState(): IListItemState {
    const state: IListItemState = {
      name: 'list-item',
      children: this.children.map((child) => child.getState()),
    };

    return state;
  }
}

export default ListItem;
