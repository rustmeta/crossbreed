export interface Page {
  id: string
  title?: string
  icon?: PageIcon
}

export enum PageIcon {
  BLACK_BERRY = 'black_berry',
  BLUE_BERRY = 'blue_berry',
  HEMP = 'hemp',
  CORN = 'corn',
  GREEN_BERRY = 'green_berry',
  POTATO = 'potato',
  PUMPKIN = 'pumpkin',
  RED_BERRY = 'red_berry',
  WHITE_BERRY = 'white_berry',
  YELLOW_BERRY = 'yellow_berry',
}

interface PageIconMap {
  [key: string]: string
}

export const pageIcons: PageIconMap = {
  [PageIcon.BLACK_BERRY]: require('../icons/black.berry.png'),
  [PageIcon.BLUE_BERRY]: require('../icons/blue.berry.png'),
  [PageIcon.HEMP]: require('../icons/clone.hemp.png'),
  [PageIcon.CORN]: require('../icons/corn.png'),
  [PageIcon.GREEN_BERRY]: require('../icons/green.berry.png'),
  [PageIcon.POTATO]: require('../icons/potato.png'),
  [PageIcon.PUMPKIN]: require('../icons/pumpkin.png'),
  [PageIcon.RED_BERRY]: require('../icons/red.berry.png'),
  [PageIcon.WHITE_BERRY]: require('../icons/white.berry.png'),
  [PageIcon.YELLOW_BERRY]: require('../icons/yellow.berry.png'),
}

export const pageIconsTitle: PageIconMap = {
  [PageIcon.BLACK_BERRY]: 'Black berry',
  [PageIcon.BLUE_BERRY]: 'Blue berry',
  [PageIcon.HEMP]: 'Hemp',
  [PageIcon.CORN]: 'Corn',
  [PageIcon.GREEN_BERRY]: 'Green berry',
  [PageIcon.POTATO]: 'Potato',
  [PageIcon.PUMPKIN]: 'Pumpkin',
  [PageIcon.RED_BERRY]: 'Red berry',
  [PageIcon.WHITE_BERRY]: 'White berry',
  [PageIcon.YELLOW_BERRY]: 'Yellow berry',
}
