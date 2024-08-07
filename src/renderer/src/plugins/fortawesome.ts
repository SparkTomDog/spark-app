import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile, faFileCirclePlus, faFolder, faFolderOpen, faFolderPlus, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faFolderPlus,
    faFileCirclePlus,
    faPenToSquare,
    faXmark,
    faFile,
    faFolder,
    faFolderOpen
)

export {
    FontAwesomeIcon
}