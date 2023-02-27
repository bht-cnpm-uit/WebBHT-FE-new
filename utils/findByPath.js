function findByPath(array, path, indexPath = 0, currentPath = []) {
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        if (item.path === path[indexPath]) {
            // Match

            const newCurrentPathElem = {
                name: item.name,
                path: currentPath.length === 0 ? item.path : currentPath[currentPath.length - 1].path + '/' + item.path,
            };
            if (indexPath === path.length - 1) {
                return {
                    item,
                    path: [...currentPath, newCurrentPathElem],
                };
            }
            if (item.children) {
                return findByPath(item.children, path, indexPath + 1, [...currentPath, newCurrentPathElem]);
            }
            return null;
        }
    }
    return null;
}

export default findByPath;
